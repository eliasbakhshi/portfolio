// import styles from "@/styles/_components.module.scss";
import { ProjectProps } from "@/types";
import { FiArrowUpRight } from "react-icons/fi";
import Image from "next/image";
import styles from "@/styles/components/project.module.scss";
import Link from "next/link";

export default function Project({ projects, link, title }: { projects: ProjectProps[]; link: string; title: string }) {
    // if (!projects || projects.length === 0) {
    //     return <section className={styles.wrapper}>No projects available.</section>;
    // }

    return (
        <section className={styles.projects}>
            <h5 className='mb-5'>{title}</h5>
            <ul>
                {projects.map((project, index) => (
                    <li key={index} className={`flex ${styles.project}`}>
                        <Image src={project.iconPath ?? "/images/default.png"} alt={`${project.title} icon`} width={20} height={20} />
                        <article>
                            <div className={styles.title}>
                                <h6>{project.title}</h6>
                                <FiArrowUpRight className={styles.icon} />
                            </div>
                            <p>{project.description}</p>
                            <div className={styles.technologies}>
                                {project.technologies.map((tech, i) => (
                                    <small key={i} className={styles.technology}>
                                        {tech}
                                    </small>
                                ))}
                            </div>
                        </article>
                    </li>
                ))}
            </ul>
            {/* Add the readmore link */}
            <div className={styles.readmore}>
                <Link href='/projects'>
                    <h6>{link}</h6>
                </Link>
                <FiArrowUpRight className={styles.icon} />
            </div>
        </section>
    );
}
