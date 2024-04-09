"use client";
import * as React from "react";
import { client } from "@/sanity/lib/client";
import { motion } from "framer-motion";
import Link from "next/link";

interface IRandomPostsProps {}

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
      },
      "link": "/symbols/" + slug.current
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
    <div className="mb-24">
      <h2 className="text-center my-12 text-2xl font-bold">Random Symbols</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 items-center text-center">
        {posts.length > 0 ? (
          posts.map((symbol: any) => {
            return (
              <Link  key={symbol.link} href={symbol.link}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  key={symbol.slug}
                  transition={{ duration: 0.75, delay: 0.4 }}
                  className="block w-full h-auto"
                >
                  <article>
                    <header className="text-center">
                      {symbol.featuredImage ? (
                        <img
                          src={symbol.featuredImage.src}
                          alt={symbol.title}
                          width={300}
                          height={300}
                          className="block w-full h-auto"
                        />
                      ) : null}
                      <h1>{symbol.title}</h1>
                    </header>
                  </article>
                </motion.div>
              </Link>
            );
          })
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="w-72 h-72 flex justify-center items-center" 
            >
              loading
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="w-72 h-72 flex justify-center items-center" 
            >
              loading
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="w-72 h-72 flex justify-center items-center" 
            >
              loading
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="w-72 h-72 flex justify-center items-center" 
            >
              loading
            </motion.div>{" "}
          </>
        )}
      </div>
    </div>
  );
};

export default RandomPosts;
