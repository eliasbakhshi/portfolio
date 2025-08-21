import Link from "next/link";
import Experience from "@/components/Experience";
import Project from "@/components/Project";
import Contact from "@/components/Contact";
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
            <div id='about' className='nav-section px-4 md:px-0'>
                <h5 className='mb-6'>{messages.nav.about}</h5>
                <p className="text-secondary-faded" dangerouslySetInnerHTML={{ __html: messages.home?.about || "" }} />
            </div>
            <Experience experiences={experiences || []} link={experiencesLink} title={experiencesTitle} noExperienceMessage={messages.experiences?.noExperiences} />
            <Project projects={projects || []} link={projectsLink} title={projectsTitle} noProjectsMessage={messages.projects?.noProjects} />
            <Contact />
        </>
    );
}
