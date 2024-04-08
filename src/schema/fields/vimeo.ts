import { defineField, defineType } from 'sanity'
import type { PreviewProps, PreviewLayoutKey } from 'sanity'
import VideoPlayerPreview from '@/src/components/VideoPlayerPreview'

export const vimeo = defineType({
  name: 'vimeo',
  title: 'Vimeo',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      url: 'url',
    },
  },
  // components: {
  //   preview: VideoPlayerPreview as React.ComponentType<PreviewProps<PreviewLayoutKey>>,
  // },
})