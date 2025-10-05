import fs from "fs";
import path from "path";

const SITE_URL = process.env.SITE_URL || "http://localhost:3000";

const pages = ["/", "/projects"]; // Add all static pages

// Generate the sitemap XML content
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages
        .map(
            (page) => `
    <url>
        <loc>${SITE_URL}${page}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>${page === "/" ? "1.0" : "0.8"}</priority>
    </url>
    `
        )
        .join("")}
    ${pages
        .map(
            (page) => `
    <url>
        <loc>${SITE_URL}/sv${page === "/" ? "" : page}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>${page === "/" ? "1.0" : "0.8"}</priority>
    </url>
    `
        )
        .join("")}
</urlset>`;

// Generate the robots.txt content
const robotsContent = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

// Write the files to the public folder
const publicFolder = path.join(process.cwd(), "public");
const sitemapPath = path.join(publicFolder, "sitemap.xml");
const robotsPath = path.join(publicFolder, "robots.txt");

if (!fs.existsSync(publicFolder)) {
    fs.mkdirSync(publicFolder);
}

// Write into the files
fs.writeFileSync(sitemapPath, sitemapContent, "utf8");
fs.writeFileSync(robotsPath, robotsContent, "utf8");

console.log(`✅ Sitemap generated at ${sitemapPath}`);
console.log(`✅ Robots.txt generated at ${robotsPath}`);
