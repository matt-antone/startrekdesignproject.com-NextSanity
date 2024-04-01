import type { PreviewProps, PreviewLayoutKey } from 'sanity'
import { defineField, defineType } from 'sanity'
import VideoPlayerPreview from '@/components/VideoPlayerPreview'
export const youtube = defineType({
  name: 'youtube',
  title: 'Youtube',
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

