import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
    locales: ["en-US", "sv"],
    defaultLocale: "en-US",
    localePrefix: "as-needed",
});
