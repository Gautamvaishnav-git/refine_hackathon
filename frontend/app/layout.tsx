import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { Inter } from "next/font/google";
import RouterMounting from "@/app/shared/RouterMounting";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Linkers",
  description: "Meet with freelancers and job seekers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RouterMounting>
          <NextTopLoader />
          {children}
        </RouterMounting>
      </body>
    </html>
  );
}
