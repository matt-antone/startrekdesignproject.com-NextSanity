export const slug = {
  name: 'slug',
  title: 'Slug',
  type: 'slug',
  validation: (Rule) => Rule.required(),
  options: {
    source: 'title',
    maxLength: 96,
  },
}