import contentfulClient from "./client";
import { BaseExperiences, ExperiencesProps, EntryExperiences, EntryExperience, AllExperiences, ExperienceProps, EntryExperienceWithRoles, TypeExperienceWithRoles, RoleProps,  AllProjectsProps, EntryAllProjects, AllProjectsEntry, BaseProjectProps, EntryProject, EntryProjectProps, EntryContact, TypeContact } from "@/types";
import { AssetFile } from "contentful";
import { getYearFromDate } from "@/utils/dateUtils";
import { getAbsoluteImageUrl } from "@/utils/imageUtils";

export async function getExperiences(locale: string): Promise<BaseExperiences | null>  {
    const response = await contentfulClient.getEntries<EntryExperiences>({
        content_type: "experiences",
        locale,
        include: 2,
    });

    if (response.items.length > 0) {
        const fields = response.items[0].fields as AllExperiences;

        // Map the experiences list
        const experiencesList: (ExperienceProps | ExperiencesProps)[] =
            fields.experiencesList?.map((experienceList: EntryExperience | EntryExperienceWithRoles) => {
                const experience = experienceList.fields as ExperienceProps | TypeExperienceWithRoles;
                // Type guard for iconPath
                let iconPathUrl: string | AssetFile = "";
                if (experience.iconPath && typeof experience.iconPath !== "string" && experience.iconPath.fields?.file?.url) {
                    iconPathUrl = experience.iconPath.fields.file.url;
                }

                // Check single and multiple position experiences
                const isMultiExperience = (experience: ExperienceProps | TypeExperienceWithRoles): experience is TypeExperienceWithRoles => {
                    return "roles" in experience && Array.isArray(experience.roles);
                };

                if (isMultiExperience(experience)) {
                    const roles: RoleProps[] = experience.roles?.map((role) => {
                        const roleFields = role.fields as RoleProps;
                        return {
                            title: roleFields.title,
                            description: roleFields.description,
                            startDate: roleFields.startDate,
                            endDate: roleFields.endDate,
                            skills: roleFields.skills ? roleFields.skills.map((skill) => skill) : [],
                        };
                    });
                    return {
                        queue: experience.queue,
                        company: experience.company,
                        companyURL: experience.companyURL,
                        iconPath: getAbsoluteImageUrl(String(iconPathUrl)),
                        location: experience.location,
                        startDate: experience.startDate,
                        endDate: experience.endDate,
                        isShowing: experience.isShowing,
                        employmentType: experience.employmentType,
                        roles: roles,
                    } as ExperiencesProps;
                }
                return {
                    queue: experience.queue,
                    company: experience.company,
                    companyURL: experience.companyURL,
                    iconPath: getAbsoluteImageUrl(String(iconPathUrl)),
                    location: experience.location,
                    title: experience.title,
                    startDate: experience.startDate,
                    endDate: experience.endDate,
                    isShowing: experience.isShowing,
                    description: experience.description,
                    employmentType: experience.employmentType,
                    skills: experience.skills,
                } as ExperienceProps;
            }) || [];

        const experiences: BaseExperiences = {
            title: fields.title,
            resumeLink: fields.resumeLink,
            resumeText: fields.resumeText,
            presentText: fields.presentText,
            noExperiences: fields.noExperiences,
            experiencesList,
        };
        return experiences;
    }
    return null;
}
export async function getProjects(locale: string): Promise<AllProjectsProps | null>  {
    const response = await contentfulClient.getEntries<EntryAllProjects>({
        content_type: "projects",
        locale,
        include: 2,
    });
    if (response.items.length > 0) {
        const fields = response.items[0].fields as AllProjectsEntry;
        // Map the projects list
        const projectsList: BaseProjectProps[] =
            fields.projectsList?.map((projectList: EntryProject) => {
                const project = projectList.fields as EntryProjectProps;
                // Type guard for iconPath
                let iconPathUrl: string | AssetFile = "";
                if (project.iconPath && typeof project.iconPath !== "string" && project.iconPath.fields?.file?.url) {
                    iconPathUrl = project.iconPath.fields.file.url;
                }
                return {
                    queue: project.queue,
                    title: project.title,
                    description: project.description,
                    iconPath: getAbsoluteImageUrl(String(iconPathUrl)),
                    link: project.link,
                    year: getYearFromDate(project.year),
                    madeAt: project.madeAt,
                    sample: project.sample,
                    isShowing: project.isShowing,
                    technologies: project.technologies,
                } as BaseProjectProps
            }) || [];
        const projects = {
            title: fields.title,
            description: fields.description,
            projectsText: fields.projectsText,
            tableColumns: fields.tableColumns,
            noProjects: fields.noProjects,
            projectsList,
        };
        return projects;
    }
    return null;
}
export async function getContact(locale: string): Promise<TypeContact | null>  {
    const response = await contentfulClient.getEntries<EntryContact>({
        content_type: "contact",
        locale,
        include: 2,
    });
    if (response.items.length > 0) {
        return response.items[0].fields as TypeContact;
    }
    return null;
}
