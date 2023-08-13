"use client";
import React from "react";
import { motion } from "framer-motion";
import Projects from "@/app/projects/index";
import SideBar from "./sidebar";

const Wrapper = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-row w-full h-full md:divide-x-2 max-w-screen-xl mx-auto pt-8"
      transition={{ duration: 0.5 }}
    >
      <div className="md:w-3/4 w-full">
        <Projects />
      </div>
      <div className="md:w-1/4">
        <SideBar />
      </div>
    </motion.section>
  );
};

export default Wrapper;
