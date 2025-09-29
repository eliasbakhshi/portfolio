import type { EntryFields, EntrySkeletonType } from "contentful";

export interface TypeFooter {
    entryTitle: string;
    githubURL: string;
    linkedinURL: string;
    footerText: EntryFields.RichText;
}

export type EntryFooter = EntrySkeletonType<TypeFooter, "footer">;
