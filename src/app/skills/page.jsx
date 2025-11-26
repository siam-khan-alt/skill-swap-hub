"use client";


import { useEffect, useState } from "react";
import useAxios from "@/hooks/useAxios";
import SkillsCard from "@/component/SkillsCard";
import LoadingState from "@/component/LoadingState";

export default function SkillsPage() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  const instanceAxios = useAxios(); 

    useEffect(() => {
        const fetchSkills = async () => {
            setLoading(true); 
            setError(null);

            try {
                const res = await instanceAxios.get('/skills');
                setSkills(res.data); 
                
            } catch (err) {
                console.error("Error fetching skills:", err);
                setError("Failed to load skills. Check if the backend is running on port 5000."); 
                setSkills([]);
            } finally {
                setLoading(false);
            }
        };

        fetchSkills();
    }, [instanceAxios]); 
    
 if (loading) {
    return <LoadingState />;
  }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-20 text-center text-red-600 font-bold">
                Error: {error}
            </div>
        );
    }
    
  

  return (
    <div className="container mx-auto px-4 py-8 lg:py-10 bg-gray-100">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 lg:mb-10 bg-clip-text text-transparent bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-center">All Skills</h1>
      
      <div className="grid items-center justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill) => <SkillsCard skill={skill} key={skill._id}></SkillsCard>)}
       
      </div>
    </div>
  );
}
