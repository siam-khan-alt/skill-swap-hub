'use client';
import React from "react";
import { FaBookOpen, FaChalkboardTeacher, FaUsers, FaRocket, FaChartLine, FaGlobe } from "react-icons/fa";

export default function AboutPage() {
  const features = [
    {
      icon: <FaBookOpen />,
      title: "Learn New Skills",
      desc: "Explore programming, design, marketing, and more with high-quality curated content."
    },
    {
      icon: <FaChalkboardTeacher />,
      title: "Share Your Knowledge",
      desc: "Become a mentor and share your expertise with the community while building reputation."
    },
    {
      icon: <FaUsers />,
      title: "Connect & Collaborate",
      desc: "Meet like-minded learners, collaborate on projects, and grow together."
    },
    {
      icon: <FaRocket />,
      title: "Project-Based Learning",
      desc: "Work on real-world projects with proper guidance and hands-on experience."
    },
    {
      icon: <FaChartLine />,
      title: "Track Your Progress",
      desc: "Monitor your learning progress, achievements, and course completions."
    },
    {
      icon: <FaGlobe />,
      title: "Global Community",
      desc: "Join a worldwide network of learners and mentors across multiple domains."
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-indigo-50 to-purple-50 px-5  py-8 lg:py-10">
      
    
      <div className=" text-center mb-8 lg:mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600 mb-6">
          About SkillSwap Hub
        </h1>
        <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
          SkillSwap Hub is a collaborative learning platform where users can share skills, learn new technologies, 
          and build real-world projects together. Our goal is to create a strong learning community powered by mentorship.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3  gap-5 mb-24">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl hover:-translate-y-1 transition duration-300"
          >
            <div className="text-5xl text-indigo-600 mb-4 flex justify-center">
              {feature.icon}
            </div>

            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-indigo-600 mb-3">
              {feature.title}
            </h2>

            <p className="text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-20 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600 mb-6">
          Ready to start your skill journey?
        </h2>

        <p className="text-gray-700 mb-6 max-w-xl mx-auto">
          Learn, teach, and collaborate with thousands of learners worldwide on SkillSwap Hub.
        </p>

        <button className="px-10 py-4 font-semibold rounded-xl text-white bg-linear-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-indigo-600 transition text-lg shadow-lg">
          Join Now
        </button>
      </div>
    </div>
  );
}
