"use client";
import { FaChalkboardTeacher, FaLaptopCode, FaUsers, FaAward } from "react-icons/fa";

export default function FeaturesSection() {
  const features = [
    {
      icon: <FaLaptopCode size={36} className="text-cyan-500" />,
      title: "Learn New Skills",
      description: "Access hundreds of courses and skill tutorials from experts around the world.",
    },
    {
      icon: <FaChalkboardTeacher size={36} className="text-cyan-500" />,
      title: "Teach & Share",
      description: "Become a mentor or share your knowledge with the community effortlessly.",
    },
    {
      icon: <FaUsers size={36} className="text-cyan-500" />,
      title: "Connect with Community",
      description: "Collaborate with learners, mentors, and peers to enhance your skillset.",
    },
    {
      icon: <FaAward size={36} className="text-cyan-500" />,
      title: "Earn Rewards",
      description: "Get recognition and rewards for teaching and contributing to the community.",
    },
  ];

  return (
    <section className="py-8 lg:py-10 bg-indigo-100">
      <div className=" px-5 ">
        <div className="text-center mb-8 lg:mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-center">How SkillSwap Works</h2>
          <p className="mt-4 text-lg text-gray-600">
            Learn, teach, and collaborate with our growing community of learners and mentors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-xl border-t border-indigo-400  hover:shadow-lg transition transform hover:scale-105"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
