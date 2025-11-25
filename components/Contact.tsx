import React, { useState } from "react";

const Contact: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const phone = formData.get("phone")?.toString().trim() || "";
    const message = formData.get("message")?.toString().trim() || "";

    // Validation
    if (!name || !email || message.split(" ").length < 5) {
      setError(
        "Please fill in all required fields and make sure your message is at least 5 words."
      );
      setLoading(false);
      return;
    }

    const data = { name, email, phone, message };

    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(data),
    });

    setLoading(false);

    if (res.ok) {
      setSuccess(true);
    } else {
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900 py-16" id="contact">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          {/* ✅ Contact Info */}
          <div>
            <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white uppercase">
              Get in Touch
            </h2>
            <p className="mb-6 text-base text-gray-600 dark:text-gray-400">
              Have a project in mind? Let’s discuss how we can help bring your vision to life.
            </p>

            <ContactDetail icon="🏠" title="Our Location" content="Mhaimid, Marrakech, Morocco" />
            <ContactDetail
              icon="📞"
              title="Phone & WhatsApp"
              content="+212 651 456 226 | +212 616 979 335"
            />
            <ContactDetail icon="✉️" title="Email Address" content="contact@mohamedkadi.com" />
          </div>

          {/* ✅ Contact Form or Success */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            {success ? (
              <div className="text-green-600 text-center">
                <svg
                  className="w-16 h-16 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <h3 className="text-xl font-bold mb-2">Message sent successfully!</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Thank you for reaching out. I’ll be in touch shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
                <ContactInput type="text" name="name" placeholder="Your Name" />
                <ContactInput type="email" name="email" placeholder="Your Email" />
                <ContactInput type="text" name="phone" placeholder="Your Phone (Optional)" />
                <ContactTextArea row={5} name="message" placeholder="Your Message (min 5 words)" />
                <button
                  type="submit"
                  className="w-full mt-4 rounded-md bg-blue-600 p-3 text-white font-semibold transition hover:bg-blue-700 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

/* ✅ Reusable Components */

interface ContactInputProps {
  type: string;
  placeholder: string;
  name: string;
}

interface ContactTextAreaProps {
  row: number;
  placeholder: string;
  name: string;
}

interface ContactDetailProps {
  icon: string;
  title: string;
  content: string;
}

const ContactInput: React.FC<ContactInputProps> = ({ type, placeholder, name }) => (
  <div className="mb-4">
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required={name !== "phone"}
      className="w-full rounded-md border border-gray-300 px-4 py-3 text-base text-gray-700 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
    />
  </div>
);

const ContactTextArea: React.FC<ContactTextAreaProps> = ({ row, placeholder, name }) => (
  <div className="mb-4">
    <textarea
      rows={row}
      name={name}
      placeholder={placeholder}
      required
      className="w-full resize-none rounded-md border border-gray-300 px-4 py-3 text-base text-gray-700 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
    />
  </div>
);

const ContactDetail: React.FC<ContactDetailProps> = ({ icon, title, content }) => (
  <div className="mb-4 flex items-center">
    <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-md bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-white">
      <span className="text-2xl">{icon}</span>
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{content}</p>
    </div>
  </div>
);
