"use client";
import * as React from "react";
import { client } from "@/sanity/lib/client";
import { get } from "http";

interface IRandomPostsProps {
}

const RandomPosts: React.FunctionComponent<IRandomPostsProps> = () => {
  const indexSeed1 = Math.floor(Math.random() * 500);
  const [posts, setPosts] = React.useState([]);
  React.useEffect(() => {
    const query = `*[_type == "post"]{
      title,
      "slug": slug.current,
      "featuredImage": {
        "src": featuredImage.asset->url,
        alt,
        caption,
        "width": featuredImage.asset->metadata.dimensions.width,
        "height": featuredImage.asset->metadata.dimensions.height
      }
    }[${indexSeed1}...${indexSeed1 + 4}]`;
    console.log("query", query);
    const getPosts = async () => {
      const posts = await client.fetch(query);
      setPosts(posts);
    };
    getPosts();
  }, []);
  console.log("posts", posts);
  return (
    <div>
      <h2 className="text-center my-12 text-2xl font-bold">Random Symbols</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 items-center text-center">
        {posts.length > 0 ? (
          posts.map((symbol: any) => {
            return (
              <div key={symbol.slug} className="mb-12">
                {symbol.featuredImage && (
                  <img
                    src={symbol.featuredImage.src}
                    alt={symbol.title}
                    width={symbol.featuredImage.width / 1.5}
                    height={symbol.featuredImage.height / 1.5}
                    className="mx-auto block"
                  />
                )}
                <h2 className="text-center">
                  <a href={`/symbols/${symbol.slug}`}>{symbol.title}</a>
                </h2>
              </div>
            );
          })
        ) : (
          <>
            <div className="w-64 h-64 max-w-[100%] flex justify-center items-center text-center">
              loading
            </div>
            <div className="w-64 h-64 max-w-[100%] flex justify-center items-center text-center">
              loading
            </div>
            <div className="w-64 h-64 max-w-[100%] flex justify-center items-center text-center">
              loading
            </div>
            <div className="w-64 h-64 max-w-[100%] flex justify-center items-center text-center">
              loading
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RandomPosts;
