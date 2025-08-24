import { ProjectProps } from "@/types";
import { FiArrowUpRight } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

export default function Project({ projects, link, title, noProjectsMessage }: { projects: ProjectProps[]; link: string; title: string; noProjectsMessage: string }) {
    if (!projects || projects.length === 0) {
        return (
            <section id='projects' className='nav-section px-4 md:px-0'>
                <h5 className='mb-5'>{title}</h5>
                <p className='text-secondary-faded'>{noProjectsMessage}</p>
            </section>
        );
    }
    return (
        <section id='projects' className='nav-section px-4 md:px-0'>
            <h5 className='mb-6'>{title}</h5>
            <ul className='flex flex-col gap-4 list-none p-0 m-0'>
                {projects.map((project, index) => (
                    project.sample && project.sample == true ?
                    <Link href={project.link || "#"} target='_blank' rel='noopener noreferrer' key={index}>
                        <li className='flex flex-col md:flex-row gap-2 rounded-lg w-full text-secondary-faded transition group '>
                            <div
                                className='relative
                                            w-full
                                            h-[calc(var(--icons-height)*5)]
                                            md:w-[calc(var(--icons-width)*4)]
                                            md:h-[calc(var(--icons-height)*3)]
                                            lg:w-[calc(var(--icons-width)*2)]
                                            lg:h-[calc(var(--icons-height)*1.5)]
                                            flex-shrink-0
                                            mr-2
                                            rounded-lg
                                        '
                                style={{ minWidth: "180px", minHeight: "100px" }}
                            >
                                <Image src={project.iconPath ?? "/images/default.jpg"} alt={`${project.title} icon`} fill className='rounded-lg transition object-contain' />
                            </div>
                            <article className='flex flex-col cursor-pointer text-secondary w-full'>
                                <div className='flex items-center group-hover:text-tertiary transition title'>
                                    <h6>{project.title}</h6>
                                    <FiArrowUpRight className='ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1' />
                                </div>
                                <p className='text-secondary-faded group-hover:text-secondary transition'>{project.description}</p>
                                <div className='mb-2 flex flex-wrap gap-2'>
                                    {project.technologies.map((tech, i) => (
                                        <small key={i} className='bg-tertiary-faded text-tertiary rounded rounded-sm px-2 py-1 text-xs'>
                                            {tech}
                                        </small>
                                    ))}
                                </div>
                            </article>
                        </li>
                    </Link> : null
                ))}
            </ul>
            {/* Read more link */}
            <div className='mt-4 flex items-center text-secondary cursor-pointer hover:text-tertiary transition group'>
                <Link href='/projects'>
                    <h6>{link}</h6>
                </Link>
                <FiArrowUpRight className='ml-2 w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1' />
            </div>
        </section>
    );
}
