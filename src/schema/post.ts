import { defineField, defineType } from 'sanity'
import * as fields from './fields'
import { GrArticle } from "react-icons/gr";

export const PostSchema = {
  name: 'post',
  title: 'Posts',
  type: 'document',
  icon: GrArticle,
  fields: [
    fields.createdDate,
    fields.title,
    fields.slug,
    {
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (Rule:any) => Rule.required(),
        },
        {
          name: "caption",
          title: "Caption",
          type: "string",
          validation: (Rule:any) => Rule.required(),
        },
      ],
    },
    fields.excerpt,
    fields.body,
    {
      type: "reference",
      name: "timePeriod",
      label: "Time Period",
      to: [{ type: "timePeriod" }],
    },
    {
      type: "reference",
      name: "quadrant",
      label: "Quadrant",
      to: [{ type: "quadrant" }],
    },
    {
      type: "array",
      name: "universes",
      label: "Universes",
      of: [{ type: "universe" }],
    },
    {
      type: "array",
      name: "affiliations",
      label: "Affiliations",
      of: [{ type: "affiliation" }],
    },
    {
      type: "array",
      name: "types",
      label: "Types",
      of: [{ type: "types" }],
    },
    {
      type: "reference",
      name: "franchise",
      label: "Franchise",
      to: [{ type: "franchise" }],
    },
    {
      type: "blockContent",
      name: "references",
      label: "References",
    },
    {
      type: "url",
      name: "memoryAlpha",
      label: "Memory Alpha",
    },    

  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'featuredImage',
    },
    prepare(selection:any) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    },
  },
}

export default PostSchema
