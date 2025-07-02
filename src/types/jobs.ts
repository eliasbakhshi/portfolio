export type JobProps = {
    company: string;
    iconPath: string;
    location: string;
    title: string;
    period: string;
    description: string;
    skills: string[];
};
export type JobsProps = {
    company: string;
    iconPath: string;
    location: string;
    title: string[];
    period: string[];
    description: string[];
    skills: string[][];
};
