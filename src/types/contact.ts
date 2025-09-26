import type { EntrySkeletonType } from "contentful";

export interface TypeContact {
    title: string;
    description: string;
    name: string;
    email: string;
    message: string;
    submit: string;
    successMessage: string;
    errorMessage: string;
    requiredEmailMessage: string;
    requiredNameMessage: string;
    requiredMessageMessage: string;
    misMatchMessage: string;
    missingAtMessage: string;
}

export type EntryContact = EntrySkeletonType<TypeContact, "contact">;
