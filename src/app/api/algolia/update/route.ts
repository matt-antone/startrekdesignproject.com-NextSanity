export const dynamic = "force-dynamic"; // defaults to auto
import algoliasearch from "algoliasearch";
import { SanityDocument } from "next-sanity";
import { loadQuery } from "@/sanity/lib/store";
import { SITEMAP_QUERY } from "@/src/lib/queries";
import dotenv from "dotenv";
import { revalidatePath } from "next/cache";
dotenv.config();

// export async function GET(request: Request) {
//   // GET THE LATEST POSTS
//   let { data } = await loadQuery<SanityDocument>(SITEMAP_QUERY);

//   const client = algoliasearch(
//     process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || "",
//     process.env.ALGOLIA_SEARCH_ADMIN_KEY || ""
//   );

//   for (const [key, value] of Object.entries(data)) {
//     try {
//       console.log(
//         `Updating Algolia search (${key})`,
//         process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
//         process.env.ALGOLIA_SEARCH_ADMIN_KEY
//       );
//       const index = client.initIndex(key);
//       const algoliaResponse = await index.replaceAllObjects(value as any);
//       // check the output of the response in the console
//       console.log(
//         `🎉 Sucessfully added ${algoliaResponse.objectIDs.length} records to Algolia search (${key}). Object IDs:\n${algoliaResponse.objectIDs.join(
//           ","
//         )}`
//       );
//     } catch (error) {
//       console.error("Error updating Algolia", error);
//     }
//   }

//   return new Response("Hello world!");
// }

export async function POST(request: Request) {
  try {
    // POST THE LATEST POSTS
    const res: SanityDocument = await request.json();
    const client = algoliasearch(
      process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || "",
      process.env.ALGOLIA_SEARCH_ADMIN_KEY || ""
    );
    const index = client.initIndex(res._type);
    res.objectID = res._id;

    console.log("Updating Algolia", res);

    await index.saveObjects([res]).then(({ objectIDs }) => {
      console.log("updated these", objectIDs);
    });
    // console.log(algoliaResponse);
    revalidatePath("/symbols/"+res.slug);
    return new Response(`UPDATED ${res._type}`);
  } catch (error) {
    console.error(
      "Error updating Algolia",
      error,
    );
    return new Response("Error updating Algolia");
  }
}
