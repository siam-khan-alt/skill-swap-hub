"use client";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import avatar1 from '../../public/Avater1.jpg';
import avatar2 from '../../public/Avater2.jpg';
import avatar3 from '../../public/Avater3.jpg';

const testimonials = [
  {
    avatar: avatar1,
    name: "Alice Johnson",
    feedback: "SkillSwap Hub helped me learn web development in just a few weeks!",
    rating: 5,
  },
  {
    avatar: avatar2,
    name: "Mark Smith",
    feedback: "I love teaching here and connecting with learners worldwide.",
    rating: 5,
  },
  {
    avatar: avatar3,
    name: "Sara Lee",
    feedback: "The platform is very intuitive and the community is amazing!",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="pb-8 lg:pb-10 bg-indigo-100 ">
      <div className="max-w-7xl mx-auto px-5 ">
        <div className="text-center mb-8 lg:mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-center">What Our Users Say</h2>
          <p className="mt-4 text-gray-600">Hear from people who have benefited from SkillSwap Hub.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl   shadow hover:shadow-lg transition transform hover:scale-105 text-center">
              <Image src={t.avatar} alt={t.name} className="mx-auto w-20 h-20 rounded-full mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t.name}</h3>
              <p className="text-gray-700 mb-2">{t.feedback}</p>
              <div className="flex justify-center gap-1 text-amber-500">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
