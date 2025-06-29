import React from 'react'

const Helpandsupprott = () => {
  const faqs = [
    {
      question: "How do I update my profile?",
      answer: "Go to My Profile > Edit Profile > Make changes > Save Profile.",
    },
    {
      question: "I forgot my password. What should I do?",
      answer: "Click on 'Forgot Password' on the login page to reset it.",
    },
    {
      question: "How do I contact a user?",
      answer: "You can message them directly from their profile page after logging in.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">Help & Support</h1>
          <p className="text-gray-600">Find answers or reach out to our team</p>
        </div>

        {/* Search */}
        <div className="mb-10">
          <input
            type="text"
            placeholder="Search for help..."
            className="w-full p-4 rounded-lg bg-gray-200 text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* FAQs */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Popular Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-100 p-5 rounded-lg shadow-md border border-gray-300"
              >
                <h3 className="font-semibold text-lg mb-1 text-black">{faq.question}</h3>
                <p className="text-black">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-gray-100 p-6 rounded-lg border border-gray-300 shadow-lg">
          <h2 className="text-2xl font-semibold mb-2 text-black">Need more help?</h2>
          <p className="mb-4 text-black">
            If you couldn’t find what you’re looking for, feel free to reach out to our support team.
          </p>
          <a
            href="mailto:support@vivahsetu.com"
            className="inline-block bg-black text-white font-semibold px-6 py-2 rounded hover:bg-gray-800 transition"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default Helpandsupprott;
