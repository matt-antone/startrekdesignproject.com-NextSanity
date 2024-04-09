import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { BsPostageHeart } from "react-icons/bs";
import PortableText from "../components/PortableText";

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
  console.log("post", BsPostageHeart);
  return (
    <main>
      {post.hero && (
        <div id="hero" className="text-center mb-12">
          {post.hero.heroImage && (
            <img
              src={post.heroImage.src}
              alt="hero image"
              className="mx-auto mb-12"
              width={post.heroImage.width}
              height={post.heroImage.height}
            />
          )}
          { post?.hero?.body && (
            <PortableText value={post.hero.body}/>
          ) }
        </div>
      )}
      { post.body && (
        <PortableText value={post.body}/>
      ) }
    </main>
  );
}
