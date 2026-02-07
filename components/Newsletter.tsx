"use client";
import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMessage("✅ Thank you for subscribing!");
        setEmail("");
      } else if (res.status === 409 || data.error === "Already subscribed") {
        setMessage("❌ You’re already subscribed with this email.");
      } else {
        setMessage("❌ Subscription failed. Please try again.");
      }
    } catch (error) {
      setMessage("❌ An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#F7F7F7] dark:bg-gray-900 py-16 px-6">
      <div className="mx-auto max-w-screen-xl text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl dark:text-white">
          Subscribe to our Newsletter
        </h2>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Get the latest updates on web design, development tips, and business growth strategies.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-screen-md mx-auto mt-8">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full">
            <FaEnvelope
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={20}
            />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              disabled={loading}
              className="pl-10 p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="py-3 px-5 w-full sm:w-auto text-sm font-medium text-white bg-blue-600 rounded-lg sm:rounded-none sm:rounded-r-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50"
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </div>

        {message && (
          <p className="mt-4 text-sm text-center text-blue-600 dark:text-blue-400">{message}</p>
        )}

        <p className="mt-4 text-sm text-gray-500 dark:text-gray-300 text-center">
          We care about your data.{" "}
          <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
            Read our Privacy Policy.
          </a>
        </p>
      </form>
    </section>
  );
};

export default Newsletter;
