export type ExperienceProps = {
    id: number;
    company: string;
    companyURL: string;
    iconPath: string;
    location: string;
    title: string;
    duration: string;
    description: string;
    isShowing: boolean;
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
    isShowing: boolean;
    roles: RoleProps[];
};
