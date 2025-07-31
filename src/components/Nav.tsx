"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "@/styles/components/nav.module.scss";

export const NavLink = ({ href, children, isActive }: { href: string; children: React.ReactNode; isActive: boolean }) => {
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        const targetId = href.replace("#", "");
        const element = document.getElementById(targetId);

        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });

            window.history.pushState({}, "", href);
        }
    };

    return (
        <a href={href} onClick={handleClick} className={`${styles.link} ${isActive ? styles.active : ""} text-lg font-semibold`}>
            {children}
        </a>
    );
};

export default function Nav() {
    const [locale, setLocale] = useState("en");
    const [activeSection, setActiveSection] = useState("");
    const [sections, setSections] = useState<string[]>([]);
    const [sectionVisibility, setSectionVisibility] = useState<{ [key: string]: number }>({});
    const router = useRouter();

    useEffect(() => {
        const cookieLocale = document.cookie
            .split("; ")
            .find((row) => row.startsWith("ELIASAPP_LOCALE="))
            ?.split("=")[1];

        if (cookieLocale) {
            setLocale(cookieLocale);
        } else {
            const browserLocale = navigator.language.slice(0, 2);
            setLocale(browserLocale);
            document.cookie = `ELIASAPP_LOCALE=${browserLocale}`;
            router.refresh();
        }
    }, [router]);

    // Dynamically find all sections with the nav-section class
    useEffect(() => {
        const sectionElements = document.querySelectorAll(".nav-section");
        const sectionIds = Array.from(sectionElements)
            .map((el) => el.id)
            .filter((id) => id);
        setSections(sectionIds);

        if (sectionIds.length > 0) {
            setActiveSection(sectionIds[0]);
        }
    }, []);

    // Update active section based on highest visibility percentage
    useEffect(() => {
        const visibleSections = Object.entries(sectionVisibility).filter(([_, percent]) => percent > 0);

        if (visibleSections.length > 0) {
            // Find section with highest visibility percentage
            const mostVisibleSection = visibleSections.reduce((prev, current) => (current[1] > prev[1] ? current : prev));

            setActiveSection(mostVisibleSection[0]);
        }
    }, [sectionVisibility]);

    // Intersection Observer for tracking visibility percentages
    useEffect(() => {
        if (sections.length === 0) return;

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            setSectionVisibility((prev) => {
                const newVisibility = { ...prev };

                entries.forEach((entry) => {
                    // Calculate visibility percentage
                    const rect = entry.boundingClientRect;
                    const windowHeight = window.innerHeight;

                    let visibleHeight = 0;

                    if (entry.isIntersecting) {
                        // Calculate how much of the section is visible
                        const topVisible = Math.max(0, Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0));
                        visibleHeight = topVisible;
                    }

                    // Convert to percentage of the section's total height
                    const visibilityPercentage = (visibleHeight / rect.height) * 100;
                    newVisibility[entry.target.id] = Math.max(0, Math.min(100, visibilityPercentage));
                });

                return newVisibility;
            });
        };

        const observer = new IntersectionObserver(observerCallback, {
            root: null,
            rootMargin: "0px",
            threshold: Array.from({ length: 101 }, (_, i) => i / 100), // Check every 1% visibility
        });

        // Observe all dynamically found sections
        sections.forEach((sectionId) => {
            const element = document.getElementById(sectionId);
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            sections.forEach((sectionId) => {
                const element = document.getElementById(sectionId);
                if (element) {
                    observer.unobserve(element);
                }
            });
        };
    }, [sections]);

    const handleLocaleChange = (newLocale: string) => {
        setLocale(newLocale);
        document.cookie = `ELIASAPP_LOCALE=${newLocale}`;
        router.refresh();
    };

    const t = useTranslations("nav");

    // Define nav items with their corresponding section IDs
    const navItems = [
        { href: "#about", label: t("about"), sectionId: "about" },
        { href: "#experience", label: t("experience"), sectionId: "experience" },
        { href: "#projects", label: t("projects"), sectionId: "projects" },
        { href: "#contact", label: t("contact"), sectionId: "contact" },
    ];

    return (
        <nav className={`w-full gap-6 mt-4 hidden lg:flex ${styles.nav}`}>
            {navItems.map((item) => (
                <NavLink key={item.sectionId} href={item.href} isActive={activeSection === item.sectionId}>
                    {item.label}
                </NavLink>
            ))}
            {locale === "en" ? (
                <button className='text-lg' onClick={() => handleLocaleChange("sv")} aria-label={t("swedish")}>
                    🇸🇪
                </button>
            ) : (
                <button className='text-lg' onClick={() => handleLocaleChange("en")} aria-label={t("english")}>
                    🇬🇧
                </button>
            )}
        </nav>
    );
}
