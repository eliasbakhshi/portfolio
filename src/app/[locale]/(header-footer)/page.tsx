import Experience from "@/components/Experience";
import Project from "@/components/Project";
import Contact from "@/components/Contact";
import { BaseExperiences, AllProjectsProps, TypeContact, TypeAbout, TypeFooter, TypePageInfo } from "@/types";
import Footer from "@/components/Footer";
import { routing } from "@/i18n/routing";
import { getAbout, getContact, getExperiences, getProjects, getFooter, getPageInfo } from "@/contentful/queries";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export const revalidate = 60;
export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const pageinfos = (await getPageInfo(locale)) as TypePageInfo[];
    const pageinfo = pageinfos.find((p) => p.pageName === "home");
    const canonicalUrl = locale === "en-US" ? `${process.env.SITE_URL || "http://localhost:3000"}/` : `${process.env.SITE_URL || "http://localhost:3000"}/${locale}`;

    return {
        title: `${pageinfo?.title || "My Portfolio"} - "Elias Bakhshi"`,
        description: pageinfo?.description || "Welcome to my portfolio website showcasing my projects and skills.",
        openGraph: {
        title: `${pageinfo?.title || "My Portfolio"} - "Elias Bakhshi"`,
            description: pageinfo?.description || "Welcome to my portfolio website showcasing my projects and skills.",
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
    const experienceSection = (await getExperiences(locale)) as BaseExperiences;
    const projectSection = (await getProjects(locale)) as AllProjectsProps;
    const contactSection = (await getContact(locale)) as TypeContact;
    const aboutSection = (await getAbout(locale)) as TypeAbout;
    const footerSection = (await getFooter(locale)) as TypeFooter;
    const experiences = experienceSection.experiencesList || [];
    const projects = projectSection.projectsList || [];

    projects.sort((a, b) => b.year - a.year);
    experiences.sort((a, b) => b.queue - a.queue);

    return (
        <>
            <div id='about' className='nav-section px-4 md:px-0'>
                <h5 className='mb-6'>{aboutSection.entryTitle}</h5>
                {aboutSection?.about && documentToReactComponents(aboutSection.about)}
            </div>
            <Experience title={experienceSection.title} experiences={experiences} resumeText={experienceSection.resumeText} resumeLink={experienceSection.resumeLink} noExperienceMessage={experienceSection.noExperiences} presentText={experienceSection.presentText} />
            <Project projects={projects} link={projectSection.projectsText} title={projectSection.title} noProjectsMessage={projectSection.noProjects} />
            <Contact text={contactSection} />
            <Footer text={documentToReactComponents(footerSection.footerText)} />
        </>
    );
}
