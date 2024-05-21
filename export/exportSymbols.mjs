import * as fs from "fs";
import * as path from "path";
import fm from "front-matter";
import slugify from "slugify";
import { Schema } from "@sanity/schema";
// import { htmlToBlocks } from "@sanity/block-tools";
// import { JSDOM } from "jsdom";
// import markdownit from "markdown-it";
// const md = markdownit();
// import PostSchema from '../src/schema/post';
import { getDirectory, getFile } from "./lib/index.mjs";
import { PostSchema } from "./PostSchema.mjs";
import { taxonomies } from "./lib/all-taxonomies.mjs";

import { getTaxonomy } from "./lib/getTaxonomy.mjs";
import { convertMarkdown } from "./lib/convertMarkdown.mjs";
// import { PostSchema } from '../src/schema/post.ts/index.js';

// Define the schema for the new content


// Define the directory where the old content is stored
const filesDir = "export/content/symbols";
const basepath = path.join(process.cwd(), filesDir);

// Start with compiling a schema we can work against
const defaultSchema = Schema.compile({
  name: "myBlog",
  types: [PostSchema],
});

// Define the block content type for converting to HTML
const blockContentType = defaultSchema
  .get("post")
  .fields.find((field) => field.name === "body").type;

const convertPostToSanityPost = (post) => {
  !post.attributes?.featuredImg?.src && console.log('converting',post.attributes.title);
  const spDate = post.attributes.date;
  // const spDate = new Date(post.attributes.date).toISOString()
  const sp = {
    _type: "post",
    date: post.attributes.date,
    _createdAt: spDate,
    _publishedAt: spDate,
    title: post.attributes.title.trim() || "Untitled",
    body: convertMarkdown(post.body, blockContentType) || [],
    slug: {
      _type: "slug",
      current: slugify(post.attributes.title || "Untitled", { lower: true }),
    },
    weight: post.attributes.weight,
    tags: post.attributes.tags,
    // featuredImage: post.attributes.featuredImg?.src && {
    //   _type: "image",
    //   _sanityAsset: `image@${post.attributes.featuredImg.src}`,
    //   alt: post.attributes.featuredImg?.alt || post.attributes.featuredImg.src.substring(post.attributes.featuredImg.src.lastIndexOf('/')+1),
    //   // caption: post.attributes.featuredImg?.caption || null,
    // },
    // timePeriod: getTaxonomy(post, "time", taxonomies, "timePeriod"),
    // quadrant: getTaxonomy(post, "quadrants", taxonomies, "quadrant"),
    // universes: getTaxonomy(post, "universes", taxonomies, "universe"),
    // affiliations: getTaxonomy(post, "affiliations", taxonomies, "affiliation"),
    // franchise: getTaxonomy(post, "franchise", taxonomies, "franchise"),
    // types: getTaxonomy(post, "types", taxonomies, "types"),
    references: post?.attributes?.primary_reference ? convertMarkdown(post.attributes.primary_reference, blockContentType) : [],
    memoryAlpha: post?.attributes?.memory_alpha_url ? post.attributes.memory_alpha_url : '',
    //timePeriods.find(tp => tp.title === post.attributes.timePeriod),
  };

  const timePeriod = getTaxonomy(post, "time", taxonomies, "timePeriod")
  const quadrant = getTaxonomy(post, "quadrants", taxonomies, "quadrant")
  const universes = getTaxonomy(post, "universes", taxonomies, "universe")
  const affiliations = getTaxonomy(post, "affiliations", taxonomies, "affiliation")
  const franchise = getTaxonomy(post, "franchise", taxonomies, "franchise")
  const types = getTaxonomy(post, "types", taxonomies, "types")

  timePeriod !== null && (sp.timePeriod = timePeriod)
  quadrant !== null && (sp.quadrant = quadrant)
  universes && universes[0] && (sp.universes = universes)
  affiliations && affiliations[0] && (sp.affiliations = affiliations)
  franchise && franchise[0] && (sp.franchise = franchise)
  types && types[0] && (sp.types = types)
  post.attributes.featuredImg?.src && (sp.featuredImage = {
    _type: "image",
    _sanityAsset: `image@${post.attributes.featuredImg.src}`,
    alt: post.attributes.featuredImg?.alt || post.attributes.featuredImg.src.substring(post.attributes.featuredImg.src.lastIndexOf('/')+1),
  })

  const sanityPost = JSON.stringify(sp).replace(/\\n/g, "");
  return sanityPost;
};

await (async () => {
  let postsString = "";
  const files = await getDirectory(basepath);
  await files.forEach(async (file, i) => {
    const content = fm(await getFile(basepath, file));
    const post = convertPostToSanityPost(content);
    postsString = postsString + `${post}\n`;
    if (i === files.length - 1) {
      fs.writeFile("./symbols.ndjson", postsString, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('wrote to file');
          // file written successfully
        }
      });
    }
  });
})();
