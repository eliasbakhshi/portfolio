"use client";
import { handleLocaleChange } from "@/utils/localeUtils";

export default function LanguageSwitcher({ locale }: { locale: string }) {
    return (
        <>
            {locale === "en-US" ? (
                <button className='cursor-pointer transition-transform duration-200 ease-in-out hover:-translate-y-[2px] hover:text-tertiary' onClick={() => handleLocaleChange("sv")} aria-label='Switch to Swedish'>
                    🇸🇪
                </button>
            ) : (
                <button className='cursor-pointer transition-transform duration-200 ease-in-out hover:-translate-y-[2px] hover:text-tertiary' onClick={() => handleLocaleChange("en-US")} aria-label='Switch to English'>
                    🇬🇧
                </button>
            )}
        </>
    );
}
