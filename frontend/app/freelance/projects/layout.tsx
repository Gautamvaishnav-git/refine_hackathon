import React from "react";
import {Metadata} from "next";
import Header from "@/app/freelance/projects/components/Header";
import ProgressBar from "@/app/shared/progressBar/ProgressBar";
import IProp from "@/lib/interfaces/IProp";

export const metadata: Metadata = {
    title: "Portal | Project"
}

export default function ProjectLayout({children}: IProp) {
    return <>
        {/*<ProgressBar />*/}
        <Header/>
        {children}
    </>
}