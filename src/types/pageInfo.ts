import type { EntrySkeletonType } from "contentful";

export interface TypePageInfo {
    title: string;
    description: string;
    pageName: string;
}

export type EntryPageInfo = EntrySkeletonType<TypePageInfo, "pageInfo">;
