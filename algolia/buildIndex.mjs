import algoliasearch from "algoliasearch";
import dotenv from "dotenv";
dotenv.config();

const transformPostsToSearchObjects = (posts) => {
  const nPosts = posts ? posts.filter( (post) => {
    return post._id ? true : false
  } ).map( (post) => {
    const n = { ...post, objectID: post._id, link: `/symbols/${post.slug.current}` }
    return n;
  }) : null
  return nPosts
}

export const buildIndex = async (indexName,posts) => {
    try {
      const transformed = transformPostsToSearchObjects(posts);
      // // initialize the client with your environment variables
      const client = algoliasearch(
        process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
        process.env.ALGOLIA_SEARCH_ADMIN_KEY,
      );

      // // initialize the index with your index name
      const index = client.initIndex(indexName);

      // // save the objects!
      const algoliaResponse = await index.replaceAllObjects(transformed);
      // check the output of the response in the console
      console.log(
        `🎉 Sucessfully added ${algoliaResponse.objectIDs.length} records to Algolia search (${indexName}). Object IDs:\n${algoliaResponse.objectIDs.join(
          ",",
        )}`,
      );
    } catch (error) {
      console.log(error);
    }
}