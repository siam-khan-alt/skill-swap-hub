import Link from "next/link";
import React, { Component } from "react";

export default function SkillsCard({ skill }) {
  return (
    <div className="bg-linear-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow-lg  p-6 flex flex-col items-center hover:shadow-lg transition transform hover:scale-102">
      <img
        src={skill.icon}
        alt={skill.title}
        className="w-20 h-20 mb-4 object-contain bg-white p-2 rounded-full"
      />
      <h2 className="text-xl flex-1 font-semibold text-center">{skill.title}</h2>
      <p className="text-white/80 mt-2 text-center line-clamp-2 flex-1">
        {skill.description}
      </p>
      <p className="mt-2 font-bold">{skill.price}</p>

      <Link
        href={`/skills/${skill._id}`}
        className="mt-4 w-full text-center px-8 py-3 rounded-lg font-semibold shadow-lg 
              bg-linear-to-r from-indigo-500 to-purple-500 
              hover:from-purple-500 hover:to-indigo-500 
              transition transform hover:scale-105"
      >
        Details
      </Link>
    </div>
  );
}
