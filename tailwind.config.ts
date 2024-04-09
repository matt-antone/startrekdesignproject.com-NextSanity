import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import {proseWhite} from "./src/styles/white";
import { white } from "tailwindcss/colors";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      typography: () => ({
        white: proseWhite.white,
      }),
    },
  },
  plugins: [
    typography,
  ],
};
export default config;
