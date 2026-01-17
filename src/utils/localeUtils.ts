"use client";
import { routing } from "@/i18n/routing";
// import { useRouter } from "@/i18n/navigation";

export function handleLocaleChange(newLocale: string): void {
    // const router = useRouter();

    const currentPath = window.location.pathname + window.location.search;
    const hash = window.location.hash;

    const pathSegments = currentPath.split("/").filter(Boolean);

    // Remove the existing locale prefix if present
    if (routing.locales.includes(pathSegments[0] as (typeof routing.locales)[number])) {
        pathSegments.shift();
    }

    const newPath = newLocale === routing.defaultLocale ? `/${pathSegments.join("/")}${hash}` : `/${newLocale}/${pathSegments.join("/")}${hash}`;

    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
    window.history.replaceState(null, "", newPath);
    window.location.reload();
    // router.push(newPath || "/");
}
