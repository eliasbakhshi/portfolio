"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "@/styles/components/nav.module.scss";
import ThemeToggle from "@/components/ThemeToggle";
import { FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export const NavLink = ({ href, children, isActive, onClick }: { href: string; children: React.ReactNode; isActive: boolean; onClick?: () => void }) => {
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        const targetId = href.replace("#", "");
        const element = document.getElementById(targetId);

        if (element) {
            const isMobileOrTablet = window.innerWidth < 1024;
            const yOffset = isMobileOrTablet ? -32 : 0;
            const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({
                top: y,
                behavior: "smooth",
            });
            window.history.pushState({}, "", href);
        }
        if (onClick) onClick();
    };

    return (
        <a href={href} onClick={handleClick} className={`${styles.link} ${isActive ? styles.active : ""} text-lg font-semibold`}>
            {children}
        </a>
    );
};

export default function Nav({ id = "" }: { id?: string }) {
    const [locale, setLocale] = useState("en-US");
    const [activeSection, setActiveSection] = useState("");
    const [sections, setSections] = useState<string[]>([]);
    const [sectionVisibility, setSectionVisibility] = useState<{ [key: string]: number }>({});
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const cookieLocale = document.cookie
            .split("; ")
            .find((row) => row.startsWith("NEXT_LOCALE="))
            ?.split("=")[1];

        if (cookieLocale) {
            setLocale(cookieLocale);
        } else {
            const browserLocale = navigator.language.slice(0, 2);
            setLocale(browserLocale);
            document.cookie = `NEXT_LOCALE=${browserLocale}`;
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const visibleSections = Object.entries(sectionVisibility).filter(([_, percent]) => percent > 0);

        if (visibleSections.length > 0) {
            // Find the section with the highest visibility percentage
            const mostVisibleSection = visibleSections.reduce((prev, current) => (current[1] > prev[1] ? current : prev));

            const newActiveSection = mostVisibleSection[0];

            // Update the active section state
            if (newActiveSection !== activeSection) {
                setActiveSection(newActiveSection);

                // Update the URL hash without reloading the page
                window.history.replaceState(null, "", `#${newActiveSection}`);
            }
        }
    }, [sectionVisibility, activeSection]);

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
            threshold: Array.from({ length: 101 }, (_, i) => i / 100),
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
        const currentPath = window.location.pathname + window.location.search;
        const hash = window.location.hash;

        const pathSegments = currentPath.split("/").filter(Boolean);

        // Remove the existing locale prefix if present
        if (routing.locales.includes(pathSegments[0] as (typeof routing.locales)[number])) {
            pathSegments.shift();
        }

        const newPath = newLocale === routing.defaultLocale ? `/${pathSegments.join("/")}${hash}` : `/${newLocale}/${pathSegments.join("/")}${hash}`;

        document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
        router.push(newPath || "/");
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
        <>
            {/* Hamburger for mobile */}
            <div id='mobile-menu' className='fixed top-0 z-50 flex md:hidden items-center justify-between py-4 w-[calc(100%-2rem)] bg-primary transition-colors duration-200 shadow-[0_8px_15px_-6px_rgba(255,255,255,0.1)]'>
                <Link className='dark:inline-block hidden' href='/'>
                    <Image src='/images/logo-white.png' alt='Elias Bakhshi' width={32} height={32} />
                </Link>
                <Link className='inline-block dark:hidden' href='/'>
                    <Image src='/images/logo-black.png' alt='Elias Bakhshi' width={32} height={32} />
                </Link>
                <div className='flex items-center gap-2'>
                    <ThemeToggle />
                    <button aria-label='Open menu' onClick={() => setMenuOpen(true)} className='p-2'>
                        <FiMenu size={24} />
                    </button>
                </div>
            </div>
            {/* Mobile menu */}
            <div className='md:hidden'>
                {/* Backdrop */}
                <div className={`fixed inset-0 z-40 transition-opacity duration-200 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} onClick={() => setMenuOpen(false)} />
                {/* Sliding menu */}
                <div
                    className={`fixed top-0 right-0 h-screen w-[75vw] max-w-xs z-50 bg-primary/95 flex flex-col items-center justify-center shadow-lg
                        transition-transform duration-200 ease-in-out
                        ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
                >
                    <button aria-label='Close menu' onClick={() => setMenuOpen(false)} className='absolute top-4 right-4 p-2'>
                        <FiX size={32} />
                    </button>
                    <nav className='flex flex-col gap-6 mt-12'>
                        {navItems.map((item) => (
                            <NavLink key={item.sectionId} href={item.href} isActive={activeSection === item.sectionId} onClick={() => setMenuOpen(false)}>
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>
                    <div className='mt-8'>
                        {locale === "en-US" ? (
                            <button
                                className='text-lg'
                                onClick={() => {
                                    handleLocaleChange("sv");
                                    setMenuOpen(false);
                                }}
                            >
                                🇸🇪 Svenska
                            </button>
                        ) : (
                            <button
                                className='text-lg'
                                onClick={() => {
                                    handleLocaleChange("en-US");
                                    setMenuOpen(false);
                                }}
                            >
                                🇬🇧 English
                            </button>
                        )}
                    </div>
                </div>
            </div>
            {/* Desktop/tablet nav */}
            <nav id={id} className={`gap-5 shadow-[0_8px_15px_-4px_rgba(255,255,255,0.1)] lg:shadow-none transition-color duration-200 ease-in-out`}>
                {navItems.map((item) => (
                    <NavLink key={item.sectionId} href={item.href} isActive={activeSection === item.sectionId}>
                        {item.label}
                    </NavLink>
                ))}
                <ThemeToggle />
                {locale === "en-US" ? (
                    <button className={`cursor-pointer transition-transform duration-200 ease-in-out hover:-translate-y-[2px] hover:text-tertiary ${styles.languageButton}`} onClick={() => handleLocaleChange("sv")} aria-label={t("swedish")}>
                        🇸🇪
                    </button>
                ) : (
                    <button className={`cursor-pointer transition-transform duration-200 ease-in-out hover:-translate-y-[2px] hover:text-tertiary ${styles.languageButton}`} onClick={() => handleLocaleChange("en-US")} aria-label={t("english")}>
                        🇬🇧
                    </button>
                )}
            </nav>
        </>
    );
}
