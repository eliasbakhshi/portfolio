import "@/styles/main.scss";
import BackButton from "@/components/BackButton";
import { AllProjectsProps, BaseProjectProps } from "@/types/project";
import ProjectsTable from "@/components/ProjectsTable";
import { routing } from "@/i18n/routing";
import { getPageInfo, getTableColumns, getProjects, getOrientations } from "@/contentful/queries";
import { TypeOrientations, TypePageInfo, TypeTableColumns } from "@/types";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export const revalidate = 60;
export function generateStaticParams() {
    return routing.locales.map((locale) => {
        return locale === "en-US" ? {} : { locale };
    });
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const pageinfos = (await getPageInfo(locale)) as TypePageInfo[];
    const pageinfo = pageinfos.find((p) => p.pageName === "projects");
    const canonicalUrl = locale === "en-US" ? `${process.env.SITE_URL || "http://localhost:3000"}/projects` : `${process.env.SITE_URL || "http://localhost:3000"}/${locale}/projects`;

    return {
        title: `${pageinfo?.title || "Projects"} - "Elias Bakhshi"`,
        description: pageinfo?.description || "My projects",
        openGraph: {
            title: `${pageinfo?.title || "Projects"} - "Elias Bakhshi"`,
            description: pageinfo?.description || "My projects",
            url: process.env.SITE_URL || "http://localhost:3000",
            type: "website",
        },
        alternates: {
            canonical: canonicalUrl,
        },
    };
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params; // Await the params to extract locale
    const pageinfos = (await getPageInfo(locale)) as TypePageInfo[];
    const pageinfo = pageinfos.find((p) => p.pageName === "projects");
    const tableColumns = (await getTableColumns(locale)) as TypeTableColumns;
    const projectSection = (await getProjects(locale)) as AllProjectsProps;
    const projects = projectSection.projectsList || ([] as BaseProjectProps[]);
    const orientations = (await getOrientations(locale)) as TypeOrientations;

    projects.sort((a, b) => b.year - a.year);

    return (
        <div className='container w-full py-10 px-4 xl:px-0 mx-auto'>
            <div className="flex align-middle mb-4 gap-4">
                <BackButton className='ps-0' text={orientations.back || "Back"} />
                <ThemeToggle />
                <LanguageSwitcher locale={locale} />
            </div>
            <h2 className='py-5'>{pageinfo?.title || "All Projects"}</h2>
            <ProjectsTable projects={projects} tableColumns={tableColumns} />
        </div>
    );
}
