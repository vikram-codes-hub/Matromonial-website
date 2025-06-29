import React from 'react'
import { FaCheckCircle } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";
const Membership = () => {
  
const allFeatures = [
  "Browse profiles",
  "Send unlimited messages",
  "Priority support",
  "Profile boost",
  "Video calling",
  "Dedicated matchmaker",
];

const plans = [
  {
    title: "Basic",
    price: "₹0",
    description: "Great for exploring.",
    features: ["Browse profiles"],
    buttonText: "Get Started",
  },
  {
    title: "Standard",
    price: "₹299/month",
    description: "Perfect for regular users.",
    features: [
      "Browse profiles",
      "Send unlimited messages",
      "Priority support",
    ],
    buttonText: "Upgrade Now",
  },
  {
    title: "Premium",
    price: "₹499/month",
    description: "Best for serious connections.",
    features: [...allFeatures],
    buttonText: "Go Premium",
  },
];
 return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
        Choose Your Plan
      </h1>
      <p className="text-center text-gray-500 mb-12">
        Select a plan that fits your goals.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
           className="bg-white rounded-xl shadow-lg p-6 transition-transform duration-300 transform hover:scale-105 hover:z-10 hover:shadow-2xl flex flex-col justify-between"

          >
            <div>
              <h2 className="text-2xl font-semibold text-center mb-2">
                {plan.title}
              </h2>
              <p className="text-center text-gray-600 mb-4">
                {plan.description}
              </p>
              <p className="text-center text-3xl font-bold text-gray-600 mb-6">
                {plan.price}
              </p>

              <ul className="space-y-3 text-sm">
                {allFeatures.map((feature, idx) => {
                  const isIncluded = plan.features.includes(feature);
                  return (
                    <li
                      key={idx}
                      className={`flex items-center gap-2 ${
                        isIncluded ? "text-gray-700" : "text-gray-400"
                      }`}
                    >
                      {isIncluded ? (
                        <FaCheckCircle className="text-green-500" />
                      ) : (
                        <FaTimesCircle className="text-red-400" />
                      )}
                      {feature}
                    </li>
                  );
                })}
              </ul>
            </div>

            <button className="mt-6 w-full bg-black hover:scale-105 text-white py-2 rounded-md font-semibold transition">
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Membership
