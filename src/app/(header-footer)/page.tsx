import Link from "next/link";
import Job from "@/components/Job";
import { JobProps, JobsProps } from '@/types';
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
    const defaultJob: JobProps | JobsProps = [
        {
            company: "BeeByte",
            iconPath: "/images/beebyte.jpeg",
            location: "Karlskrona, Sweden",
            title: "Fullstack Developer",
            period: "Aug 2019 - Apr 2022",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            skills: ["JavaScript", "React", "Node.js"],
        },
        {
            company: "TechCorp",
            iconPath: "/images/techcorp.jpeg",
            location: "Stockholm, Sweden",
            title: "Software Engineer Intern",
            period: "May 2022 - Present",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            skills: ["JavaScript", "React", "Node.js"],
        },
        {
            company: "WebSolutions",
            iconPath: "/images/websolutions.jpeg",
            location: "Gothenburg, Sweden",
            title: ["Web Developer", "Frontend Developer"],
            period: ["Jan 2020 - Jul 2021", "Jun 2021 - Dec 2021"],
            description: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit."],
            skills: [["HTML", "CSS", "JavaScript"], ["React", "Vue.js", "Angular"]],
        },
    ];
    return (
        <>
            <div id='about' className='my-5'>
                <p>
                    A passionate software engineer currently studying Software Engineering at Blekinge Institute of Technology (BTH). My journey as a developer started when I was 12 years old, and I thrive in collaborative environments where I can contribute with my <strong>creativity</strong> and <strong>problem-solving</strong> skills. My goal is to use my knowledge to create innovative solutions that have a positive impact.
                </p>
            </div>
            <div id='experience' className='mt-5'>
                <Job title='Full Stack Developer' company='Inter-Data' location='Hagfors' description='I developed multiple portals in a team, connecting them to an automation system (n8n.io) and focusing on UX/UI design.' />
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
