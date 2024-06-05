import { groq } from "next-sanity";
export const SITEMAP_QUERY = groq`{
  "test": *[_type == "post"]|order(date desc){
    "objectID": _id,
    image{...,asset->{
      url,
      metadata{dimensions}
    }},
    "slug": slug.current,
    date,
    title,
    excerpt,
    body,
    "timePeriod": timePeriod->title,
    "quadrant": quadrant->title,
    "universes": universes[]->title,
    "affiliations": affiliations[]->title,
    "types": types[]->title,
    "franchise": franchise->title,
    "designers": designers[]->title,
    references,
}`;
