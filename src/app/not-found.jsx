import Link from "next/link";
import { FaSearch } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 px-6 text-center">
      <FaSearch className="text-6xl text-indigo-500 mb-6" />

      <h1 className="text-6xl font-extrabold text-indigo-700 mb-4">
        404
      </h1>

      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Page Not Found
      </h2>

      <p className="text-gray-600 max-w-xl mb-8">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>

      <Link
        href="/"
        className="px-8 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
