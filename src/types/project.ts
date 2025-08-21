
export type ProjectProps = {
    id: number;
    sample?: boolean;
    title: string;
    technologies: string[];
    link?: string | URL;
    iconPath?: string;
    description?: string;
    year?: string;
    madeAt?: string;
}
