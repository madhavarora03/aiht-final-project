"use client";

import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";


export default function Page() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!query.trim()) {
      setError("Please enter a query.");
      return;
    }

    setError("");
    setLoading(true);
    setResponse("");

    try {
      const res = await axios.post(
        "http://localhost:8000/api/chat/legal-advice",
        { query }
      );
      setResponse(res.data.detailed_advice || "No response received.");
    } catch (err) {
      setError("Failed to fetch legal advice. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Legal Advice Chatbot</h1>
      <div className="mb-4">
        <textarea
          className="w-full p-3 border rounded"
          rows={5}
          placeholder="Enter your legal query here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <button
        className="btn btn-primary w-full"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Fetching advice..." : "Get Legal Advice"}
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {response && (
        <div className="mt-6 p-4 border rounded">
          <h2 className="text-lg font-semibold">Response:</h2>
          <ReactMarkdown>{response}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
