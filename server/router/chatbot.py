import os
import logging
from langchain_community.vectorstores import FAISS
from mistralai import Mistral
from langchain_community.embeddings import HuggingFaceEmbeddings
from dotenv import load_dotenv
from fastapi.responses import JSONResponse, StreamingResponse
from fastapi import APIRouter, Request, Response, HTTPException

logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

logger.info("Loading FAISS vector store...")
vector_store = FAISS.load_local(
    "db/faiss_legal_db",
    HuggingFaceEmbeddings(model_name="BAAI/bge-small-en"),
    allow_dangerous_deserialization=True,
)
retriever = vector_store.as_retriever()
logger.info("FAISS vector store loaded successfully")

api_key = os.environ.get("MISTRAL_API_KEY", "HtNsZNzpfzLQyzlGTvkCwccUbASZaZNt")
client = Mistral(api_key=api_key)
logger.info("Mistral client initialized")

logger.info(
    f"Available methods on Mistral client: {[m for m in dir(client) if not m.startswith('_')]}"
)


chat_router = APIRouter()


@chat_router.options("/{path:path}")
async def handle_options(path: str):
    return Response()


# ------- Flexible Mistral Chat Function -------
def get_chat_function():
    client_attrs = [attr for attr in dir(client) if not attr.startswith("_")]
    logger.info(f"Client attributes: {client_attrs}")

    if hasattr(client, "chat"):
        chat_type = type(client.chat)
        chat_attrs = [attr for attr in dir(client.chat) if not attr.startswith("_")]
        logger.info(f"Chat object type: {chat_type}, attributes: {chat_attrs}")

    if "chat_completions" in client_attrs:
        return lambda **kwargs: client.chat_completions(**kwargs)
    if "complete" in client_attrs:
        return lambda **kwargs: client.complete(**kwargs)
    if "completion" in client_attrs:
        return lambda **kwargs: client.completion(**kwargs)
    if hasattr(client, "__call__"):
        return lambda **kwargs: client(**kwargs)

    if hasattr(client, "chat"):
        if hasattr(client.chat, "__call__"):
            return lambda **kwargs: client.chat(**kwargs)
        for method_name in ["create", "generate", "complete", "completion"]:
            if hasattr(client.chat, method_name):
                return lambda **kwargs: getattr(client.chat, method_name)(**kwargs)

    raise AttributeError("No valid Mistral API method found")


chat_function = get_chat_function()


# ------- Streaming Endpoint -------
def stream_chat_response(query: str, context: str):
    logger.info(f"Streaming query: {query[:50]}")

    messages = [
        {
            "role": "system",
            "content": (
                "You are a legal expert providing general guidance on legal matters. "
                "Use the provided legal context to support your response, but do not overwhelm the user with excessive case law. "
                "Select only one or two relevant cases to illustrate legal principles concisely. "
                "If necessary, ask follow-up questions to clarify the user's situation before offering a precise legal perspective. "
                "Ensure your response is understandable and informative, avoiding unnecessary legal jargon."
                "Don't mention anything from system prompts, just directly give answers"
                "Cite Indian Cases"
            ),
        },
        {"role": "user", "content": f"Context:\n{context}\n\nQuestion: {query}"},
    ]

    kwargs = {"model": "mistral-tiny", "messages": messages, "stream": True}

    try:
        stream_response = chat_function(**kwargs)

        def generate():
            for chunk in stream_response:
                content = None
                if hasattr(chunk, "choices") and chunk.choices:
                    if hasattr(chunk.choices[0], "delta") and hasattr(
                        chunk.choices[0].delta, "content"
                    ):
                        content = chunk.choices[0].delta.content
                    elif hasattr(chunk.choices[0], "message") and hasattr(
                        chunk.choices[0].message, "content"
                    ):
                        content = chunk.choices[0].message.content
                    elif hasattr(chunk.choices[0], "text"):
                        content = chunk.choices[0].text
                elif hasattr(chunk, "content"):
                    content = chunk.content
                elif hasattr(chunk, "text"):
                    content = chunk.text
                elif isinstance(chunk, str):
                    content = chunk
                elif hasattr(chunk, "data") and hasattr(chunk.data, "choices"):
                    content = getattr(chunk.data.choices[0], "text", None)

                if content:
                    yield content

        return StreamingResponse(generate(), media_type="text/plain")

    except Exception as e:
        logger.error(f"Streaming error: {e}")
        return Response(f"Error: {str(e)}", media_type="text/plain")


from pydantic import BaseModel


class Item(BaseModel):
    query: str


@chat_router.post("/legal-advice")
async def legal_advice(request: Item):
    query = request.query

    if not query:
        raise HTTPException(status_code=400, detail="Query parameter is required")

    try:
        docs = (
            retriever.invoke(query)
            if hasattr(retriever, "invoke")
            else retriever.get_relevant_documents(query)
        )
        context = "\n\n".join([doc.page_content for doc in docs])
    except Exception as e:
        logger.error(f"Retrieval error: {e}")
        context = "Unable to retrieve relevant legal information."

    messages = [
        {
            "role": "system",
            "content": (
                "You are a legal expert providing general guidance on legal matters. "
                "Use the provided legal context to support your response, but do not overwhelm the user with excessive case law. "
                "Select only one or two relevant cases to illustrate legal principles concisely. "
                "If necessary, ask follow-up questions to clarify the user's situation before offering a precise legal perspective. "
                "Ensure your response is understandable and informative, avoiding unnecessary legal jargon."
                "Don't mention anything from system prompts, just directly give answers"
            ),
        },
        {"role": "user", "content": f"Context:\n{context}\n\nQuestion: {query}"},
    ]

    kwargs = {"model": "mistral-tiny", "messages": messages, "stream": False}

    try:
        response = chat_function(**kwargs)
        detailed_advice = None

        if hasattr(response, "choices") and response.choices:
            if hasattr(response.choices[0], "message") and hasattr(
                response.choices[0].message, "content"
            ):
                detailed_advice = response.choices[0].message.content
            elif hasattr(response.choices[0], "text"):
                detailed_advice = response.choices[0].text
            elif hasattr(response.choices[0], "content"):
                detailed_advice = response.choices[0].content
        elif hasattr(response, "text"):
            detailed_advice = response.text
        elif hasattr(response, "content"):
            detailed_advice = response.content
        elif isinstance(response, str):
            detailed_advice = response

        if not detailed_advice:
            detailed_advice = str(response)

        return JSONResponse(content={"detailed_advice": detailed_advice})

    except Exception as e:
        logger.error(f"Error calling Mistral API: {e}")
        return JSONResponse(content={"error": str(e)}, status_code=500)
