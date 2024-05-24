export const dynamic = "force-dynamic"; // defaults to auto
import algoliasearch from "algoliasearch";
import dotenv from "dotenv";
import { revalidatePath } from "next/cache";
dotenv.config();

export async function POST(request: Request) {
  try {
    // POST THE LATEST POSTS
    const res = await request.json();
    console.log("Deleting", res._id);
    // Add the post to Algolia
    const client = algoliasearch(
      process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || "",
      process.env.ALGOLIA_SEARCH_ADMIN_KEY || ""
    );
    const index = client.initIndex(res._type);
    const algoliaResponse = await index
      .deleteObject(res._id)
      .then((del: any) => {
        console.log(del);
        revalidatePath("/symbols/");
        revalidatePath("/symbols/" + res.slug);
      });
    return new Response("Hello world!");
  } catch (error) {
    console.error("Error updating Algolia", error);
    return new Response("Error updating Algolia");
  }
}
