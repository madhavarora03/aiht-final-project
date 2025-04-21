"use client";

import { motion } from "framer-motion";

export default function LandingPage() {
  const scrollToFeatures = () => {
    const section = document.getElementById("features-section");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="flex flex-col items-center justify-center bg-base-100 text-center py-16 px-4">
      <motion.section
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl"
      >
        <h1 className="text-5xl font-bold mb-6">Empowering Safety with AI</h1>
        <p className="text-lg mb-8 text-base-content/80">
          An AI-powered crime prevention and legal assistance platform built
          with care for victims and society.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToFeatures}
          className="btn btn-primary"
        >
          Explore Features
        </motion.button>
      </motion.section>

      <section
        id="features-section"
        className="mt-24 w-full max-w-5xl px-4 grid md:grid-cols-3 gap-8"
      >
        {[
          {
            title: "Report FIR",
            desc: "Easily file FIRs online with guided forms and instant case submission.",
          },
          {
            title: "Legal Chatbot",
            desc: "Get legal advice anytime with our intelligent and supportive AI assistant.",
          },
          {
            title: "Crime Video Detection",
            desc: "Upload surveillance footage to detect and classify criminal activity using AI.",
          },
        ].map((feature, i) => (
          <motion.div
            key={feature.title}
            className="card bg-base-200 shadow-xl p-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
          >
            <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
            <p className="text-base-content/70">{feature.desc}</p>
          </motion.div>
        ))}
      </section>

      <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-20 text-center"
      >
        <h2 className="text-2xl font-bold mb-4">Want to lodge a complaint?</h2>
        <a href="/dashboard/report" className="btn btn-secondary">
          Go to FIR Form
        </a>
      </motion.section>

      <section className="mt-24 max-w-4xl w-full">
        <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              q: "Is this service free to use?",
              a: "Yes, our platform is completely free and accessible to everyone.",
            },
            {
              q: "How secure is the FIR submission?",
              a: "All reports are encrypted and sent securely to the appropriate authorities.",
            },
            {
              q: "Can I talk to a human legal expert?",
              a: "Yes, our chatbot can escalate your issue to a human expert when needed.",
            },
            {
              q: "Can I submit anonymous reports?",
              a: "Yes, you may choose to keep your identity private while reporting a case.",
            },
            {
              q: "How accurate is the crime prediction system?",
              a: "Our model is trained on real-world data and reviewed regularly for performance. While no system is perfect, we aim for maximum precision and safety.",
            },
            {
              q: "Is my data shared with third parties?",
              a: "No. We respect user privacy. Your data is never sold or shared without your consent.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="collapse collapse-arrow bg-base-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <input type="checkbox" />
              <div className="collapse-title text-lg font-medium">{item.q}</div>
              <div className="collapse-content text-base-content/80">
                {item.a}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mt-24 max-w-5xl w-full">
        <h2 className="text-3xl font-bold mb-10">What People Are Saying</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Aarav S.",
              text: "Reporting a crime was never this easy. This platform gave me the confidence to act.",
            },
            {
              name: "Priya K.",
              text: "The chatbot helped me understand my rights clearly and with empathy.",
            },
            {
              name: "Rahul T.",
              text: "Impressed by the AI video analysis. A game-changer for surveillance in neighborhoods.",
            },
            {
              name: "Meera J.",
              text: "As a legal volunteer, I appreciate how the tool educates and empowers victims before we connect.",
            },
            {
              name: "Sandeep R.",
              text: "Even my elderly parents were able to file a report using the simple interface. Very intuitive!",
            },
            {
              name: "Nisha V.",
              text: "It feels like someone is finally listening. The platform made me feel heard and supported.",
            },
          ].map((t, i) => (
            <motion.div
              key={i}
              className="card bg-base-200 shadow-md p-6 text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-base-content/70 italic">“{t.text}”</p>
              <p className="mt-4 font-semibold">{t.name}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
