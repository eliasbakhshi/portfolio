import type { EntryFields, EntrySkeletonType } from "contentful";

export interface TypeAbout {
    entryTitle: string;
    about: EntryFields.RichText;
    name: string;
    title: string;
    description: string;
}

export type EntryAbout = EntrySkeletonType<TypeAbout, "about">;
