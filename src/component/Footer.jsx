"use client";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-8 lg:gap-0">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold mb-2">SkillSwap Hub</h2>
            <p className="text-gray-300 max-w-xs">
              Connect, learn and teach skills with a global community.
            </p>
          </div>
          <div className="flex flex-col space-y-2 text-center lg:text-left">
            <h3 className="font-semibold mb-2">Quick Links</h3>
            <Link href="/" className="hover:text-amber-400 transition">Home</Link>
            <Link href="/skills" className="hover:text-amber-400 transition">Skills</Link>
            <Link href="/about" className="hover:text-amber-400 transition">About</Link>
            <Link href="/contact" className="hover:text-amber-400 transition">Contact</Link>
          </div>
          <div className="flex flex-col items-center lg:items-start space-y-2">
            <h3 className="font-semibold mb-2">Follow Us</h3>
            <div className="flex gap-4 text-white">
              <Link href="#"><FaFacebookF className="hover:text-amber-400 transition" /></Link>
              <Link href="#"><FaTwitter className="hover:text-amber-400 transition" /></Link>
              <Link href="#"><FaInstagram className="hover:text-amber-400 transition" /></Link>
              <Link href="#"><FaLinkedinIn className="hover:text-amber-400 transition" /></Link>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-indigo-800 pt-6 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} SkillSwap Hub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
