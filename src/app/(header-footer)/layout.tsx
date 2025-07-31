// import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/main.scss";
import Nav from "@/components/Nav";
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
        // <html lang='en' style={{ scrollBehavior: "smooth" }}>
        <html lang={locale}>
            <NextIntlClientProvider messages={messages}>
                <body className={`antialiased flex justify-center`}>
                    <main className='container grid grid-cols-1 lg:grid-cols-12 min-h-screen px-4 xl:px-0 main'>
                        <div id='left' className='col-span-12 pe-0 lg:pe-5 lg:col-span-6 lg:sticky lg:top-0 lg:left-0 lg:h-screen flex flex-col'>
                            <Nav />
                            {/* <h1 className='py-1'>Elias Bakhshi</h1> */}
                            <h5>Full Stack Engineer</h5>
                            <p className='w-[70%] py-5'>Creative, target orgented and passionate developer with a knack for building dynamic web applications.</p>
                            <div id='social' className='flex gap-6 items-center mt-auto h-20'>
                                <FaLinkedin size='2em' color='white' />
                                <FaGithub size='2em' color='white' />
                            </div>
                        </div>
                        <div id='right' className='col-span-12 lg:col-span-6'>
                            {children}
                        </div>
                    </main>
                </body>
            </NextIntlClientProvider>
        </html>
    );
}
