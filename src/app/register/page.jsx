"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxios from "@/hooks/useAxios";

export default function RegisterPage() {
  const router = useRouter();
  const instanceAxios = useAxios();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await instanceAxios.post("/users", { name, email, password });

      if (res.data.insertedId || res.data.message === "User already exists") {
        Swal.fire({
          title: "Registration Successful!",
          text: "Your account has been created 🎉",
          icon: "success",
          confirmButtonText: "Go to Login",
          background: "#EEF2FF",
          color: "#312E81",
          confirmButtonColor: "#6366F1",
        });

        router.push("/login");
      } else {
        setErrorMsg("Registration failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Registration error. Check server or email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-100 via-purple-100 to-indigo-200 py-8 lg:py-10 px-5">
      <div className="max-w-md w-full bg-linear-to-t from-indigo-600 to-purple-600 rounded-2xl shadow-2xl p-1">
        <div className="bg-white/90 backdrop-blur-lg rounded-xl p-8">

          <h2 className="text-4xl font-extrabold mb-2 text-center bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-purple-600">
            Create Account
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Join SkillSwap Hub and start learning!
          </p>

          {errorMsg && (
            <div className="text-red-600 mb-4 text-center font-semibold">{errorMsg}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="relative">
              <FaUser className="absolute top-1/2 left-3 -translate-y-1/2 text-indigo-500" />
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-lg px-10 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>

            <div className="relative">
              <FaEnvelope className="absolute top-1/2 left-3 -translate-y-1/2 text-indigo-500" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg px-10 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>
            <div className="relative">
              <FaLock className="absolute top-1/2 left-3 -translate-y-1/2 text-indigo-500" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-lg px-10 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-indigo-600 hover:text-purple-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold text-white transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-linear-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-indigo-600"
              }`}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="text-center font-bold my-4 text-indigo-700">OR</p>

          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full flex items-center justify-center gap-3 border rounded-lg py-3 hover:bg-indigo-50 transition font-semibold text-indigo-700"
          >
            <FcGoogle size={24} /> Continue with Google
          </button>

          <p className="text-center mt-6 text-gray-700">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-600 font-bold hover:underline">
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}
