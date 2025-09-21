import contentfulClient from "./client";
import { Experiences, ExperiencesProps, ExperienceProps, EntryExperiences, EntryExperience, TypeExperiences, TypeExperience, EntryExperienceWithRoles, TypeExperienceWithRoles, TypeRoleOfExperience, RoleProps } from "@/types";
import { formatDateRange } from "@/utils/dateUtils"; // Import the utility function
import { AssetFile } from "contentful";

export async function getExperiences(locale: string): Promise<Experiences | null>  {
    const response = await contentfulClient.getEntries<EntryExperiences>({
        content_type: "experiences", // Replace with your Contentful content type ID
        locale,
        include: 2,
    });

    if (response.items.length > 0) {
        const fields = response.items[0].fields as TypeExperiences;

        // Map the experiences list
        const experiencesList: (ExperienceProps | ExperiencesProps)[] =
            fields.experiencesList?.map((experienceList: EntryExperience | EntryExperienceWithRoles) => {
                const experience = experienceList.fields as TypeExperience | TypeExperienceWithRoles;
                const startDate = experience.startDate;
                const endDate = experience.endDate ? experience.endDate : fields.presentText;
                // Type guard for iconPath
                let iconPathUrl: string | AssetFile = "";
                if (experience.iconPath && typeof experience.iconPath !== "string" && experience.iconPath.fields?.file?.url) {
                    iconPathUrl = experience.iconPath.fields.file.url;
                }

                // This is used to differentiate between single and multiple position experiences
                const isMultiExperience = (experience: TypeExperience | TypeExperienceWithRoles): experience is TypeExperienceWithRoles => {
                    return "roles" in experience && Array.isArray(experience.roles);
                };

                // Check if the experience has roles (EntryExperienceWithRoles)
                if (isMultiExperience(experience)) {
                    const roles: RoleProps[] = experience.roles?.map((role) => {
                        const roleFields = role.fields as TypeRoleOfExperience;
                        const roleStartDate = roleFields.startDate;
                        const roleEndDate = roleFields.endDate ? roleFields.endDate : fields.presentText;
                        return {
                            title: roleFields.title,
                            description: roleFields.description,
                            duration: formatDateRange(roleStartDate, roleEndDate),
                            skills: roleFields.skills ? roleFields.skills.map((skill) => skill) : [],
                        };
                    });
                    return {
                        queue: experience.queue,
                        company: experience.company,
                        companyURL: experience.companyURL,
                        iconPath: iconPathUrl,
                        location: experience.location,
                        duration: formatDateRange(startDate, endDate),
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
                    duration: formatDateRange(startDate, endDate),
                    isShowing: experience.isShowing,
                    description: experience.description,
                    employmentType: experience.employmentType,
                    skills: experience.skills,
                } as ExperienceProps;
            }) || [];

        const experiences: Experiences = {
            resumeText: fields.resumeText,
            resumeLink: fields.resumeLink,
            presentText: fields.presentText,
            noExperiences: fields.noExperiences,
            experiencesList,
        };

        console.log("Extracted:", experiences);
        return experiences;
    }
    return null;
}
