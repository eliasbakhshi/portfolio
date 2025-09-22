import Experience from "@/components/Experience";
import Project from "@/components/Project";
import Contact from "@/components/Contact";
import { Experiences, ProjectProps } from "@/types";
import { getMessages, getTranslations } from "next-intl/server";
import Footer from "@/components/Footer";
import { routing } from "@/i18n/routing";
import { getExperiences } from "@/contentful/queries";

export const revalidate = 60;
export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "home" });
    const canonicalUrl = locale === "en-US" ? `${process.env.SITE_URL || "http://localhost:3000"}/` : `${process.env.SITE_URL || "http://localhost:3000"}/${locale}`;

    return {
        title: `${t("name") || "My Portfolio"} - ${t("title") || "Welcome"}`,
        description: t("description") || "Welcome to my portfolio website showcasing my projects and skills.",
        openGraph: {
            title: `${t("name") || "My Portfolio"} - ${t("title") || "Welcome"}`,
            description: t("description") || "Welcome to my portfolio website showcasing my projects and skills.",
            url: process.env.SITE_URL || "http://localhost:3000",
            type: "website",
        },
        alternates: {
            canonical: canonicalUrl,
        },
    };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const messages = await getMessages();
    const experienceSection = await getExperiences(locale) as Experiences;
    const experiences = experienceSection.experiencesList || [];
    const experiencesTitle = experienceSection.title;
    const resumeLink = experienceSection.resumeLink;
    const resumeText = experienceSection.resumeText;
    const presentText = experienceSection.presentText;
    const projects = messages.projects?.projectsList as ProjectProps[] || [];
    const projectsTitle = messages.nav?.projects;
    // const projectsText = experienceSection.projectsText || "View Projects";
    const projectsText =  "View Projects";

    projects.sort((a, b) => b.year - a.year);
    experiences.sort((a, b) => b.queue - a.queue);

    const t = await getTranslations();

    return (
        <>
            <div id='about' className='nav-section px-4 md:px-0'>
                <h5 className='mb-6'>{t("nav.about")}</h5>
                <p className='text-secondary-faded'>
                    {t.rich("home.about", {
                        strong: (chunk) => <strong>{chunk}</strong>,
                    })}
                </p>
            </div>
            <Experience title={experiencesTitle} experiences={experiences} resumeText={resumeText} resumeLink={resumeLink} noExperienceMessage={messages.experiences?.noExperiences} presentText={presentText} />
            <Project projects={projects} link={projectsText} title={projectsTitle} noProjectsMessage={messages.projects?.noProjects} />
            <Contact />
            <Footer />
        </>
    );
}
