import Experience from "@/components/Experience";
import Project from "@/components/Project";
import Contact from "@/components/Contact";
import { ExperienceProps, ExperiencesProps, ProjectProps } from "@/types";
import { getMessages } from "next-intl/server";
import { AbstractIntlMessages } from "next-intl";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const messages: AbstractIntlMessages = await getMessages({ locale });

    return {
        title: messages.home?.name + " - " + messages.home?.title,
        description: messages.home?.description
    };i
}

export default async function Home() {
    const messages = await getMessages();
    const experiences = messages.home?.experiencesList as (ExperienceProps | ExperiencesProps)[];
    const projects = messages.projects?.projectsList as ProjectProps[];
    const experiencesTitle = messages.nav?.experience || "Experience";
    const projectsTitle = messages.nav?.projects || "Projects";
    const experiencesLink = messages.home?.experiencesLink || "/documents/Elias-Bakhshi.pdf";
    const experiencesText = messages.home?.experiencesText || "Full Resume";
    const projectsLink = messages.home?.projectsLink || "View Projects";

    projects.sort((a, b) => b.year - a.year);

    return (
        <>
            <div id='about' className='nav-section px-4 md:px-0'>
                <h5 className='mb-6'>{messages.nav.about}</h5>
                <p className="text-secondary-faded" dangerouslySetInnerHTML={{ __html: messages.home?.about || "" }} />
            </div>
            <Experience title={experiencesTitle} experiences={experiences || []} linkText={experiencesText} link={experiencesLink} noExperienceMessage={messages.experiences?.noExperiences} />
            <Project projects={projects || []} link={projectsLink} title={projectsTitle} noProjectsMessage={messages.projects?.noProjects} />
            <Contact />
        </>
    );
}
