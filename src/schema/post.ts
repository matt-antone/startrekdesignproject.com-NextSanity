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
    fields.excerpt,
    fields.body,
    {
      type: "reference",
      name: "timePeriod",
      label: "Time Period",
      to: [{ type: "timePeriod" }],
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
