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
                        <div className='flex w-full justify-center bg-primary text-secondary font-primary min-h-screen transition-colors duration-300'>
                            <main className='container grid grid-cols-1 lg:grid-cols-12 min-h-screen px-4 xl:px-0'>
                                <div id="left" className='col-span-12 pe-0 lg:pe-5 lg:col-span-6 lg:sticky lg:top-0 lg:left-0 lg:h-screen flex flex-col'>
                                    <Nav />
                                    <h1 className='text-h1 font-bold text-secondary py-1'>Elias Bakhshi</h1>
                                    <h5 className='text-h5 text-secondary font-semibold'>Full Stack Engineer</h5>
                                    <p className='w-[70%] py-5 text-paragraph text-secondary-faded leading-relaxed'>Creative, target oriented and passionate developer with a knack for building dynamic web applications.</p>
                                    <div className='flex gap-6 items-center mt-auto h-20'>
                                        <FaLinkedin size='2em' className='social-icon' />
                                        <FaGithub size='2em' className='social-icon' />
                                    </div>
                                </div>
                                <div id="right" className='col-span-12 lg:col-span-6'>{children}</div>
                            </main>
                        </div>
                    </NextIntlClientProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
