"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { FiArrowUpRight } from "react-icons/fi";
import { BaseProjectProps, TypeTableColumns } from "@/types";

export default function ProjectsTable({ projects, tableColumns }: { projects: BaseProjectProps[]; tableColumns: TypeTableColumns }) {
    const tableRef = useRef<HTMLTableElement>(null);
    const [popupIndex, setPopupIndex] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [mouseX, setMouseX] = useState(0);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const handleRowEnter = (index: number, e: React.MouseEvent) => {
        if (!isMobile) {
            setPopupIndex(index);
            setMouseX(e.clientX);
        }
    };
    const handleRowLeave = () => {
        if (!isMobile) setPopupIndex(null);
    };
    const handleRowClick = (index: number, e: React.MouseEvent) => {
        if (isMobile) {
            setPopupIndex(popupIndex === index ? null : index);
            setMouseX(e.clientX);
        }
    };
    const handleRowMove = (e: React.MouseEvent) => {
        if (!isMobile && popupIndex !== null) {
            setMouseX(e.clientX);
        }
    };

    return (
        <table ref={tableRef} className='min-w-full pt-5'>
            <thead>
                <tr className='text-left'>
                    <th className='p-2'>{tableColumns["year"]}</th>
                    <th className='p-2 hidden lg:table-cell'>{tableColumns["title"]}</th>
                    <th className='p-2 hidden lg:table-cell'>{tableColumns["madeAt"]}</th>
                    <th className='p-2 hidden lg:table-cell'>{tableColumns["technologies"]}</th>
                    <th className='p-2'>{tableColumns["link"]?.toString()}</th>
                </tr>
            </thead>
            <tbody>
                {projects.map(
                    (project, index) =>
                        project.isShowing && (
                            <tr key={index} className='dark:hover:bg-secondary-faded/30 border-t dark:border-secondary-faded/50 relative hover:bg-secondary-faded/8 border-secondary-faded/15' onMouseEnter={(e) => handleRowEnter(index, e)} onMouseLeave={handleRowLeave} onMouseMove={handleRowMove} onClick={(e) => handleRowClick(index, e)}>
                                <td className='p-2 dark:text-white text-gray-900'>{project.year}</td>
                                <td className='p-2 hidden md:table-cell dark:text-white text-gray-900'>{project.title}</td>
                                <td className='p-2 hidden lg:table-cell dark:text-white text-gray-900'>{project.madeAt}</td>
                                <td className='p-2 hidden lg:table-cell'>
                                    <div className='flex flex-wrap gap-2'>
                                        {project.technologies.map((tech, techIndex) => (
                                            <span
                                                key={techIndex}
                                                className='bg-tertiary-faded text-tertiary rounded-sm px-[0.4rem] py-[0.1rem] text-xs
                                            dark:bg-tertiary-faded dark:text-tertiary
                                            bg-blue-100 text-blue-700'
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className='p-2 group/link dark:text-white text-gray-900'>
                                    <div>
                                        <Link href={project.link || "#"} className='flex items-center gap-2' rel='noreferrer' target='_blank'>
                                            {project.link ? new URL(project.link).hostname.replace(/^www\./, "") : ""}
                                            <FiArrowUpRight className='transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1' />
                                        </Link>
                                    </div>
                                </td>
                                {popupIndex === index &&
                                    project.iconPath &&
                                    (() => {
                                        const popupWidth = 140;
                                        const offset = 100;

                                        let tableLeft = 0;
                                        if (tableRef.current) {
                                            const rect = tableRef.current.getBoundingClientRect();
                                            tableLeft = rect.left;
                                        }

                                        // Calculate left position relative to table
                                        let left = mouseX - tableLeft + offset;

                                        // Clamp left so popup stays inside window
                                        const maxLeft = window.innerWidth - popupWidth;
                                        if (left + tableLeft > maxLeft) left = maxLeft - tableLeft;
                                        if (left < 0) left = 0;

                                        return (
                                            <td
                                                className='absolute top-1/2 -translate-y-1/2 z-50 shadow-lg
                                                    transition-opacity transition-transform duration-300 ease-out
                                                    popup-animate'
                                                style={{
                                                    minWidth: "200px",
                                                    left: `${left}px`,
                                                }}
                                            >
                                                <Image src={project.iconPath} alt={project.title} width={200} height={80} className='rounded' />
                                            </td>
                                        );
                                    })()}
                            </tr>
                        )
                )}
            </tbody>
        </table>
    );
}
