"use client";
import { FaLaptopCode, FaChalkboardTeacher, FaUsers } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import svg from "../../public/undraw_online-learning_tgmv.svg";

export default function HeroSection() {
  return (
    <section
      className="
        relative 
        bg-linear-to-b 
        from-indigo-500 
        via-purple-600 
        to-indigo-700 
        text-white
        overflow-hidden
      "
    >
      <div className="absolute inset-0 bg-black/10"></div>

      <div className="relative px-5 py-10 lg:py-14 flex flex-col-reverse gap-10 lg:flex-row items-center max-w-7xl mx-auto">
        <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight drop-shadow-xl leading-tight">
            Learn, Teach & <span className="text-amber-300">Swap Skills</span>
          </h1>

          <p className="text-base sm:text-lg text-white/80 max-w-xl mx-auto lg:mx-0">
            Connect with learners and teachers around the world. Share
            knowledge, gain experience, and grow your skills effortlessly.
          </p>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <Link
              href="/register"
              className="
                 px-8 py-3 rounded-lg font-semibold shadow-lg 
              bg-linear-to-r from-indigo-500 to-purple-500 
              hover:from-purple-500 hover:to-indigo-500 
              transition transform hover:scale-105
              "
            >
              Get Started
            </Link>

            <Link
              href="/skills"
              className="
                px-8 py-3 bg-linear-to-r from-indigo-500 via-purple-600 to-indigo-700 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-indigo-500 transition transform hover:scale-105
              "
            >
              Browse Skills
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/25 backdrop-blur-md rounded-lg p-4 border border-white/40 shadow-md hover:scale-105 transition flex flex-col items-center gap-2">
              <FaLaptopCode size={26} />
              <span className="font-semibold text-sm">
                100+ Skills Available
              </span>
            </div>

            <div className="bg-white/25 backdrop-blur-md rounded-xl p-4 border border-white/40 shadow-md hover:scale-105 transition flex flex-col items-center gap-2">
              <FaChalkboardTeacher size={26} />
              <span className="font-semibold text-sm">50+ Expert Teachers</span>
            </div>

            <div className="bg-white/25 backdrop-blur-md rounded-xl p-4 border border-white/40 shadow-md hover:scale-105 transition flex flex-col items-center gap-2">
              <FaUsers size={26} />
              <span className="font-semibold text-sm">500+ Active Users</span>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 flex justify-center">
          <Image
            src={svg}
            alt="Online Learning"
            className="max-w-[90%] lg:max-w-full drop-shadow-2xl"
            priority
          />
        </div>
      </div>
    </section>
  );
}
