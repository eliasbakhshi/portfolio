import type { EntrySkeletonType } from "contentful";

export interface TypeTableColumns{
    entryTitle: string;
    year: string;
    title: string;
    madeAt: string;
    icon: string;
    link: string;
    description: string;
    technologies: string;
}

export type EntryTableColumns = EntrySkeletonType<TypeTableColumns, "tableColumns">;
