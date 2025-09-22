import type { Asset, EntryFields, ChainModifiers, Entry, EntrySkeletonType } from "contentful";

type ISODate = EntryFields.Date;
type EmploymentType = "Contract" | "Deltid" | "Egenföretagare" | "Freelance" | "Frilans" | "Full-time" | "Heltid" | "Internship" | "Kontrakt" | "Part-time" | "Praktik" | "Self-employed";

interface BaseExperience {
    queue: number;
    company: string;
    companyURL: string;
    iconPath: string | Asset<ChainModifiers>;
    location: string;
    isShowing: boolean;
    employmentType: EmploymentType;
    startDate: ISODate;
    endDate?: ISODate;
}

export interface RoleProps {
    title: string;
    description: string;
    startDate: ISODate;
    endDate?: ISODate;
    skills?: string[];
}


export type ExperienceProps = BaseExperience & RoleProps;

export interface ExperiencesProps extends BaseExperience {
    roles: RoleProps[];
}

export interface Experiences {
    title: string;
    resumeText: string;
    resumeLink: string;
    presentText: string;
    noExperiences: string;
    experiencesList: (ExperienceProps | ExperiencesProps)[];
}

export interface AllExperiences {
    title: string;
    resumeText: string;
    resumeLink: string;
    presentText: string;
    noExperiences: string;
    experiencesList: (EntryExperience | EntryExperienceWithRoles)[];
}

export interface TypeExperienceWithRoles extends BaseExperience {
    roles: Entry<EntryRoleOfExperience>[];
}

export type EntryExperience = EntrySkeletonType<ExperienceProps, "experience">;
export type EntryExperiences = EntrySkeletonType<AllExperiences, "experiences">;
export type EntryExperienceWithRoles = EntrySkeletonType<ExperiencesProps, "experienceWithRoles">;
export type EntryRoleOfExperience = EntrySkeletonType<RoleProps, "roleOfExperience">;
