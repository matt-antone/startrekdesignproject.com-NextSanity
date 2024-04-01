export const linkImage = ({
  type: 'image',
  name: 'linkImage',
  title: 'Image',
  preview: {
    select: {
      alt: 'alt',
      media: 'asset',
    },
    prepare(selection) {
      const { alt, caption, media } = selection
      return {
        title: alt,
        subtitle: caption,
        media,
      }
    },
  },
  fields: [
    {
      title: "Alt Text",
      name: "alt",
      type: "string",
      validation: Rule => Rule.custom((alt, context) => {
        if (context.parent?.asset && !alt) {
          return "Alt text is required when an image is present"
        }
        return true
      }),
    },
    {
      type: 'url',
      name: 'url',
      title: 'URL',
      description: ``,
    }
  ],
})