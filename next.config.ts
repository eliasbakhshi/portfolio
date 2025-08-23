// eslint-disable-next-line @typescript-eslint/no-require-imports
const createNextIntPlugin = require("next-intl/plugin");
import type { NextConfig } from "next";

const withNextIntl = createNextIntPlugin();

const nextConfig: NextConfig = {
  /* config options here */
};

export default withNextIntl(nextConfig);

