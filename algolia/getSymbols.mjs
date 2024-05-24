import { createClient } from 'next-sanity'
import dotenv from 'dotenv'
dotenv.config()
// import { apiVersion, dataset, projectId, useCdn } from '../env'

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-22'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const useCdn = false

function assertValue(v, errorMessage) {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}


export const getSymbols = async () => {
  const client = createClient({
    apiVersion,
    dataset,
    projectId,
    useCdn,
  })

  const queryStr = `*[_type == "post"]{
    ...,
    "objectID": _id,
    "slug": slug.current,
    featuredImage{...,asset->{url,metadata{dimensions}}},
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
    references,
}`

  const symbols = await client.fetch(queryStr);
  console.log(symbols);
  return symbols;
};
