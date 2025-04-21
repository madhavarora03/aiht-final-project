"use client";

import { motion } from "framer-motion";

export default function AboutUsPage() {
  return (
    <main className="flex flex-col items-center justify-center bg-base-100 text-center py-16 px-4">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl"
      >
        <h1 className="text-5xl font-bold mb-6">About Our Mission</h1>
        <p className="text-lg mb-8 text-base-content/80">
          We're dedicated to creating a safer society through innovative
          technology, compassionate support, and accessible legal resources for
          all.
        </p>
      </motion.section>

      {/* Our Story */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-16 max-w-4xl w-full text-left"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
        <div className="card bg-base-200 shadow-xl p-8">
          <p className="text-base-content/80 mb-4">
            Founded in 2023, our platform emerged from a simple yet powerful
            idea: to bridge the gap between victims of crime and the justice
            system using artificial intelligence and human compassion.
          </p>
          <p className="text-base-content/80 mb-4">
            After witnessing the challenges faced by victims navigating complex
            legal procedures, our founders - a team of technologists, legal
            experts, and social workers - came together to create a solution
            that empowers individuals while supporting law enforcement.
          </p>
          <p className="text-base-content/80">
            Today, we're proud to serve communities across the country, making
            crime reporting more accessible, legal assistance more attainable,
            and neighborhoods safer through AI-powered prevention tools.
          </p>
        </div>
      </motion.section>

      {/* Our Values */}
      <section className="mt-24 w-full max-w-5xl px-4">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Our Core Values
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Empathy First",
              desc: "We approach every user interaction with understanding and compassion, recognizing the human impact of crime.",
            },
            {
              title: "Accessibility",
              desc: "Our platform is designed to be usable by everyone, regardless of technical skill, language, or background.",
            },
            {
              title: "Responsible Innovation",
              desc: "We harness AI technology ethically, with rigorous testing and human oversight to ensure accuracy and fairness.",
            },
            {
              title: "Privacy & Security",
              desc: "We protect user data with the highest standards of security while respecting confidentiality at every step.",
            },
            {
              title: "Community Partnership",
              desc: "We work collaboratively with law enforcement, legal aid organizations, and community groups to maximize impact.",
            },
            {
              title: "Continuous Improvement",
              desc: "We constantly refine our tools and approach based on user feedback and emerging best practices.",
            },
          ].map((value, i) => (
            <motion.div
              key={value.title}
              className="card bg-base-200 shadow-xl p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
            >
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-base-content/70">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Our Team */}
      <section className="mt-24 max-w-5xl w-full">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Our Leadership Team
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Vikram Mehta",
              role: "Founder & CEO",
              bio: "Former cybersecurity expert with 15 years of experience developing protection systems for vulnerable communities.",
            },
            {
              name: "Aisha Sharma",
              role: "Chief Legal Officer",
              bio: "Human rights attorney who has dedicated her career to improving access to justice for underserved populations.",
            },
            {
              name: "Dr. Rajiv Patel",
              role: "Head of AI Research",
              bio: "Computer vision specialist focused on developing ethical AI systems for public safety applications.",
            },
            {
              name: "Sunita Desai",
              role: "Community Outreach Director",
              bio: "Social worker with extensive experience in trauma-informed care and victim advocacy programs.",
            },
            {
              name: "Arjun Kapoor",
              role: "Product Development Lead",
              bio: "UX designer passionate about creating accessible digital tools for social impact.",
            },
            {
              name: "Priya Malhotra",
              role: "Data Ethics Officer",
              bio: "Policy expert ensuring our AI solutions meet the highest standards of fairness and accountability.",
            },
          ].map((member, i) => (
            <motion.div
              key={i}
              className="card bg-base-200 shadow-md p-6 text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-bold">{member.name}</h3>
              <p className="text-base-content/80 font-medium mb-2">
                {member.role}
              </p>
              <p className="text-base-content/70 text-sm">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Impact Stats */}
      <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-24 max-w-4xl w-full"
      >
        <h2 className="text-3xl font-bold mb-10 text-center">Our Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { number: "10,000+", label: "FIRs Filed" },
            { number: "85%", label: "Case Resolution Rate" },
            { number: "24/7", label: "Support Availability" },
            { number: "50+", label: "Partner Organizations" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="card bg-base-200 shadow-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-primary">{stat.number}</h3>
              <p className="text-base-content/70">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Partners */}
      <section className="mt-24 max-w-4xl w-full">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Partners</h2>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="card bg-base-200 shadow-xl p-8"
        >
          <p className="text-base-content/80 mb-6">
            We collaborate with a diverse network of organizations committed to
            safety and justice:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "National Legal Aid Authority",
              "Crime Prevention Council",
              "Digital Rights Foundation",
              "Association of Police Chiefs",
              "Victim Support Network",
              "AI Ethics Consortium",
            ].map((partner, i) => (
              <div key={i} className="p-4 bg-base-300 rounded-lg">
                <p className="font-medium">{partner}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact CTA */}
      <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-24 text-center"
      >
        <h2 className="text-2xl font-bold mb-4">Want to work with us?</h2>
        <p className="text-lg mb-6 text-base-content/80">
          We're always looking for partners and volunteers dedicated to creating
          a safer society.
        </p>
        <a href="/contact" className="btn btn-secondary">
          Get in Touch
        </a>
      </motion.section>
    </main>
  );
}
