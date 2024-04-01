import { validation } from "sanity";

export const clientLogo = {
  title: "Client Logo",
  name: "clientLogo",
  type: "image",
  validation: Rule => Rule.required(),
  options: {
    hotspot: true,
    captionField: 'caption', 
  },
}