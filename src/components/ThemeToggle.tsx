// src/components/ThemeToggle.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme, resolvedTheme } = useTheme();

    useEffect(() => {
        // Force re-apply theme classes
        if (mounted) {
            const html = document.documentElement;
            if (resolvedTheme === "dark") {
                html.classList.add("dark");
            } else {
                html.classList.remove("dark");
            }
        }
    }, [theme, resolvedTheme, mounted]);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className='w-8 h-8 rounded-custom bg-secondary/20' />;
    }

    const toggleTheme = () => {
        const newTheme = resolvedTheme === "light" ? "dark" : "light";
        setTheme(newTheme);

        // Force immediate DOM update
        const html = document.documentElement;
        if (newTheme === "dark") {
            html.classList.add("dark");
        } else {
            html.classList.remove("dark");
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className='p-2 cursor-pointer transition-transform duration-200 ease-in-out hover:-translate-y-[2px] hover:text-tertiary hover-effect'
            aria-label={`Switch to ${resolvedTheme === "light" ? "dark" : "light"} mode`}
        >
            {resolvedTheme === "light" ? <FiMoon size={18} /> : <FiSun size={18} />}
        </button>
    );
}
