import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

export const metadata: Metadata = {
    title: "Elias Bakhshi - Projects",
    description: "Projects by Elias Bakhshi",
};

export default async function ProjectsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const locale = await getLocale();
    const messages = await getMessages();

    return (
        <html lang={locale} className='scroll-smooth' suppressHydrationWarning>
            <body>
                <ThemeProvider>
                    <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
