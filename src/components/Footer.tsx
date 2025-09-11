/* eslint-disable react/display-name */
"use client";
import React, { JSX } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer(): JSX.Element {
    const t = useTranslations("home");
    const links = [
        { key: "figma", url: "https://www.figma.com/design/NSD2Tig5QdsLvGlXingsmG/Portfolio?node-id=12-15&t=pF0k2IgUwL5aiWso-1" },
        { key: "vscode", url: "https://code.visualstudio.com/" },
        { key: "nextjs", url: "https://nextjs.org/" },
        { key: "tailwind", url: "https://tailwindcss.com/" },
        { key: "vercel", url: "https://vercel.com/" },
    ];

    const renderLink = (url: string) => (chunks: React.ReactNode) =>
        (
            <strong>
                <Link href={url} target='_blank' rel='noopener noreferrer'>
                    {chunks}
                </Link>
            </strong>
        );

    const richParams: Record<string, (chunks: React.ReactNode) => React.ReactNode> = {
        year: () => <>{new Date().getFullYear()}</>,
    };

    links.forEach(({ key, url }) => {
        richParams[key] = renderLink(url);
    });

    const footer = t.rich("footer", richParams);

    return (
        <footer>
            <div className='container mx-auto py-4 nav-section px-4 md:px-0'>
                <p className='text-sm text-secondary-faded'>{footer}</p>
            </div>
        </footer>
    );
}
