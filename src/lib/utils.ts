import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import stc from "string-to-color";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// generates a random color based on a string
// export const stringToColor = (str: string) => {
//   return stc(str);
// };

export const stringToColor = (str: string) => {
  // return stc(str);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).substr(-2);
  }
  return color;
};
