import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Poppins } from "next/font/google";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { LayoutProps } from "@/types";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--primary-font",
    display: "swap",
});

export default async function ProjectsLayout({ children, params }: LayoutProps) {
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    setRequestLocale(locale);

    return (
        <html lang={locale} className={`scroll-smooth ${poppins.variable}`} suppressHydrationWarning>
            <body>
                <ThemeProvider>
                    <NextIntlClientProvider >{children}</NextIntlClientProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
