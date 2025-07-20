// import styles from "@/styles/_components.module.scss";
import styles from "@/styles/components/experience.module.scss";
import { ExperienceProps, ExperiencesProps } from "@/types";

export default function Experience({ experiences }: { experiences: (ExperienceProps | ExperiencesProps)[] }) {
    if (!experiences || experiences.length === 0) {
        return <div className={styles.wrapper}>No experience experiences available.</div>;
    }
    return (
        <div className={styles.wrapper}>
            <h1>Erfarenheter</h1>
            <ul className={styles.sessions}>
                {experiences.map((experience, index) =>
                    Array.isArray(experience.duration) || "totalDuration" in experience ? (
                        <li key={index} style={{ "--bullet-image": `url(${experience.iconPath})` } as React.CSSProperties}>
                            <h6>{experience.company} </h6>
                            <p className={styles.duration}>{experience.totalDuration}</p>
                            <ul className={styles.subSessions}>
                                {Array.isArray(experience.title) &&
                                    experience.title.map((title, i) => (
                                        <li key={i}>
                                            <h6>{title}</h6>
                                            <p className={styles.duration}>{experience.duration[i]}</p>
                                            <p className={styles.description}>{experience.description[i]}</p>
                                            <div className={styles.skills}>{experience.skills && experience.skills[i] && (Array.isArray(experience.skills[i]) ? experience.skills[i].map((skill, j) => <span key={`${i}-${j}`}>{skill}</span>) : <span>{experience.skills[i]}</span>)}</div>
                                        </li>
                                    ))}
                            </ul>
                        </li>
                    ) : (
                        <li key={index} style={{ "--bullet-image": `url(${experience.iconPath})` } as React.CSSProperties}>
                            <h6>
                                {experience.title} | {experience.company}
                            </h6>
                            <p className={styles.duration}>{experience.duration}</p>
                            <p className={styles.description}>{experience.description}</p>
                            <div className={styles.skills}>{experience.skills && Array.isArray(experience.skills) && experience.skills.map((skill, i) => <span key={i}>{skill}</span>)}</div>
                        </li>
                    )
                )}
            </ul>
        </div>
    );
}
