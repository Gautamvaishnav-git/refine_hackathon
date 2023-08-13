"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
      className="rounded-full p-2 overflow-hidden"
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
}
