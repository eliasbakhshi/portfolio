import "@/styles/main.scss";
import BackButton from "@/components/BackButton";
import { ProjectProps } from "@/types/project";
import { getMessages } from "next-intl/server";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

export default async function ProjectsPage() {
    const messages = await getMessages();
    const projects = messages.projects.projectsList as ProjectProps[];
    const tableColumns = messages.projects.tableColumns as ProjectProps;
    const t = messages.projects;

    return (
        <div className='container w-full py-10 px-4 xl:px-0 mx-auto'>
            <BackButton className='ps-0' />
            <h2 className='pb-5'>{t?.title || "All Projects"}</h2>
            <table className='min-w-full pt-5'>
                <thead>
                    <tr className='text-left'>
                        <th className='p-2'>{tableColumns["year"]}</th>
                        <th className='p-2'>{tableColumns["title"]}</th>
                        <th className='p-2'>{tableColumns["madeAt"]}</th>
                        <th className='p-2'>{tableColumns["technologies"]}</th>
                        <th className='p-2'>{tableColumns["link"]?.toString()}</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project, index) => (
                        <tr key={index} className='hover:bg-gray-800/30 border-t border-gray-700/50'>
                            <td className='p-2'>{project.year}</td>
                            <td className='p-2'>{project.title}</td>
                            <td className='p-2'>{project.madeAt}</td>
                            <td className='p-2'>
                                <div className='flex flex-wrap gap-2'>
                                    {project.technologies.map((tech, techIndex) => (
                                        <span key={techIndex} className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-900/30 text-teal-300 border border-teal-700/30'>
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </td>
                            <td className='p-2 group/link'>
                                <div className='flex items-center gap-2'>
                                    <Link href={project.link || "#"}>{project.link ? new URL(project.link).hostname : ""}</Link>
                                    <FiArrowUpRight className="transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1" />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
