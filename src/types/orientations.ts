import type { EntrySkeletonType } from "contentful";

export interface TypeOrientations {
    entryTitle: string;
    back: string;
    forward: string;
}

export type EntryOrientations = EntrySkeletonType<TypeOrientations, "orientations">;
