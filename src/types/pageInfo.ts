import type { EntryFields, EntrySkeletonType } from "contentful";

export interface TypePageInfo {
    title: string;
    description: EntryFields.Symbol;
}

export type EntryAllPageInfos = EntrySkeletonType<TypePageInfo, "pageInfo">;
