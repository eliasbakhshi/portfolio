import Link from "next/link";
import Experience from "@/components/Experience";
import Project from "@/components/Project";
import { ExperienceProps, ExperiencesProps, ProjectProps } from "@/types";
import { getMessages } from "next-intl/server";
import { AbstractIntlMessages } from "next-intl";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const messages: AbstractIntlMessages = await getMessages({ locale });
    const title = messages.home?.title || "Home";
    const description = messages.home?.description;

    return {
        title,
        description,
    };
}

export default async function Home() {
    const messages = await getMessages();
    const experiences = messages.home?.experiencesList as (ExperienceProps | ExperiencesProps)[];
    const projects = messages.projects?.projectsList as ProjectProps[];
    const experiencesTitle = messages.nav?.experience || "Experience";
    const projectsTitle = messages.nav?.projects || "Projects";
    const experiencesLink = messages.home?.experiencesLink || "View Experiences";
    const projectsLink = messages.home?.projectsLink || "View Projects";

    return (
        <>
            <div id='about' className='nav-section'>
                <p>
                    A passionate software engineer currently studying Software Engineering at Blekinge Institute of Technology (BTH). My journey as a developer started when I was 12 years old, and I thrive in collaborative environments where I can contribute with my <strong>creativity</strong> and <strong>problem-solving</strong> skills. My goal is to use my knowledge to create innovative solutions that have a positive impact.
                </p>
            </div>
            <div id='experience' className='nav-section'>
                <Experience experiences={experiences || []} link={experiencesLink} title={experiencesTitle} />
            </div>
            <div id='projects' className='nav-section'>
                <Project projects={projects || []} link={projectsLink} title={projectsTitle} />
            </div>
            <div id='contact' className='nav-section'>
                <Link href='/contact'>Contact</Link>
            </div>
        </>
    );
}
