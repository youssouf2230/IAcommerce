"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ToggleTheme = () => {
    const { theme, setTheme } = useTheme();
    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <Button
                
            onClick={toggleTheme}
            variant="ghost"
            size="icon"
            className=" group"
        >
            {theme === "dark" ? (
                <Sun
                    id="sun"
                    className="h-[1rem] w-[1rem] rotate-0 scale-100 transition-all group-focus:rotate-12"
                />
            ) : (
                <Moon
                    id="moon"
                    className="h-[1rem] w-[1rem] rotate-0 scale-100 transition-all group-focus:rotate-12"
                />
            )}
        </Button>
    );
};

export default ToggleTheme;