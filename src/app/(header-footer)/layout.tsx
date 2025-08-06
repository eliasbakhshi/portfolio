// import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/main.scss";
import Nav from "@/components/Nav";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const locale = await getLocale();
    const messages = await getMessages();

    return (
        <html lang={locale} className='scroll-smooth w-full' suppressHydrationWarning>
            <body className='antialiased'>
                <ThemeProvider>
                    <NextIntlClientProvider messages={messages}>
                        <div className='min-h-screen bg-primary text-secondary font-primary transition-colors duration-300' style={{ overflow: "hidden" }}>
                            <main className='container mx-auto px-4 xl:px-0 custom-grid'>
                                {/* Nav/Header */}
                                <Nav className='navigation-area' />
                                {/* Left/Sidebar */}
                                <div className='left-area'>
                                    <h1 className='text-h1 font-bold text-secondary py-1'>Elias Bakhshi</h1>
                                    <h5 className='text-h5 text-secondary'>Full Stack Engineer</h5>
                                    <p className='w-[70%] py-5 text-paragraph text-secondary-faded leading-relaxed'>Creative, target oriented and passionate developer with a knack for building dynamic web applications.</p>
                                    <div className='flex gap-6 items-center mt-auto h-20'>
                                        <FaLinkedin size='2em' className='social-icon' />
                                        <FaGithub size='2em' className='social-icon' />
                                    </div>
                                </div>
                                {/* Right/Main */}
                                <div className='right-area'>{children}</div>
                            </main>
                        </div>
                    </NextIntlClientProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
