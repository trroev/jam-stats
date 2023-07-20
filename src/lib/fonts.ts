import { Raleway, Merriweather } from "next/font/google";

export const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const merriweather = Merriweather({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
});
