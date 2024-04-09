import { defineField, defineType } from 'sanity'
import * as fields from './fields'
import { GrDocument } from "react-icons/gr";

export default defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  icon: GrDocument,
  options: {
    singleton: true, // Identify this document as a singleton
  },
  fields: [
    fields.createdDate,
    fields.title,
    fields.slug,
    fields.excerpt,
    {
      type: "object",
      name: "hero",
      title: "Hero",
      fields: [
        fields.body,
        {
          name: "heroImage",
          title: "Hero Image",
          type: "image",
          fields: [
            {
              name: "alt",
              title: "Alt Text",
              type: "string",
              validation: (Rule:any) => Rule.required(),
            },
          ],
        },
      ],
    },
    fields.body,
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'featuredImage.src',
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    },
  },
})
