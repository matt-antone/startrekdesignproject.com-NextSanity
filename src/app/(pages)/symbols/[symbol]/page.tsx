import * as React from "react";
import { client } from "@/sanity/lib/client";
import PageHeader from "../../../components/PageHeader";
import PortableText from "@/src/app/components/PortableText";
import Link from "next/link";
import type { Metadata, ResolvingMetadata } from 'next'

const query = `*[_type == "post" && slug.current == $slug]{
  ...,
  "slug": slug.current,
  "featuredImage": {
    "src": featuredImage.asset->url,
    alt,
    caption,
    "width": featuredImage.asset->metadata.dimensions.width,
    "height": featuredImage.asset->metadata.dimensions.height
  },
  "timePeriod": timePeriod->.title,
  "quadrant": quadrant->.title,
  "universes": universes[]->.title,
  "affiliations": affiliations[]->.title,
  "types": types[]->title,
  "franchise": franchise->.title,
  "sameUniverse": *[_type == "post" && slug.current != $slug && count(universes[]->.title[@ in ^.^.universes]) > 0]{
    _id,
    title,
    slug,
    "featuredImage": {
      "src": featuredImage.asset->url,
      alt,
      caption,
      "width": featuredImage.asset->metadata.dimensions.width,
      "height": featuredImage.asset->metadata.dimensions.height
    },
    "related": math::sum( [
      count(universes[]->.title[@ in ^.^.universes]),
      count(affiliations[]->.title[@ in ^.^.affiliations]),
      count(types[]->title[@ in ^.^.types]),
    ])
  } | order(related desc) [0...6]
}[0]`;

type Props = {
  params: { symbol: string }
  searchParams: { [key: string]: string | string[] | undefined }
}



export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const post = await client.fetch(query, { slug: params.symbol });
  console.log("post",post); 
  return {
    title: post.title,
  }
}

interface ISymbolPageProps {
  params: {
    symbol: string;
  };
}

const SymbolPage: React.FunctionComponent<ISymbolPageProps> = async ({
  params: { symbol: slug },
}) => {
  // console.log(slug);

  const post = await client.fetch(query, { slug });
  return (
    <>
      <div className="lg:flex gap-12 w-full items-center">
        <div className="basis-1/2">
          <img
            src={post?.featuredImage?.src || ""}
            alt={post?.featuredImage?.alt || ""}
            className="w-full h-auto"
            width={post.featuredImage.width / 2}
            height={post.featuredImage.height / 2}
          />
        </div>
        <div className="basis-1/2">
          <PageHeader title={post.title} />
          <ul className="grid gap-4 text-lg">
            <li className="flex justify-between items-center">
              <span className="font-bold">Affiliations</span>{" "}
              <span>{post.affiliations.join(", ")}</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="font-bold">Quadrant:</span>{" "}
              <span>{post.quadrant}</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="font-bold">Time Period:</span>{" "}
              <span>{post.timePeriod}</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="font-bold">Universe:</span>{" "}
              <span>{post.universes.join(", ")}</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="font-bold">Franchise:</span>{" "}
              <span>{post.franchise}</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="font-bold">Types:</span>{" "}
              <span>{post.types.join(", ")}</span>
            </li>
            {post.references && (
              <li className="flex justify-between items-center">
                <span className="font-bold">Reference:</span>{" "}
                <span>
                  <PortableText value={post.references} />
                </span>
              </li>
            )}
          </ul>

          {post.memoryAlpha && (
            <Link href={post.memoryAlpha}>Read More on Memory Alpha</Link>
          )}
        </div>
      </div>
      <div className="md:grid grid-cols-2 gap-12 w-full items-start py-12">
        <div>
          <PortableText value={post.body} />
        </div>
        <div>
          <h2 className="text-xl font-bold">Related</h2>
          <ul className="grid grid-cols-3 gap-4 py-8">
            {post.sameUniverse.map((related: any) => (
              <li key={related._id} className="text-center">
                <Link href={`/symbols/${related.slug.current}`}>
                    <img
                      src={related.featuredImage.src}
                      alt={related.featuredImage.alt}
                      width={related.featuredImage.width / 4}
                      height={related.featuredImage.height / 4}
                    />
                    <h3>{related.title}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SymbolPage;

export async function generateStaticParams() {
  // const client = getClient(draftMode ? { token: readToken } : undefined)
  let posts = null;
  try {
    const query = `*[_type == "post"]{slug}`;
    posts = await client.fetch(query);
  } catch (error) {
    console.error(error);
  }

  return (
    posts?.map((post: any) => {
      slug: post.slug.current;
    }) || []
  );
}
