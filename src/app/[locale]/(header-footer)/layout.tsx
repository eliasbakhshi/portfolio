import "@/styles/main.scss";
import Nav from "@/components/Nav";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Poppins } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { LayoutProps, TypeAbout, TypeNavMenu } from "@/types";
import { getAbout, getNav } from "@/contentful/queries";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--primary-font",
    display: "swap",
});

export default async function RootLayout({ children, params }: LayoutProps) {
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    setRequestLocale(locale);

    const nav = await getNav(locale) as TypeNavMenu;
    const aboutSection = await getAbout(locale) as TypeAbout;
    return (
        <html lang={locale} className={`scroll-smooth ${poppins.variable}`} suppressHydrationWarning>
            <body suppressHydrationWarning>
                <ThemeProvider>
                    <NextIntlClientProvider>
                        <div className='min-h-screen bg-primary text-secondary font-primary transition-colors duration-200' style={{ overflow: "hidden" }}>
                            <main className='container mx-auto custom-grid lg:px-4 xl:px-0'>
                                <Nav id='menu' nav={nav} />
                                <div id='left'>
                                    <h1 className='text-h1 font-bold text-secondary py-1'>{aboutSection.name}</h1>
                                    <h5 className='text-h5 text-secondary'>{aboutSection.title}</h5>
                                    <p className='py-5 lg:w-[75%] text-paragraph text-secondary-faded leading-relaxed'>{aboutSection.description}</p>
                                    <div className='flex gap-6 items-center mt-auto h-20'>
                                        <Link href='https://www.linkedin.com/in/eliasbakhshi' target='_blank' rel='noopener noreferrer'>
                                            <FaLinkedin size='2em' className='color-secondary cursor-pointer transition-transform duration-200 ease-in-out hover:-translate-y-[2px] hover:text-tertiary' />
                                        </Link>
                                        <Link href='https://github.com/eliasbakhshi' target='_blank' rel='noopener noreferrer'>
                                            <FaGithub size='2em' className='color-secondary cursor-pointer transition-transform duration-200 ease-in-out hover:-translate-y-[2px] hover:text-tertiary' />
                                        </Link>
                                    </div>
                                </div>
                                <div id='right'>{children}</div>
                            </main>
                        </div>
                    </NextIntlClientProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
