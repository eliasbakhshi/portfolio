import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";


export const metadata: Metadata = {
    title: "Elias Bakhshi - Projects",
    description: "Projects by Elias Bakhshi",
};

export default function ProjectsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>

        <body className='antialiased'>
            {children}
        </body>
        </html>
    );
}
