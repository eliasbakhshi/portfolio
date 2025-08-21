import "@/styles/main.scss";
import BackButton from "@/components/BackButton";
import { ProjectProps } from "@/types/project";
import { getMessages } from "next-intl/server";
import ProjectsTable from "@/components/ProjectsTable";


export default async function ProjectsPage() {
    const messages = await getMessages();
    const projects = messages.projects.projectsList as ProjectProps[];
    const tableColumns = messages.projects.tableColumns as ProjectProps;
    const t = messages.projects;

    return (
        <div className='container w-full py-10 px-4 xl:px-0 mx-auto'>
            <BackButton className='ps-0' text={t?.back || "Back"} />
            <h2 className='py-5'>{t?.title || "All Projects"}</h2>
            <ProjectsTable projects={projects} tableColumns={tableColumns} />
        </div>
    );
}
