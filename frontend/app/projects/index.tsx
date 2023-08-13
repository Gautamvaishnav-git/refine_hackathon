import { Button } from "@/components/ui/button";
import React from "react";
import Card from "./Card";
import jobs from "@/jobs.json";

const Projects = () => {
  return (
    <div className="w-full p-2 space-y-4">
      {jobs.slice(0, 10).map((job) => (
        <Card key={job.id} projectId={job.id} {...job} />
      ))}
    </div>
  );
};

export default Projects;
