"use client";
import React, { JSX } from "react";
import styles from "@/styles/components/footer.module.scss";

export default function Footer({ text }: { text: React.ReactNode }): JSX.Element {
    return (
        <footer className={`footer ${styles.footer}`}>
            <div className={`container mx-auto pb-6 nav-section px-4 md:px-0 text-sm text-secondary-faded`}>{text}</div>
        </footer>
    );
}
