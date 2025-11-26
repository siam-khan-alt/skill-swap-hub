"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import useAxios from "@/hooks/useAxios";
import {
  FaUserCircle,
  FaEnvelope,
  FaStar,
  FaTools,
  FaExclamationTriangle,
} from "react-icons/fa";
import LoadingState from "@/component/LoadingState";

export default function UserProfile() {
  const { data: session, status } = useSession();
  const [mySkills, setMySkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const instanceAxios = useAxios();

  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchMySkills = async () => {
      try {
        const res = await instanceAxios.get(
          `/skills/my-skills?email=${session.user.email}`
        );
        setMySkills(res.data);
      } catch (err) {
        console.error(err);
        setErrorMsg("Failed to load your skills");
      } finally {
        setLoading(false);
      }
    };

    fetchMySkills();
  }, [session?.user?.email, instanceAxios]);

  if (status === "unauthenticated")
    return (
      <p className="text-center mt-20 text-lg font-semibold text-gray-600">
        Please login to view your profile.
      </p>
    );

  if (loading) {
    return <LoadingState />;
  }

  if (errorMsg)
    return (
      <div className="text-center mt-20 text-red-600 flex flex-col items-center gap-3">
        <FaExclamationTriangle className="text-4xl" />
        <p className="font-semibold">{errorMsg}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-linear-to-b from-indigo-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        
        <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
          <FaUserCircle className="text-7xl text-indigo-600" />

          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-1">
              {session?.user?.name}
            </h2>

            <p className="flex items-center gap-2 text-gray-600">
              <FaEnvelope className="text-indigo-500" />
              {session?.user?.email}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-indigo-700">
            <FaTools /> My Skills
          </h3>

          {mySkills.length === 0 ? (
            <div className="text-center py-12 text-gray-600">
              <FaTools className="mx-auto text-5xl mb-3 text-gray-400" />
              <p className="font-semibold">You have not added any skills yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mySkills.map((skill) => (
                <div
                  key={skill._id}
                  className="border rounded-xl p-5 shadow hover:shadow-lg transition bg-linear-to-br from-white to-indigo-50"
                >
                  <h4 className="text-xl font-bold text-indigo-700">
                    {skill.title}
                  </h4>

                  <p className="text-gray-600 mt-2">
                    {skill.description}
                  </p>

                  {skill.rating && (
                    <div className="flex items-center gap-2 mt-3 text-yellow-500">
                      <FaStar />
                      <span className="font-semibold text-gray-700">
                        Rating: {skill.rating}
                      </span>
                    </div>
                  )}

                  <div className="mt-4 text-sm text-gray-500">
                    Category: {skill.category || "General"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
