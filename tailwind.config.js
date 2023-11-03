/** @type {import('tailwindcss').Config} */

import { nextui } from "@nextui-org/react"

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {},
      boxShadow: {
        custom: "0px 4px 20px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [
    nextui({
      addCommonColors: true,
      themes: {
        light: {
          colors: {
            white: "#fff",
            offWhite: "#f7f7f7",
            black: "#535960",
            primary: "#22BD71",
            secondary: "#4f505f",
            tertiary: "#24C475",
            success: "#BDCBA7",
            warning: "#E2CC90",
            danger: "#E3A393",
            background: "#efefef",
            text: {
              DEFAULT: "#4E545B",
              secondary: "#60666C",
              disabled: "#BBC5CE",
              hint: "#8D979F",
            },
          },
        },
      },
      dark: {
        colors: {},
      },
    }),
  ],
}
