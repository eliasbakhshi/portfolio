import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.scss";
import Nav from "@/components/Nav";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

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
                <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex justify-center`}>
                    <main className='container grid grid-cols-1 md:grid-cols-12 min-h-screen'>
                        <div id='left' className='bg-green-200 col-span-12 md:col-span-6 md:sticky md:top-0 md:left-0 md:h-screen flex flex-col'>
                            <Nav />
                            <h2 className='p-4 font-bold'>Elias Bakhshi</h2>
                            <div id='social' className='flex gap-6 items-center px-8 mt-auto h-20 bg-gray-200'>
                                <FaLinkedin size='2em' />
                                <FaGithub size='2em' />
                            </div>
                        </div>
                        <div id='right' className='bg-blue-200 col-span-12 md:col-span-6'>
                            {children}
                        </div>
                    </main>
                </body>
            </NextIntlClientProvider>
        </html>
    );
}

//     <div className="container grid min-h-screen grid-cols-1 lg:grid-cols-12 p-4 [grid-template-rows:auto_auto_100px]
//   [grid-template-areas:'aside'_'main'_'footer']
//   lg:[grid-template-areas:'aside_main'_'aside_main'_'footer_main']">

//   <aside className="[grid-area:aside] flex flex-col h-full lg:col-span-6 bg-card p-6 rounded-lg border ">
//     <h1 className="text-3xl font-bold">Welcome to Our Platform</h1>
//     <h1 className="text-3xl font-bold">Welcome to Our Platform</h1>
//     <p className="mt-2 text-muted-foreground">Discover our features</p>
//   </aside>

//   <main className="[grid-area:main] bg-card p-6 rounded-lg border lg:col-span-6">
//     <section>
//       <h2 className="text-2xl font-semibold h-screen">Featured Content</h2>
//       <h2 className="text-2xl font-semibold h-screen">Featured Content</h2>
//       <h2 className="text-2xl font-semibold h-screen">Featured Content</h2>
//       {/* Dynamic content */}
//     </section>
//   </main>

//   <footer className="[grid-area:footer] bg-card p-4 rounded-lg border h-[100px] sticky top-4 lg:col-span-6">
//     <h2 className="text-xl font-semibold">Quick Links</h2>
//   </footer>
// </div>
