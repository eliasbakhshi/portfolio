"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Spinner from "./Spinner";

export default function Contact() {
    const [status, setStatus] = useState<React.ReactNode>("");
    const [loading, setLoading] = useState(false);
    const t = useTranslations("home.contactSection");
    const { executeRecaptcha } = useGoogleReCaptcha();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("")
        setLoading(true);
        const form = e.currentTarget;
        const data = {
            name: (form.elements.namedItem("name") as HTMLInputElement).value,
            email: (form.elements.namedItem("email") as HTMLInputElement).value,
            message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
        };

        // Check if executeRecaptcha is available
        if (!executeRecaptcha) {
            setLoading(false);
            setStatus(
                <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-secondary dark:text-red-400' role='alert'>
                    {t("form.statusMessages.error")}
                </div>
            );
            return;
        }

        const recaptchaToken = await executeRecaptcha("submit");

        // Add reCAPTCHA token to the request
        const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...data, recaptchaToken }),
        });

        if (res.ok) {
            setLoading(false);
            setStatus(
                <div className='p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-secondary dark:text-white-400' role='alert'>
                    {t("form.statusMessages.success")}
                </div>
            );
            form.reset();
        } else {
            setLoading(false);
            setStatus(
                <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-secondary dark:text-red-400' role='alert'>
                    {t("form.statusMessages.error")}
                </div>
            );
        }
    }

    return (
        <section id='contact' className='nav-section pt-4 pb-6 px-4 md:px-0'>
            <h5 className='mb-6'>{t("title")}</h5>
            <p className='pb-4 text-secondary-faded'>{t("description")}</p>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input type='text' name='name' required placeholder={t("form.name")} className='border border-secondary rounded px-4 py-2' />
                <input type='email' name='email' required placeholder={t("form.email")} className='border border-secondary rounded px-4 py-2' />
                <textarea name='message' required placeholder={t("form.message")} className='border border-secondary rounded px-4 py-2 min-h-[120px]' />
                {status && <>{status}</>}
                <button type='submit' disabled={loading} className='bg-tertiary text-white rounded px-4 py-2 hover:bg-tertiary/80 transition'>
                    {t("form.submit")}
                    {loading && <Spinner w={4} h={4} className='ml-2' />}
                </button>
            </form>
        </section>
    );
}
