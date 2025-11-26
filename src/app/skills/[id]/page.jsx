"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useAxios from "@/hooks/useAxios";
import LoadingState from "@/component/LoadingState";

export default function SkillDetails() {
  const params = useParams();
  const { id } = params; 
  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const router = useRouter();
  const instanceAxios = useAxios();

  useEffect(() => {
    if (!id) return; 
    const fetchSkillDetails = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await instanceAxios.get(`/skills/${id}`); 
        if (res.data) setSkill(res.data);
        else setError(true);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchSkillDetails();
  }, [id, instanceAxios]);

  if (loading) return <LoadingState />;
  if (error || !skill)
    return <div className="text-center mt-20 text-red-600 font-semibold text-xl">Skill not found! (ID: {id})</div>;

  return (
    <div className="container bg-linear-to-b from-indigo-100 to-purple-50 mx-auto px-4 py-10">
      <button
        onClick={() => router.back()}
        className="mb-6 px-4 py-2 bg-linear-to-r from-indigo-500 to-purple-600 text-white rounded hover:from-indigo-600 hover:to-purple-700 transition"
      >
        Back
      </button>
      <div className="bg-linear-to-r from-indigo-500 to-purple-600 shadow-lg rounded-xl p-8 text-white">
        <div className="flex flex-col md:flex-row gap-8">
      
          <img
            src={skill.icon}
            alt={skill.title}
            className="w-full md:w-64 h-64 object-contain rounded-lg shadow-md border-2 border-white"
          />
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{skill.title}</h1>
            <span className="inline-block bg-purple-700 px-3 py-1 rounded-full text-sm mb-4">{skill.category}</span>
            <p className="mb-4 text-white/90">{skill.description}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-white/80">
              <p><strong>Level:</strong> {skill.level}</p>
              <p><strong>Duration:</strong> {skill.duration}</p>
              <p><strong>Price:</strong> {skill.price}</p>
              <p><strong>Priority:</strong> {skill.priority}</p>
              <p><strong>Author:</strong> {skill.author}</p>
              <p><strong>Language:</strong> {skill.language}</p>
              <p><strong>Rating:</strong> {skill.rating} ⭐</p>
              <p><strong>Students:</strong> {skill.studentsEnrolled || 0}</p>
            </div>
            {skill.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {skill?.tags?.map(tag => (
                  <span key={tag} className="bg-white/20 px-2 py-1 rounded-full text-sm">{tag}</span>
                ))}
              </div>
            )}

            {skill.learningOutcomes?.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold text-lg mb-2">Learning Outcomes:</h3>
                <ul className="list-disc list-inside space-y-1 text-white/90">
                  {skill?.learningOutcomes?.map((outcome, i) => <li key={i}>{outcome}</li>)}
                </ul>
              </div>
            )}

            {skill.requirements?.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold text-lg mb-2">Requirements:</h3>
                <ul className="list-disc list-inside space-y-1 text-white/90">
                  {skill.requirements.map((req, i) => <li key={i}>{req}</li>)}
                </ul>
              </div>
            )}

            {skill.createdAt && <p className="text-white/70 text-sm">Created: {new Date(skill.createdAt).toLocaleDateString()}</p>}
            {skill.lastUpdated && <p className="text-white/70 text-sm">Updated: {new Date(skill.lastUpdated).toLocaleDateString()}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
