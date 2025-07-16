// import styles from "@/styles/_components.module.scss";
import styles from "@/styles/components/_job.module.scss";
import { JobProps } from "@/types";

export default function Job({ company, iconPath, location, title, period, description, skills }: JobProps) {
    return (
        <div className={styles.wrapper}>
            <h1>Erfarenheter</h1>
            <ul className={styles.sessions}>
                <li style={{ "--bullet-image": `url(${iconPath})` } as React.CSSProperties}>
                    <h6>
                        {title} | {company}
                    </h6>
                    <p className={styles.subtitle}>{period}</p>
                    <p className={styles.description}>{description}</p>
                </li>
                <li style={{ "--bullet-image": "url('/images/inter-data.jpeg')" } as React.CSSProperties}>
                    <h6>Fullstackdeveloper | BeeByte</h6>
                    <p className={styles.subtitle}>Aug 2019 - Apr 2022</p>
                    <p className={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </li>
                <li style={{ "--bullet-image": "url('/images/kip.jpg')" } as React.CSSProperties}>
                    <h6>Fullstackdeveloper | BeeByte</h6>
                    <p className={styles.subtitle}>Aug 2019 - Apr 2022</p>
                    <p className={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </li>
                <li style={{ "--bullet-image": "url('/images/vx.jpeg')" } as React.CSSProperties}>
                    <h6>Fullstackdeveloper | BeeByte</h6>
                    <p className={styles.subtitle}>Aug 2019 - Apr 2022</p>
                    <p className={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </li>
                <li style={{ "--bullet-image": "url('/images/tromb.png')" } as React.CSSProperties}>
                    <h6>Fullstackdeveloper | BeeByte</h6>
                    <p className={styles.subtitle}>Aug 2019 - Apr 2022</p>
                    <p className={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </li>
                <li style={{ "--bullet-image": "url('/images/websiteservice.png')" } as React.CSSProperties}>
                    <h6>Fullstackdeveloper | BeeByte</h6>
                    <p className={styles.subtitle}>Aug 2019 - Apr 2022</p>
                    <p className={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </li>
                <li style={{ "--bullet-image": "url('/images/bth.jpg')" } as React.CSSProperties}>
                    <h6>blekinge tekniska högskola</h6>
                    <p className={styles.subtitle}>Deltid | 10 mån</p>
                    <ul className={styles.subSessions}>
                        <li style={{ "--bullet-image": "url('/images/Inter-Data.jpeg')" } as React.CSSProperties}>
                            <h6>Fullstackdeveloper | BeeByte</h6>
                            <p className={styles.subtitle}>Aug 2019 - Apr 2022</p>
                            <p className={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </li>
                        <li style={{ "--bullet-image": "url('/images/Inter-Data.jpeg')" } as React.CSSProperties}>
                            <h6>Fullstackdeveloper | BeeByte</h6>
                            <p className={styles.subtitle}>Aug 2019 - Apr 2022</p>
                            <p className={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>

        // <div className='job'>
        //     <h2 className='text-xl font-semibold time'>{title}</h2>
        //     <p className='text-gray-600'>{company}</p>
        //     <p className='text-gray-500'>{location}</p>
        //     <p className='mt-2 text-gray-700'>{description}</p>
        // </div>
    );
}
