"use client";
import { useState } from "react";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Swal from "sweetalert2";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);

  const { data: session } = useSession();
  const user = session?.user || null;

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#4f46e5", // indigo
      cancelButtonColor: "#9333ea", // purple
    });

    if (result.isConfirmed) {
      await signOut({ callbackUrl: "/" });

      Swal.fire({
        title: "Logged Out!",
        text: "You have been logged out successfully.",
        icon: "success",
        confirmButtonColor: "#4f46e5",
      });
    }
  };

  return (
    <nav className="bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="shrink-0 flex items-center">
            <Link href="/">
              <span className="text-2xl font-bold hover:text-amber-300 transition">
                SkillSwap Hub
              </span>
            </Link>
          </div>
          <div className="hidden md:flex md:items-center space-x-6">
            <Link href="/" className="hover:text-amber-300 transition">Home</Link>
            <Link href="/skills" className="hover:text-amber-300 transition">Skills</Link>
            <Link href="/about" className="hover:text-amber-300 transition">About</Link>
            <Link href="/contact" className="hover:text-amber-300 transition">Contact</Link>
            {!user ? (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 bg-linear-to-r from-indigo-500 to-purple-500 hover:from-purple-500 hover:to-indigo-500 transition text-white font-semibold rounded-lg shadow"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="px-4 py-2 bg-linear-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 transition text-white font-semibold rounded-lg shadow"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="flex items-center gap-2 hover:text-amber-300 transition"
                >
                  <FaUserCircle size={24} />
                  <span>{user.name}</span>
                </button>

                {userDropdown && (
                  <div className="absolute -right-6 lg:-right-8 mt-2 w-[250px] bg-linear-to-b from-indigo-600 to-purple-600 text-white rounded-xl shadow-lg py-2 grid gap-2 z-50 text-center">
                    <Link href="/profile" className="px-4 py-2 hover:bg-indigo-700 rounded-lg">Profile</Link>
                    <Link href="/add-skill" className="px-4 py-2 hover:bg-indigo-700 rounded-lg">Add Skill</Link>
                    <Link href="/manage-skills" className="px-4 py-2 hover:bg-indigo-700 rounded-lg">Manage Skills</Link>

                    <button
                      onClick={handleLogout}
                      className="mx-2 py-2 rounded-lg bg-linear-to-r from-indigo-500 to-purple-500 hover:from-purple-500 hover:to-indigo-500 transition shadow"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-linear-to-b from-indigo-600 to-purple-600 text-white border-t border-indigo-700">
          <Link href="/" className="block px-4 py-2 hover:bg-indigo-500 transition">Home</Link>
          <Link href="/skills" className="block px-4 py-2 hover:bg-indigo-500 transition">Skills</Link>
          <Link href="/about" className="block px-4 py-2 hover:bg-indigo-500 transition">About</Link>
          <Link href="/contact" className="block px-4 py-2 hover:bg-indigo-500 transition">Contact</Link>

          {!user ? (
            <div className="grid gap-2 p-3">
              <Link
                href="/login"
                className="w-full py-2 text-center rounded-lg bg-linear-to-r from-indigo-500 to-purple-500"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="w-full py-2 text-center rounded-lg bg-linear-to-r from-purple-500 to-indigo-500"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="border-t border-indigo-700 mt-2 p-3 grid gap-2">
              <Link href="/profile" className="block px-4 py-2 hover:bg-indigo-500 rounded">Profile</Link>
              <Link href="/add-skill" className="block px-4 py-2 hover:bg-indigo-500 rounded">Add Skill</Link>
              <Link href="/manage-skills" className="block px-4 py-2 hover:bg-indigo-500 rounded">Manage Skills</Link>

              <button
                onClick={handleLogout}
                className="w-full py-2 rounded-lg bg-linear-to-r from-indigo-500 to-purple-500"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
