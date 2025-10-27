// src/components/providers/ThemeProvider.tsx
"use client";

import { useEffect } from "react";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // apply body styles only on client after hydration
        const prevIsolation = document.body.style.isolation;
        document.body.style.isolation = "isolate";

        return () => {
            // restore previous value on unmount
            document.body.style.isolation = prevIsolation || "";
        };
    }, []);

    return (
        <NextThemeProvider attribute='class' defaultTheme='dark' enableSystem={true} disableTransitionOnChange={false}>
            <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY || ""}>{children}</GoogleReCaptchaProvider>
        </NextThemeProvider>
    );
}
