import Image from "next/image";
import { client } from "@/sanity/lib/client";
import PortableText from "../components/PortableText";

export default async function Home() {
  const indexSeed1 = Math.floor(Math.random() * 500);
  const indexSeed2 = Math.floor(Math.random() * 1000);
  const query = `*[_type == "home"]{
    ...,
    "heroImage": {
      "src": hero.heroImage.asset->url,
      alt,
      caption,
      "width": hero.heroImage.asset->metadata.dimensions.width,
      "height": hero.heroImage.asset->metadata.dimensions.height
    },
    "randos": *[_type == "post"]{
      title,
      "slug": slug.current,
      "featuredImage": {
        "src": featuredImage.asset->url,
        alt,
        caption,
        "width": featuredImage.asset->metadata.dimensions.width,
        "height": featuredImage.asset->metadata.dimensions.height
      }
    }[${indexSeed1}...${indexSeed1+4}],
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
              className="mx-auto mb-12"
              width={post.heroImage.width / 1.5}
              height={post.heroImage.height / 1.5}
            />
          )}
          {post?.hero?.body && <PortableText value={post.hero.body} />}
        </div>
      )}
          <h2 className="text-center my-12 text-2xl font-bold">Random Posts</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 items-center">
            {post.randos ? post.randos.map((symbol: any) => {
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
            }) : (
              <>
                <div>loading</div>
                <div>loading</div>
                <div>loading</div>
                <div>loading</div>
              </>
            )}
          </div>

      {post.body && <PortableText value={post.body} />}
    </main>
  );
}
