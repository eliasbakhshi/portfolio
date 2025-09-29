// eslint-disable-next-line @typescript-eslint/no-require-imports
const createNextIntPlugin = require("next-intl/plugin");
import type { NextConfig } from "next";

const withNextIntl = createNextIntPlugin();

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.ctfassets.net", // Add the hostname for Contentful images
                pathname: "**", // Allow all paths under this hostname
            }
        ],
    },
};

export default withNextIntl(nextConfig);
