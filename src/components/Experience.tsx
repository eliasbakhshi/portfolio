// import styles from "@/styles/_components.module.scss";
import styles from "@/styles/components/experience.module.scss";
import { ExperienceProps, ExperiencesProps } from "@/types";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

export default function Experience({ experiences, link, title }: { experiences: (ExperienceProps | ExperiencesProps)[]; link: string; title: string }) {
    if (!experiences || experiences.length === 0) {
        return <section className={styles.wrapper}>No experience experiences available.</section>;
    }
    // This is used to differentiate between single and multiple position experiences
    const isMultiExperience = (experience: ExperienceProps | ExperiencesProps): experience is ExperiencesProps => {
        return Array.isArray(experience.duration) && "totalDuration" in experience;
    };
    return (
        <section className={styles.experience}>
            <h5 className="mb-5">{title}</h5>
            <ul>
                {experiences.map((experience, index) =>
                    isMultiExperience(experience) ? (
                        // Add experience with several positions
                        <li key={index} style={{ "--bullet-image": `url(${experience.iconPath})` } as React.CSSProperties}>
                            <Link href={experience.companyURL}>
                                <h6>
                                    {experience.company} <FiArrowUpRight className={styles.icon} />
                                </h6>
                                <p className={styles.duration}>{experience.totalDuration}</p>
                                <ul className={styles.subSessions}>
                                    {Array.isArray(experience.title) &&
                                        experience.title.map((title, i) => (
                                            <li key={i}>
                                                <h6>{title}</h6>
                                                <p className={styles.duration}>{experience.duration[i]}</p>
                                                <p className={styles.description}>{experience.description[i]}</p>
                                                <div className={styles.skills}>{experience.skills[i] && experience.skills[i].map((skill, j) => <span key={`${i}-${j}`}>{skill}</span>)}</div>
                                            </li>
                                        ))}
                                </ul>
                            </Link>
                        </li>
                    ) : (
                        // Add experience with one position
                        <li key={index} style={{ "--bullet-image": `url(${experience.iconPath})` } as React.CSSProperties}>
                            <Link href={experience.companyURL}>
                                <h6>
                                    {experience.title} | {experience.company} <FiArrowUpRight className={styles.icon} />
                                </h6>
                                <p className={styles.duration}>{experience.duration}</p>
                                <p className={styles.description}>{experience.description}</p>
                                <div className={styles.skills}>{experience.skills && Array.isArray(experience.skills) && experience.skills.map((skill, i) => <span key={i}>{skill}</span>)}</div>
                            </Link>
                        </li>
                    )
                )}
            </ul>
            {/* Add the resume link */}
            <div className={styles.readmore}>
                <Link href='/resume'>
                    <h6>{link}</h6>
                </Link>
                <FiArrowUpRight className={styles.icon} />
            </div>
        </section>
    );
}
