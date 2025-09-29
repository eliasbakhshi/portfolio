import type { Asset, EntrySkeletonType } from "contentful";

export interface TypeNavTab {
    label: string;
    sectionId: string;
    href: string;
}

export interface TypeNavMenu {
    entryTitle: string;
    blackLogo: string;
    whiteLogo: string;
    anotherLanguage: string;
    navTabs: TypeNavTab[];
}

export interface EntryNav {
    entryTitle: string;
    blackLogo: Asset;
    whiteLogo: Asset;
    anotherLanguage: string;
    navTabs: EntryNavTab[];
}

export type EntryNavTab = EntrySkeletonType<TypeNavTab, "navigationTab">;
export type EntryNavMenu = EntrySkeletonType<EntryNav, "nav">;
