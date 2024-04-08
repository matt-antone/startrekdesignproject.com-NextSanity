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
    "featuredImage": {
      "src": featuredImage.asset->url,
      "alt": featuredImage.alt,
      "caption": featuredImage.caption,
    },
    types[]->{
      ...
    },
    universes[]->{
      ...
    },
    franchise->{
      ...
    },
    quadrant->{
      ...
    },
    timePeriod->{
      ...
    },
    references[]->{
      ...
    },
    affiliations[]->{
      ...
    },
  }`

  const symbols = await client.fetch(queryStr);

  return symbols;
};
