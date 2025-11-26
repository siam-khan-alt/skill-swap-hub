"use client";

import useAxios from "@/hooks/useAxios";
import { useEffect, useState } from "react";
import SkillsCard from "./SkillsCard";
import LoadingState from "./LoadingState";

export default function LatestSkills() {
  const [latestSkills, setLatestSkills] = useState([]);
   const [loading, setLoading] = useState(true);
  const instanceAxios = useAxios();
    
  useEffect(() => {
    
    const fetchLatestSkills = async () => {
      setLoading(true)
      try {
        const res = await instanceAxios.get("/skills/latest");
        setLatestSkills(res.data);
      } catch (err) {
        console.error("Error fetching latest skills:", err);
      }
      finally{
        setLoading(false)
      }
    };

    fetchLatestSkills();
  }, [instanceAxios]);
if (loading) {
    return <LoadingState />;
  }
  return (
    <div className=" bg-indigo-100 ">
      <h2 className="text-4xl md:text-5xl font-bold mb-8 lg:mb-10 bg-clip-text text-transparent bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-center">Latest Skills</h2>
     
        <div className="max-w-full mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestSkills.map((skill) => <SkillsCard skill={skill} key={skill._id}></SkillsCard>)}
        </div>
   
    </div>
  );
}
