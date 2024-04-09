import Image from "next/image";
import { client } from "@/sanity/lib/client";

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
  console.log("post", post.heroImage);
  return (
    <main>
      {post.hero && (
        <div id="hero">
          {post.hero.heroImage && (
            <img
              src={post.heroImage.src}
              alt="hero image"
              className="mx-auto"
              width={post.heroImage.width}
              height={post.heroImage.height}
            />
          )}
        </div>
      )}
      <div id="block-wraper-0">
        <section id="" className="py-8">
          <div
            id=""
            className="px-2 xs:px-4 sm:px-8 md:px-0 w-full mx-auto md:max-w-3xl lg:max-w-4xl xl:max-w-5xl  "
          >
            <div className="">
              <div className="undefined">
                <div className="prose prose-white max-w-none w-full">
                  <figure className="block mx-auto max-w-none">
                    <img
                      src="https://res.cloudinary.com/startrekdesignproject-com/image/upload/v1558222570/STDP_LogoBug2"
                      alt=""
                      className="
                        max-w-full
                        square
                        block mx-auto 
                        object-contain
                      "
                      loading="lazy"
                      width="300"
                      height="300"
                    />
                  </figure>
                  <h1>
                    ONE MILDLY OBSESSIVE GOAL: The Most Accurate &amp; Complete
                    Star Trek Symbol Database.
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div id="block-wraper-1">
        <section id="" className="py-8">
          <div
            id=""
            className="px-2 xs:px-4 sm:px-8 md:px-0 w-full mx-auto md:max-w-3xl lg:max-w-4xl xl:max-w-5xl  "
          >
            <div className="">
              <div className="undefined">
                <div className="grid md:grid-cols-1 gap-16 undefined undefined">
                  <div
                    id="430254-cell"
                    className="prose prose-white prose prose-white-lg  text-left max-w-none"
                  >
                    <div className="prose prose-white max-w-none w-full"></div>
                  </div>
                  <div
                    id="829563-cell"
                    className="prose prose-white prose prose-white-lg  text-left max-w-none"
                  >
                    <div className="prose prose-white max-w-none w-full">
                      <figure className="block mx-auto  max-w-none">
                        <img
                          src="https://res.cloudinary.com/startrekdesignproject-com/image/upload/v1701814996/Trek-Marks_LDS-2x2-1"
                          alt=""
                          className="
          max-w-full
          landscape
          block mx-auto 
          object-cover
        "
                          loading="lazy"
                          width="6401"
                          height="480"
                        />
                      </figure>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div id="block-wraper-2">
        <section id="" className="py-8">
          <div
            id=""
            className="px-2 xs:px-4 sm:px-8 md:px-0 w-full mx-auto md:max-w-3xl lg:max-w-4xl xl:max-w-5xl  "
          >
            <div className="">
              <div className="undefined">
                <div className="prose prose-white max-w-none w-full">
                  <h2>
                    Star Trek has had great influence on modern culture. And no
                    more so than its graphic design.
                  </h2>
                  <p>
                    For three generations designers have been profoundly
                    influenced by the symbols, insignias and logos seen in Star
                    Trek. In turn, those generations have, through design, woven
                    aspects of the Star Trek graphic design aesthetic into every
                    aspect of daily life. So much so, that it should be thought
                    of as a unique genre of graphic design.
                  </p>
                  <p>
                    Every designer that has contributed to this pervasive
                    cultural influence has used Star Trek’s hopeful and
                    optimistic future for humanity as a guideline. In turn, they
                    applied the same philosophical tenants when creating each
                    new symbol to build a fully evolved and internally
                    consistent visual design spectrum that leverages established
                    design representations of peace, oppression, freedom,
                    foreignness, aggression, etc. and envisions how graphic
                    design will advance along with humanity. But none more than…
                  </p>
                  <p>
                    Matt Jeffries’ foundational design premise that regardless
                    the technological advance, simple striking visual elements
                    used consistently guides the viewer in forming positive and
                    negative associations.
                  </p>
                  <p>
                    Franz Joseph’s projections of a future visual language
                    rooted in the United Nations and diplomacy rather than
                    relying on the more obvious military influences.
                  </p>
                  <p>
                    <a href="https://memory-alpha.fandom.com/wiki/Michael_Okuda">
                      Mike Okuda
                    </a>
                    ’s wonderful imaginary unbroken thread of design from
                    genuine space exploration through to a future of exploration
                    that Star Trek embodies.
                  </p>
                  <p>
                    <a href="https://doug_drex_drexler.artstation.com/">
                      Doug Drexler
                    </a>
                    , William Ware Theiss, Pierre Drolet, Geoffrey
                    Mandel&nbsp;and so many more (please scroll down for more on
                    that).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
