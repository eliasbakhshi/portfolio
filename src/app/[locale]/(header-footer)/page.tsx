import Experience from "@/components/Experience";
import Project from "@/components/Project";
import Contact from "@/components/Contact";
import { ExperienceProps, ExperiencesProps, ProjectProps } from "@/types";
import { getMessages, getTranslations } from "next-intl/server";
import Footer from "@/components/Footer";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "home" });
    return {
        title: (t("name") ? t("name") : "") + " - " + (t("title") ? t("title") : ""),
        description: t("description") || "",
    };
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
    experiences.sort((a, b) => b.id - a.id);

    return (
        <>
            <div id='about' className='nav-section px-4 md:px-0'>
                <h5 className='mb-6'>{messages.nav.about}</h5>
                <p className='text-secondary-faded' dangerouslySetInnerHTML={{ __html: messages.home?.about || "" }} />
            </div>
            <Experience title={experiencesTitle} experiences={experiences || []} linkText={experiencesText} link={experiencesLink} noExperienceMessage={messages.experiences?.noExperiences} />
            <Project projects={projects || []} link={projectsLink} title={projectsTitle} noProjectsMessage={messages.projects?.noProjects} />
            <Contact />
            <Footer />
        </>
    );
}
