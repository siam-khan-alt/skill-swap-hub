"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import useAxios from "@/hooks/useAxios";
import Swal from "sweetalert2";

export default function EditSkillPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = useParams();
  const instanceAxios = useAxios();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    rating: "",
    category: "",
    level: "Beginner",
    tags: "",
    requirements: "",
    learningOutcomes: "",
    icon: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (status === "loading" || !id) return;
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    const fetchSkill = async () => {
      setLoading(true);
      try {
        const res = await instanceAxios.get(`/skills/${id}`);
        const skill = res.data;

        if (session?.user?.email !== skill.author) {
          setError("You do not have permission to edit this skill.");
          setLoading(false);
          return;
        }

        const formatted = {
          ...skill,
          tags: Array.isArray(skill.tags) ? skill.tags.join(", ") : skill.tags || "",
          requirements: Array.isArray(skill.requirements)
            ? skill.requirements.join(", ")
            : skill.requirements || "",
          learningOutcomes: Array.isArray(skill.learningOutcomes)
            ? skill.learningOutcomes.join("\n")
            : skill.learningOutcomes || "",
        };

        setFormData(formatted);
      } catch (err) {
        setError("Failed to load skill data.");
      } finally {
        setLoading(false);
      }
    };

    fetchSkill();
  }, [id, session, status, instanceAxios, router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session?.user?.email) {
      Swal.fire({
        icon: "error",
        title: "Session Expired",
        text: "Please login again.",
        background: "#FEF3C7",
        color: "#B45309",
        confirmButtonColor: "#F59E0B",
      });
      return;
    }

    setIsSubmitting(true);

    const updateData = {
      ...formData,
      tags: formData.tags.split(",").map((x) => x.trim()).filter(Boolean),
      requirements: formData.requirements.split(",").map((x) => x.trim()).filter(Boolean),
      learningOutcomes: formData.learningOutcomes.split("\n").map((x) => x.trim()).filter(Boolean),
      price: parseFloat(formData.price) || 0,
      rating: parseFloat(formData.rating) || null,
      lastUpdated: new Date().toISOString(),
    };

    delete updateData._id;
    delete updateData.createdAt;
    delete updateData.author;

    try {
      await instanceAxios.patch(`/skills/${id}`, updateData);
      Swal.fire({
        icon: "success",
        title: "Skill Updated!",
        text: "Your skill has been successfully updated.",
        background: "#ECFDF5",
        color: "#065F46",
        confirmButtonColor: "#10B981",
      });
      router.push(`/skills/my-skills?email=${session.user.email}`);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong. Try again.",
        background: "#FEF2F2",
        color: "#991B1B",
        confirmButtonColor: "#EF4444",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="text-center mt-20 text-gray-600 font-medium text-lg min-h-screen pt-40">
        Loading skill data...
      </div>
    );

  if (error)
    return <p className="text-red-500 text-center mt-10 text-lg">{error}</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-indigo-100 to-purple-50 p-4">
      <div className="w-full max-w-3xl bg-linear-to-t from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-2xl p-1">
        <div className="bg-white/90 backdrop-blur-lg rounded-xl p-8">
          <h2 className="text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500">
            Edit Skill
          </h2>

          <div className="mb-4 text-center text-sm text-indigo-600 p-2 border border-indigo-200 rounded-lg bg-indigo-50">
            Editing as: <strong>{session.user.email}</strong>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="block mb-1 font-medium text-gray-700">Skill Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter skill title e.g., React Basics"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                placeholder="Short description (2-3 lines)"
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Icon URL</label>
              <input
                type="text"
                name="icon"
                placeholder="Paste image or icon URL (optional)"
                value={formData.icon}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Skill Level</label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Beginner">Beginner - Basic understanding</option>
                <option value="Intermediate">Intermediate - Some experience</option>
                <option value="Advanced">Advanced - Hands-on experience</option>
                <option value="Expert">Expert - Extensive experience</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Price</label>
              <input
                type="text"
                name="price"
                placeholder="Price in USD (e.g., 49.99)"
                value={formData.price}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Rating</label>
              <input
                type="number"
                name="rating"
                placeholder="Rate 0-5"
                value={formData.rating}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                min={0}
                max={5}
                step={0.1}
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Category</label>
              <input
                type="text"
                name="category"
                placeholder="e.g., Web Development, Design"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Tags</label>
              <input
                type="text"
                name="tags"
                placeholder="Comma separated tags e.g., React,JS,Frontend"
                value={formData.tags}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Requirements</label>
              <textarea
                name="requirements"
                placeholder="Comma separated requirements e.g., Basic HTML,CSS"
                value={formData.requirements}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Learning Outcomes</label>
              <textarea
                name="learningOutcomes"
                placeholder="One per line e.g., Understand React components"
                value={formData.learningOutcomes}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 mt-4 font-semibold text-white rounded-lg transition ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-purple-500 hover:to-indigo-500"
              }`}
            >
              {isSubmitting ? "Updating..." : "Update Skill"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
