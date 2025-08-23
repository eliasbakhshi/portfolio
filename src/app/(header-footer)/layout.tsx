// import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/main.scss";
import Nav from "@/components/Nav";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import Link from "next/link";

export default async function RootLayout({
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
                    <NextIntlClientProvider messages={messages}>
                        <div className='min-h-screen bg-primary text-secondary font-primary transition-colors duration-200' style={{ overflow: "hidden" }}>
                            <main className='container mx-auto custom-grid lg:px-4 xl:px-0'>
                                <Nav id='menu' />
                                <div id='left'>
                                    <h1 className='text-h1 font-bold text-secondary py-1'>{messages.home.name}</h1>
                                    <h5 className='text-h5 text-secondary'>{messages.home.title}</h5>
                                    <p className='py-5 lg:w-[75%] text-paragraph text-secondary-faded leading-relaxed'>{messages.home.description}</p>
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
