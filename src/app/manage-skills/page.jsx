"use client";

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { MdDelete, MdEdit, MdVisibility } from 'react-icons/md';
import useAxios from '@/hooks/useAxios';
import LoadingState from '@/component/LoadingState';

export default function ManageMySkillsPage() {
  const instanceAxios = useAxios();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const authorEmail = session?.user?.email || searchParams.get('email');

  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMySkills = useCallback(async () => {
    if (!authorEmail) {
      setLoading(false);
      setError("Error: User email not available. Please log in.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await instanceAxios.get(`/skills/my-skills?email=${authorEmail}`);
      setSkills(res.data);
    } catch (err) {
      console.error("Error fetching user skills:", err);
      setError("Failed to load skills. Please check server status.");
    } finally {
      setLoading(false);
    }
  }, [instanceAxios, authorEmail]);

  useEffect(() => {
    if (status === 'authenticated' && authorEmail) {
      fetchMySkills();
    } else if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, authorEmail, fetchMySkills, router]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await instanceAxios.delete(`/skills/${id}`);
        Swal.fire('Deleted!', 'Your skill has been deleted.', 'success');
        setSkills(prev => prev.filter(skill => skill._id !== id));
      } catch (err) {
        console.error(err);
        Swal.fire('Error!', 'Failed to delete skill.', 'error');
      }
    }
  };

  if (loading) return <LoadingState />;

  if (status === 'unauthenticated' || error) {
    return (
      <div className="text-center mt-20 p-8 text-red-600 min-h-screen pt-40">
        <p className="text-xl font-semibold">Access Denied</p>
        <p>{error || "You must be logged in to view this page."}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-screen bg-linear-to-b from-indigo-100 to-purple-50">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-purple-600 to-indigo-600 mb-2">
          Manage My Skills
        </h1>
        <p className="text-lg text-gray-600">
          Total Skills Posted: <span className="font-bold text-indigo-500">{skills.length}</span> (by {authorEmail})
        </p>
      </header>

      {skills.length === 0 ? (
        <div className="text-center mt-28 p-10 border-2 border-dashed border-gray-300 rounded-xl max-w-lg mx-auto bg-white shadow-md">
          <p className="text-xl text-gray-700 font-semibold mb-4">You have not posted any skills yet!</p>
          <Link
            href="/add-skill"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition duration-150"
          >
            + Add Your First Skill
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map(skill => (
            <div
              key={skill._id}
              className="bg-linear-to-r from-indigo-500 to-purple-600 border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden flex flex-col"
            >
              <div className="p-5 flex-grow">
                <div className="flex items-center mb-3">
                  {skill.icon && (
                    <img src={skill.icon} alt={skill.title} className="w-10 h-10 mr-3 rounded-full object-cover" />
                  )}
                  <h2 className="text-xl font-bold text-white line-clamp-1">{skill.title}</h2>
                </div>
                <p className="text-sm text-indigo-200 mb-4 line-clamp-2">{skill.description}</p>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium text-amber-300">Level:</span> {skill.level}</p>
                  <p><span className="font-medium text-amber-300">Duration:</span> {skill.duration}</p>
                  <p><span className="font-medium text-amber-300">Price:</span> {skill.price}</p>
                  <p className="truncate"><span className="font-medium text-amber-300">Tags:</span> {skill.tags.join(', ')}</p>
                </div>
              </div>
              <div className="p-4 bg-indigo-700/50 border-t flex justify-between space-x-2">
                <Link
                  href={`/skills/${skill._id}`}
                  className="flex-1 inline-flex items-center justify-center p-2 text-sm font-medium text-indigo-200 border border-indigo-200/50 hover:bg-indigo-700 rounded-lg transition"
                  title="View Details"
                >
                  <MdVisibility className="mr-1" /> View
                </Link>
                <Link
                  href={`/edit-skill/${skill._id}`}
                  className="flex-1 inline-flex items-center justify-center p-2 text-sm font-medium text-amber-300 border border-amber-300/50 hover:bg-purple-800 rounded-lg transition"
                  title="Edit Skill"
                >
                  <MdEdit className="mr-1" /> Edit
                </Link>
                <button
                  onClick={() => handleDelete(skill._id)}
                  className="flex-1 inline-flex items-center justify-center p-2 text-sm font-medium text-red-300 border border-red-300/50 hover:bg-red-800/70 rounded-lg transition"
                  title="Delete Skill"
                >
                  <MdDelete className="mr-1" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
