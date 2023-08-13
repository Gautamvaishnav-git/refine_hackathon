import React from "react";
import Navbar from "./components/Header";
import NextTopLoader from "nextjs-toploader";
import ProgressBar from "@/app/shared/progressBar/ProgressBar";

const Layout = ({children}: { children: React.ReactNode }) => {
    return (
        <>
            {/*<ProgressBar/>*/}
            <Navbar/>
            {children}
        </>
    );
};

export default Layout;
