export const PostSchema = {
  name: "post",
  title: "Posts",
  type: "document",
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
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
          options: {
            isHighlighted: true,
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: "caption",
          title: "Caption",
          type: "string",
          options: {
            isHighlighted: true,
          },
        },
      ],
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
    },
    {
      title: "Body",
      name: "body",
      type: "array",
      of: [
        {
          type: "image",
          fields: [
            {
              title: "Alt Text",
              name: "alt",
              type: "string",
              options: {
                isHighlighted: true,
              },
              validation: (Rule) => Rule.required(),
            },
          ],
        },
        {
          title: "Block",
          type: "block",

          // Styles let you set what your user can mark up blocks with. These
          // correspond with HTML tags, but you can set any title or value
          // you want and decide how you want to deal with it where you want to
          // use your content.
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [{ title: "Bullet", value: "bullet" }],
          // Marks let you mark up inline text in the block editor.
          marks: {
            // Decorators usually describe a single property – e.g. a typographic
            // preference or highlighting by editors.
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            // Annotations can be any object structure – e.g. a link or a footnote.
            annotations: [
              {
                title: "URL",
                name: "link",
                type: "object",
                fields: [
                  {
                    title: "URL",
                    name: "href",
                    type: "url",
                  },
                ],
              },
            ],
          },
        },
      ],
    },
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
      of: [{ type: "reference", to: [{ type: "universe" }] }],
    },
    {
      type: "array",
      name: "affiliations",
      label: "Affiliations",
      of: [{ type: "reference", to: [{ type: "affiliation" }] }],
    },
    {
      type: "array",
      name: "types",
      label: "Types",
      of: [{ type: "reference", to: [{ type: "types" }] }],
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
      title: "title",
      author: "author.name",
      media: "featuredImage",
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
};