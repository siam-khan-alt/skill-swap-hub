"use client";
import Link from "next/link";
import { FaLaptopCode, FaChalkboardTeacher, FaUsers, FaExchangeAlt } from "react-icons/fa";

const steps = [
  {
    icon: <FaLaptopCode size={36} className="text-indigo-600 mb-4 mx-auto" />,
    title: "Learn Skills",
    description: "Browse and learn from hundreds of skills shared by experts.",
  },
  {
    icon: <FaChalkboardTeacher size={36} className="text-green-600 mb-4 mx-auto" />,
    title: "Teach Skills",
    description: "Share your expertise with learners worldwide.",
  },
  {
    icon: <FaUsers size={36} className="text-amber-600 mb-4 mx-auto" />,
    title: "Connect",
    description: "Find learners and teachers that match your interests.",
  },
  {
    icon: <FaExchangeAlt size={36} className="text-purple-600 mb-4 mx-auto" />,
    title: "Swap Knowledge",
    description: "Collaborate, exchange skills, and grow together.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-8 lg:py-10 bg-indigo-100">
      <div className="container mx-auto px-5 ">
        <div className="text-center mb-8 lg:mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-center">How It Works</h2>
          <p className="mt-4 text-gray-600">Follow these simple steps to start learning and teaching.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl  border border-indigo-200/50 shadow hover:shadow-lg transition transform hover:scale-105 text-center">
              {step.icon}
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-700">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/register"
            className="px-8 py-3 rounded-lg font-semibold shadow-lg 
              bg-linear-to-r from-indigo-500 to-purple-500 
              hover:from-purple-500 hover:to-indigo-500 
              transition transform hover:scale-103 "
          >
            Start Swapping Skills
          </Link>
        </div>
      </div>
    </section>
  );
}
