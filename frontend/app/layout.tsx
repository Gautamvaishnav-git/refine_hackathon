import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import {Inter} from "next/font/google";
import RouterMounting from "@/app/shared/RouterMounting";
import TanstackQueryProvider from "./providers/QueryClientProvider";
import TailwindThemeProvider from "./providers/theme.provider";
import ProgressBar from "@/app/shared/progressBar/ProgressBar";
import React from "react";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
    title: "Linkers",
    description: "Meet with freelancers and job seekers.",
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <TanstackQueryProvider>
            <TailwindThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <RouterMounting>
                    <ProgressBar/>
                    {children}
                </RouterMounting>
            </TailwindThemeProvider>
        </TanstackQueryProvider>
        </body>
        </html>
    );
}
