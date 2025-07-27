"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "@/styles/components/nav.module.scss";

export const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        const targetId = href.replace("#", "");
        const element = document.getElementById(targetId);

        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });

            // Update URL without reload
            window.history.pushState({}, "", href);
        }
    };

    return (
        <a href={href} onClick={handleClick} className='text-lg font-semibold'>
            {children}
        </a>
    );
};

export default function Nav() {
    const [locale, setLocale] = useState("en");
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

    const handleLocaleChange = (newLocale: string) => {
        setLocale(newLocale);
        document.cookie = `ELIASAPP_LOCALE=${newLocale}`;
        router.refresh();
    };
    const t = useTranslations("nav");

    return (
        <nav className={`w-full gap-6 mt-4 hidden lg:flex ${styles.nav}`}>
            <NavLink href='#about'>{t("about")}</NavLink>
            <NavLink href='#experience'>{t("experience")}</NavLink>
            <NavLink href='#projects'>{t("projects")}</NavLink>
            <NavLink href='#contact'>{t("contact")}</NavLink>
            {locale === "en" ? (
                <button className='' onClick={() => handleLocaleChange("sv")} aria-label={t("swedish")}>
                    🇸🇪
                </button>
            ) : (
                <button className='' onClick={() => handleLocaleChange("en")} aria-label={t("english")}>
                    🇬🇧
                </button>
            )}
        </nav>
    );
}
