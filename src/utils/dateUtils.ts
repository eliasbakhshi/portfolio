/**
 * Formats a date range into a string like "Feb 2022 – Mar 2022".
 * @param startDate - The start date in ISO format (e.g., "2022-02-01").
 * @param endDate - The end date in ISO format (e.g., "2022-03-31").
 * @returns A formatted date range string.
 */
export function formatDateRange(startDate: string, endDate: string): string {
    const formatter = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" });
    const start = formatter.format(new Date(startDate));
    const end = !isNaN(Date.parse(endDate)) ? formatter.format(new Date(endDate)) : endDate;
    return `${start} – ${end}`;
}


/**
 * Extracts the year from a date string and returns it as a number.
 * @param dateStr - The date in ISO format (e.g., "2022-02-01").
 * @returns The year as a number.
 */
export function getYearFromDate(dateStr: string): number {
    const date = new Date(dateStr);
    return date.getFullYear();
}
