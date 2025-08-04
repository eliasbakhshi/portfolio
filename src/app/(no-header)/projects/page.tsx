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
                        <th className='p-2 hidden lg:table-cell'>{tableColumns["madeAt"]}</th>
                        <th className='p-2 hidden lg:table-cell'>{tableColumns["technologies"]}</th>
                        <th className='p-2'>{tableColumns["link"]?.toString()}</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project, index) => (
                        <tr key={index} className='hover:bg-gray-800/40 border-t border-gray-700/50'>
                            <td className='p-2'>{project.year}</td>
                            <td className='p-2 hidden md:table-cell'>{project.title}</td>
                            <td className='p-2 hidden lg:table-cell'>{project.madeAt}</td>
                            <td className='p-2 hidden lg:table-cell'>
                                <div className='flex flex-wrap gap-2'>
                                    {project.technologies.map((tech, techIndex) => (
                                        <span
                                            key={techIndex}
                                            className='bg-tertiary-faded text-tertiary rounded-sm px-[0.4rem] py-[0.1rem] text-xs'
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </td>
                            <td className='p-2 group/link'>
                                <div >
                                    <Link href={project.link || "#"} className='flex items-center gap-2'>
                                    {project.link ? new URL(project.link).hostname : ""}
                                    <FiArrowUpRight className="transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1" />
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
