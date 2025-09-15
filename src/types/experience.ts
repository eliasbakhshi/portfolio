export type ExperienceProps = {
    id: number;
    company: string;
    companyURL: string;
    iconPath: string;
    location: string;
    title: string;
    duration: string;
    description: string;
    isShown: boolean;
    skills: string[];
};
export type RoleProps = {
    title: string;
    duration: string;
    description: string;
    skills: string[];
};

export type ExperiencesProps = {
    id: number;
    company: string;
    companyURL: string;
    iconPath: string;
    location: string;
    duration: string;
    isShown: boolean;
    roles: RoleProps[];
};
