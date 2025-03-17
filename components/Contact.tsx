"use client";

import React from "react";

const Contact: React.FC = () => {
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

            {/* 📍 Address */}
            <ContactDetail
              icon="🏠"
              title="Our Location"
              content="Mhaimid, Marrakech, Morocco"
            />
            {/* 📞 Phone */}
            <ContactDetail
              icon="📞"
              title="Phone & WhatsApp"
              content="+212 651 456 226 | +212 616 979 335"
            />
            {/* 📧 Email */}
            <ContactDetail
              icon="✉️"
              title="Email Address"
              content="contact@mohamedkadi.com"
            />
          </div>

          {/* ✅ Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <form>
              <ContactInput type="text" name="name" placeholder="Your Name" />
              <ContactInput type="email" name="email" placeholder="Your Email" />
              <ContactInput type="text" name="phone" placeholder="Your Phone" />
              <ContactTextArea row={5} placeholder="Your Message" name="message" />
              <button
                type="submit"
                className="w-full mt-4 rounded-md bg-blue-600 p-3 text-white font-semibold transition hover:bg-blue-700"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

/* ✅ Type Definitions */
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

/* ✅ Contact Input Component */
const ContactInput: React.FC<ContactInputProps> = ({ type, placeholder, name }) => (
  <div className="mb-4">
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className="w-full rounded-md border border-gray-300 px-4 py-3 text-base text-gray-700 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
    />
  </div>
);

/* ✅ Contact Text Area Component */
const ContactTextArea: React.FC<ContactTextAreaProps> = ({ row, placeholder, name }) => (
  <div className="mb-4">
    <textarea
      rows={row}
      name={name}
      placeholder={placeholder}
      className="w-full resize-none rounded-md border border-gray-300 px-4 py-3 text-base text-gray-700 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
    />
  </div>
);

/* ✅ Contact Details Component */
const ContactDetail: React.FC<ContactDetailProps> = ({ icon, title, content }) => (
  <div className="mb-4 flex items-center">
    <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-md bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-white">
      <span className="text-2xl">{icon}</span>
    </div>
    <div>
      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h4>
      <p className="text-gray-600 dark:text-gray-400">{content}</p>
    </div>
  </div>
);
