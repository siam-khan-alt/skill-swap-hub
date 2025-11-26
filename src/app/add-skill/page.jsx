"use client";

import { useState } from "react";
import useAxios from "@/hooks/useAxios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

export default function AddSkillForm() {
  const instanceAxios = useAxios();
  const router = useRouter();
  const { data: session, status } = useSession();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "",
    level: "Beginner",
    duration: "",
    price: "",
    priority: "Medium",
    language: "",
    tags: "",
    learningOutcomes: "",
    requirements: "",
    rating: "",
    category: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (status === "loading") {
    return (
      <div className="text-center mt-20 text-gray-600 font-medium text-lg min-h-screen pt-40">
        Loading user session and form...
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  const authorEmail = session?.user?.email;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!authorEmail) {
      Swal.fire({
        icon: "error",
        title: "Session Expired",
        text: "Please log in again.",
        background: "#FEF3C7",
        color: "#B45309",
        confirmButtonColor: "#F59E0B",
      });
      return;
    }

    setIsSubmitting(true);

    const dataToSend = {
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      learningOutcomes: formData.learningOutcomes
        .split("\n")
        .map((i) => i.trim())
        .filter(Boolean),
      requirements: formData.requirements
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean),
      price: formData.price.startsWith("$") ? formData.price : `$${formData.price}`,
      author: authorEmail,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await instanceAxios.post("/skills", dataToSend);

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Skill Added!",
          text: "Your skill has been successfully added.",
          background: "#ECFDF5",
          color: "#065F46",
          confirmButtonColor: "#10B981",
        });

        setFormData({
          title: "",
          description: "",
          icon: "",
          level: "Beginner",
          duration: "",
          price: "",
          priority: "Medium",
          language: "",
          tags: "",
          learningOutcomes: "",
          requirements: "",
          rating: "",
          category: "",
        });

        router.push("/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Failed to add skill. Check the backend server.",
          background: "#FEF2F2",
          color: "#991B1B",
          confirmButtonColor: "#EF4444",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong! Try again.",
        background: "#FEF2F2",
        color: "#991B1B",
        confirmButtonColor: "#EF4444",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-indigo-100 to-purple-50 p-4">
      <div className="w-full max-w-3xl bg-linear-to-t from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-2xl p-1">
        <div className="bg-white/90 backdrop-blur-lg rounded-xl p-8">
          <h2 className="text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500">
            Add New Skill
          </h2>

          <div className="mb-4 text-center text-sm text-indigo-600 p-2 border border-indigo-200 rounded-lg bg-indigo-50">
            Posting as: <strong>{authorEmail}</strong>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Skill Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="text"
              name="icon"
              placeholder="Icon URL or Image URL"
              value={formData.icon}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
            <input
              type="text"
              name="duration"
              placeholder="Duration (e.g., 3 hours)"
              value={formData.duration}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="text"
              name="price"
              placeholder="Price (e.g., $20)"
              value={formData.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
            <input
              type="text"
              name="language"
              placeholder="Language"
              value={formData.language}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="text"
              name="tags"
              placeholder="Tags (comma separated)"
              value={formData.tags}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <textarea
              name="learningOutcomes"
              placeholder="Learning Outcomes (one per line)"
              value={formData.learningOutcomes}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <textarea
              name="requirements"
              placeholder="Requirements (comma separated)"
              value={formData.requirements}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="number"
              name="rating"
              placeholder="Rating"
              value={formData.rating}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 mt-4 font-semibold text-white rounded-lg transition ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-purple-500 hover:to-indigo-500"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Add Skill"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
