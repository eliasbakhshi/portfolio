import "@/styles/main.scss";
import BackButton from "@/components/BackButton";
import { ProjectProps } from "@/types/project";
import ProjectsTable from "@/components/ProjectsTable";
import { routing } from "@/i18n/routing";
import { getMessages, getTranslations } from "next-intl/server";

export const revalidate = 60;
export function generateStaticParams() {
    return routing.locales.map((locale) => {
        return locale === "en-US" ? {} : { locale };
    });
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "" });
    const canonicalUrl = locale === "en-US" ? `${process.env.SITE_URL || "http://localhost:3000"}/projects` : `${process.env.SITE_URL || "http://localhost:3000"}/${locale}/projects`;

    return {
        title: `${t("nav.projects") || "Projects"} - ${t("home.name") || "Elias Bakhshi"}`,
        description: t("home.description") || "My projects",
        openGraph: {
            title: `${t("nav.projects") || "My Portfolio"} - ${t("home.title") || "Welcome"}`,
            description: t("home.description") || "My projects",
            url: process.env.SITE_URL || "http://localhost:3000",
            type: "website",
        },
        alternates: {
            canonical: canonicalUrl,
        },
    };
}

export default async function ProjectsPage() {
    const messages = await getMessages();
    const projects = messages.projects.projectsList as ProjectProps[];
    const tableColumns = messages.projects.tableColumns as ProjectProps;
    const t = messages.projects;

    projects.sort((a, b) => b.year - a.year);

    return (
        <div className='container w-full py-10 px-4 xl:px-0 mx-auto'>
            <BackButton className='ps-0' text={t?.back || "Back"} />
            <h2 className='py-5'>{t?.title || "All Projects"}</h2>
            <ProjectsTable projects={projects} tableColumns={tableColumns} />
        </div>
    );
}
