import { Asset, ChainModifiers, EntryFields, EntrySkeletonType } from "contentful";

export interface BaseProjectProps {
    queue: number;
    title: string;
    description: string;
    iconPath: string | Asset<ChainModifiers>;
    link: string;
    year: number;
    madeAt: string;
    sample: boolean;
    isShowing: boolean;
    technologies: string[];
}

export interface EntryProjectProps extends Omit<BaseProjectProps, "year"> {
    year: EntryFields.Date;
}

export interface BaseAllProjects {
    title: string;
    description: string;
    projectsText: string;
    tableColumns: string[];
    noProjects: string;
}

export interface AllProjectsProps extends BaseAllProjects {
    projectsList: BaseProjectProps[];
}

export interface AllProjectsEntry extends BaseAllProjects {
    projectsList: EntryProject[];
}

export type EntryProject = EntrySkeletonType<EntryProjectProps, "project">;
export type EntryAllProjects = EntrySkeletonType<AllProjectsEntry, "projects">;
