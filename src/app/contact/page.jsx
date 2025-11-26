"use client";
import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaUser, FaPen } from "react-icons/fa";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-indigo-100 to-purple-50 px-5 py-8 lg:py-10">
      <div className="w-full max-w-3xl bg-linear-to-t from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-2xl p-1">
        
        <div className="bg-white/90 backdrop-blur-lg rounded-xl p-6 md:p-10">

          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center bg-clip-text text-transparent bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500">
            Contact Us
          </h1>

          <p className="text-gray-700 text-center mb-8">
            Have questions, feedback, or collaboration requests? Send us a message and we’ll respond as soon as possible.
          </p>

          <form className="space-y-5">

            <div>
              <label className="block text-gray-700 font-medium mb-1 flex items-center gap-2">
                <FaUser className="text-indigo-500" /> Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1 flex items-center gap-2">
                <FaEnvelope className="text-indigo-500" /> Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1 flex items-center gap-2">
                <FaPen className="text-indigo-500" /> Subject
              </label>
              <input
                type="text"
                placeholder="What is this about?"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Message
              </label>
              <textarea
                rows="5"
                placeholder="Write your message..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 mt-2 font-semibold text-white rounded-lg transition bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-purple-500 hover:to-indigo-500"
            >
              Send Message
            </button>
          </form>

          <div className="mt-10 grid gap-4 text-gray-700 border-t pt-6">

            <div className="flex items-center gap-3">
              <FaEnvelope className="text-indigo-600 text-xl" />
              <span className="font-medium">nssiam99@gmail.com</span>
            </div>

            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-indigo-600 text-xl" />
              <span className="font-medium">
                Goffargaoun, Mymensingh, Bangladesh
              </span>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
