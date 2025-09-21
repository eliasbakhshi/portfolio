import type { Asset, EntryFields, AssetFile, ChainModifiers, Entry } from "contentful";

export type ExperienceProps = {
    queue: number;
    company: string;
    companyURL: string;
    iconPath: string | AssetFile;
    location: string;
    title: string;
    duration: string;
    description: string;
    isShowing: boolean;
    employmentType: string;
    skills?: string[];
};
export type RoleProps = {
    title: string;
    duration: string;
    description: string;
    skills: string[];
};

export type ExperiencesProps = {
    queue: number;
    company: string;
    companyURL: string;
    iconPath: string;
    location: string;
    duration: string;
    isShowing: boolean;
    roles: RoleProps[];
};

export type Experiences = {
    resumeText: string;
    resumeLink: string;
    presentText: string;
    noExperiences: string;
    experiencesList: (ExperienceProps | ExperiencesProps)[];
};

// ----------------------------------------+++++++++++++++++++++++++++++++++

export interface TypeExperience {
    company: string;
    queue: EntryFields.Integer;
    companyURL: string;
    iconPath: string | Asset<ChainModifiers>;
    location: string;
    title: string;
    isShowing: EntryFields.Boolean;
    description: EntryFields.Text;
    skills?: string[];
    employmentType: string;
    startDate: EntryFields.Date;
    endDate?: EntryFields.Date;
}

export interface EntryExperience {
    fields: TypeExperience;
    contentTypeId: "experience";
}

export interface TypeExperiences {
    entryTitle: string;
    resumeText: string;
    resumeLink: string;
    presentText: string;
    noExperiences: string;
    experiencesList: (EntryExperience | EntryExperienceWithRoles)[];
}

export interface EntryExperiences {
    fields: TypeExperiences;
    contentTypeId: "experiences";
}

export interface TypeRoleOfExperience {
    title: string;
    description: EntryFields.Text;
    skills?: string[];
    startDate: EntryFields.Date;
    endDate?: EntryFields.Date;
}

export interface TypeExperienceWithRoles {
    queue: EntryFields.Integer;
    company: string;
    companyURL: string;
    iconPath: Asset;
    location: string;
    employmentType: "Contract" | "Deltid" | "Egenföretagare" | "Freelance" | "Frilans" | "Full-time" | "Heltid" | "Internship" | "Kontrakt" | "Part-time" | "Praktik" | "Self-employed";
    isShowing: EntryFields.Boolean;
    startDate: EntryFields.Date;
    endDate?: EntryFields.Date;
    roles: Entry<EntryRoleOfExperience>[];
}

export interface EntryExperienceWithRoles {
    fields: TypeExperienceWithRoles;
    contentTypeId: "experienceWithRoles";
}
export interface EntryRoleOfExperience {
    fields: TypeRoleOfExperience;
    contentTypeId: "roleOfExperience";
}
