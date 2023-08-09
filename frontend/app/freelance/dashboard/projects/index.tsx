import { Button } from "@/components/ui/button";
import React from "react";
import Card from "./Card";

const Projects = () => {
  return (
    <div className="w-full p-2 space-y-4">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
        <Card key={item} />
      ))}
    </div>
  );
};

export default Projects;
