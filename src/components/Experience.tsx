// import styles from "@/styles/_components.module.scss";
import styles from "@/styles/components/experience.module.scss";
import { ExperienceProps, ExperiencesProps } from "@/types";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

export default function Experience({ title, experiences, link, linkText, noExperienceMessage }: { title: string; experiences: (ExperienceProps | ExperiencesProps)[]; link: string;  noExperienceMessage: string; linkText: string }) {
    if (!experiences || experiences.length === 0) {
        return (
            <section id='experience' className='nav-section px-4 md:px-0'>
                <h5 className='mb-6'>{title}</h5>
                <p className='text-secondary-faded'>{noExperienceMessage}</p>
            </section>
        );
    }

    // This is used to differentiate between single and multiple position experiences
    const isMultiExperience = (experience: ExperienceProps | ExperiencesProps): experience is ExperiencesProps => {
        return "roles" in experience && Array.isArray(experience.roles);
    };
    return (
        <section id='experience' className={`nav-section  px-4 md:px-0 ${styles.experience}`}>
            <h5 className='mb-6'>{title}</h5>
            <ul>
                {experiences.map((experience, index) => (
                    <li key={index} style={{ "--bullet-image": `url(${experience.iconPath})` } as React.CSSProperties}>
                        <Link href={experience.companyURL} target='_blank' rel='noopener noreferrer'>
                            {isMultiExperience(experience) ? (
                                <>
                                    <h6>
                                        {experience.company} <FiArrowUpRight className={styles.icon} />
                                    </h6>
                                    <p className={styles.duration}>{experience.duration}</p>
                                    <ul className={styles.subSessions}>
                                        {experience.roles.map((role, i) => (
                                            <li key={i}>
                                                <h6>{role.title}</h6>
                                                <p className={styles.duration}>{role.duration}</p>
                                                <p className={styles.description}>{role.description}</p>
                                                <div className={styles.skills}>{role.skills && role.skills.map((skill, j) => <span key={`${i}-${j}`}>{skill}</span>)}</div>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            ) : (
                                <>
                                    <h6>
                                        {experience.title} | {experience.company} <FiArrowUpRight className={styles.icon} />
                                    </h6>
                                    <p className={styles.duration}>{experience.duration}</p>
                                    <p className={styles.description}>{experience.description}</p>
                                    <div className={styles.skills}>{experience.skills && Array.isArray(experience.skills) && experience.skills.map((skill, i) => <span key={i}>{skill}</span>)}</div>
                                </>
                            )}
                        </Link>
                    </li>
                ))}
            </ul>
            {/* Add the resume link */}
            <div className={styles.readmore}>
                <Link href={link} target="_blank" rel="noopener noreferrer">
                    <h6>{linkText}</h6>
                </Link>
                <FiArrowUpRight className={styles.icon} />
            </div>
        </section>
    );
}
