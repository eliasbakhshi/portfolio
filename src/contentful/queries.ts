import contentfulClient from "./client";
import { Experiences, ExperiencesProps, EntryExperiences, EntryExperience, AllExperiences, ExperienceProps, EntryExperienceWithRoles, TypeExperienceWithRoles, RoleProps } from "@/types";
import { AssetFile } from "contentful";

export async function getExperiences(locale: string): Promise<Experiences | null>  {
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
                    console.log("roles", experience.roles);
                    const roles: RoleProps[] = experience.roles?.map((role) => {
                        console.log("role", role);
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
                        iconPath: iconPathUrl,
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
                    iconPath: iconPathUrl,
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

        const experiences: Experiences = {
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
