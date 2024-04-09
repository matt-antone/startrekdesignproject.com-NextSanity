import Image from "next/image";
import { client } from "@/sanity/lib/client";
import PortableText from "../components/PortableText";
import RandomPosts from "../components/RandomPosts";

export default async function Home() {
  const query = `*[_type == "home"]{
    ...,
    "heroImage": {
      "src": hero.heroImage.asset->url,
      alt,
      caption,
      "width": hero.heroImage.asset->metadata.dimensions.width,
      "height": hero.heroImage.asset->metadata.dimensions.height
    }
  }[0]`;
  const post = await client.fetch(query);
  console.log("post", post.randos);
  return (
    <main>
      {post.hero && (
        <div id="hero" className="text-center mb-24">
          {post.hero.heroImage && (
            <img
              src={post.heroImage.src}
              alt="hero image"
              className="mx-auto mb-12 block rotate"
              width={post.heroImage.width / 1.5}
              height={post.heroImage.height / 1.5}
            />
          )}
          {post?.hero?.body && <PortableText value={post.hero.body} />}
        </div>
      )}
        <RandomPosts />


      {post.body && <PortableText value={post.body} />}
    </main>
  );
}
