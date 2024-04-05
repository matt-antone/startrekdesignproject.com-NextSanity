import * as fs from 'fs';
import * as path from 'path';
import fm from 'front-matter';
import slugify from 'slugify';
import { htmlToBlocks } from '@sanity/block-tools';
import {Schema} from '@sanity/schema'
import { JSDOM } from 'jsdom' 
import markdownit from 'markdown-it'
const md = markdownit()
// import PostSchema from '../src/schema/post';
import { getDirectory, getFile } from './lib/index.mjs';
import { GrArticle } from 'react-icons/gr';

// Define the schema for the new content
export const PostSchema = {
  name: 'post',
  title: 'Posts',
  type: 'document',
  icon: GrArticle,
  fields: [
    {
      name: "createdDate",
      title: "Created Date",
      type: "datetime",
    },
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
    },
    {
      title: 'Body',
      name: 'body',
      type: 'array',
      of: [                
        {
          type: 'image'
        },
      {
        title: 'Block',
        type: 'block',
        
        // Styles let you set what your user can mark up blocks with. These
        // correspond with HTML tags, but you can set any title or value
        // you want and decide how you want to deal with it where you want to
        // use your content.
        styles: [
          { title: 'Normal', value: 'normal' },
          { title: 'H1', value: 'h1' },
          { title: 'H2', value: 'h2' },
          { title: 'H3', value: 'h3' },
          { title: 'H4', value: 'h4' },
          { title: 'Quote', value: 'blockquote' },
        ],
        lists: [{ title: 'Bullet', value: 'bullet' }],
        // Marks let you mark up inline text in the block editor.
        marks: {
          // Decorators usually describe a single property – e.g. a typographic
          // preference or highlighting by editors.
          decorators: [
            { title: 'Strong', value: 'strong' },
            { title: 'Emphasis', value: 'em' },
          ],
          // Annotations can be any object structure – e.g. a link or a footnote.
          annotations: [
            {
              title: 'URL',
              name: 'link',
              type: 'object',
              fields: [
                {
                  title: 'URL',
                  name: 'href',
                  type: 'url',
                },
              ],
            },
          ],
        },
      },],
    },
    // {
    //   type: "reference",
    //   name: "timePeriod",
    //   label: "Time Period",
    //   to: [{ type: "timePeriod" }],
    // },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'featuredImage',
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    },
  },
}

// Define the directory where the old content is stored
const filesDir = 'export/oldsymbols';
const basepath = path.join(process.cwd(), filesDir);

// Start with compiling a schema we can work against
const defaultSchema = Schema.compile({
  name: 'myBlog',
  types: [PostSchema],
})

// Define the block content type for converting to HTML
console.log(defaultSchema.get('post').fields,defaultSchema.get('post').fields)
const blockContentType = defaultSchema.get('post').fields.find((field) => field.name === 'body').type


  const convertPostToSanityPost = (post) => {
    // Render the markdown to HTML
    const blocks = htmlToBlocks(md.render(post.body), blockContentType,  {
      parseHtml: (html) => new JSDOM(html).window.document,
      rules: [
        // Add a custom rule for handling images
        {
          deserialize(el, next, block) {
            if (el.tagName && el.tagName === 'IMG') {
              return block({
                _type: 'wcagImage',
                _sanityAsset: `image@${el.src}`,
                alt: el.alt || null,
                caption: el.title || null,
              })
            }
            return undefined
          },
        },
      ]
    })
    const spDate = post.attributes.date
    // const spDate = new Date(post.attributes.date).toISOString()
    console.log(post.attributes.title)
    const sp = {
      _type: 'caseStudy',
      date: post.attributes.date,
      _createdAt: spDate,
      _publishedAt: spDate,
      title: post.attributes.title || 'Untitled',
      body: blocks || [],
      slug: {
        _type: 'slug',
        current: slugify(post.attributes.title || 'Untitled', {lower: true})
      },
      weight: post.attributes.weight,
      tags: post.attributes.tags,
      featuredImage: post.attributes.featuredImg?.src && {
        _type: 'wcagImage',
        _sanityAsset: `image@${post.attributes.featuredImg.src}`,
        alt: post.attributes.featuredImg?.alt || null,
        caption: post.attributes.featuredImg?.caption || null,
      },
    }
    const sanityPost = JSON.stringify(sp).replace(/\\n/g, '')
    return sanityPost
  }

  await ( async () => {
    let postsString = ''
    const files = await getDirectory(basepath)
    await files.forEach( async (file,i) => {
      const content = fm(await getFile(basepath,file))
      const post = convertPostToSanityPost(content)
      postsString = postsString + `${post}\n`
      if (i === files.length - 1) {
        fs.writeFile('./symbols.ndjson', postsString, err => {
          if (err) {
            // console.error(err);
          } else {
            // console.log('wrote to file');
            // file written successfully
          }
        });  
      }
    } )
  } )()