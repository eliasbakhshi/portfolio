import Link from "next/link";
import Experience from "@/components/Experience";
import { ExperienceProps, ExperiencesProps } from '@/types';
import { getMessages } from "next-intl/server";
import { AbstractIntlMessages } from "next-intl";

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: string };
}) {
    const messages: AbstractIntlMessages = await getMessages({ locale });
    const title = messages.tabsInfo?.home;
    const description = messages.tabsInfo?.homeDescription;
    return {
        title,
        description,
    };
}

export default function Home() {
    const experiences: (ExperienceProps | ExperiencesProps)[] = [
        {
            company: "Inter-Data",
            iconPath: "/images/inter-data.jpeg",
            location: "Sweden",
            title: "Fullstack Developer",
            duration: "Aug 2019 - Apr 2022",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            skills: [],
        },
        {
            company: "KIP",
            iconPath: "/images/kip.jpg",
            location: "Sweden",
            title: "Fullstack Developer",
            duration: "Aug 2019 - Apr 2022",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            skills: [],
        },
        {
            company: "Valentin Experience",
            iconPath: "/images/vx.jpeg",
            location: "Sweden",
            title: "Fullstack Developer",
            duration: "Aug 2019 - Apr 2022",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            skills: [],
        },
        {
            company: "Tromb",
            iconPath: "/images/tromb.png",
            location: "Sweden",
            title: "Fullstack Developer",
            duration: "Aug 2019 - Apr 2022",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            skills: [],
        },
        {
            company: "WebsiteService",
            iconPath: "/images/websiteservice.png",
            location: "Sweden",
            title: "Fullstack Developer",
            duration: "Aug 2019 - Apr 2022",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            skills: [],
        },
        {
            company: "Blekinge Tekniska Högskola",
            iconPath: "/images/bth.jpg",
            location: "Sweden",
            title: ["Fullstack Developer", "Frontend Developer"],
            totalDuration: "Deltid | 10 mån",
            duration: ["Jan 2020 - Jul 2021", "Jun 2021 - Dec 2021"],
            description: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "Lorem ipsum dolor sit amet, consectetur adipiscing elit."],
            skills: [],
        }
    ];
    return (
        <>
            <div id='about' className='my-5'>
                <p>
                    A passionate software engineer currently studying Software Engineering at Blekinge Institute of Technology (BTH). My journey as a developer started when I was 12 years old, and I thrive in collaborative environments where I can contribute with my <strong>creativity</strong> and <strong>problem-solving</strong> skills. My goal is to use my knowledge to create innovative solutions that have a positive impact.
                </p>
            </div>
            <div id='experience' className='mt-5'>

                <Experience experiences={experiences} />
            </div>
            <div id='projects' className='mt-5'>
                <Link href='/projects'>Projects</Link>
            </div>
            <div id='contact' className='mt-5'>
                <Link href='/contact'>Contact</Link>
            </div>
        </>
    );
}
