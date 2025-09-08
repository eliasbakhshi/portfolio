// src/components/providers/ThemeProvider.tsx
"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export function ThemeProvider({ children }: { children: ReactNode }) {
    return (
        <NextThemeProvider attribute='class' defaultTheme='dark' enableSystem={true} disableTransitionOnChange={false}>
            <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY || ""}>{children}</GoogleReCaptchaProvider>
        </NextThemeProvider>
    );
}
