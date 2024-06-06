export const dynamic = "force-dynamic"; // defaults to auto
import algoliasearch from "algoliasearch";
import { SanityDocument } from "next-sanity";
import dotenv from "dotenv";
import { revalidatePath } from "next/cache";
dotenv.config();

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
