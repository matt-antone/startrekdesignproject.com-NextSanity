import * as React from 'react'
import SanityImage from './SanityImage'
import { PortableText as SanityPortableText } from '@portabletext/react'
import VideoPlayer from './VideoPlayer'

interface IPortableTextProps {
  value: any[]
}

const components = {
  types: {
    image: SanityImage,
    wcagImage: ({ value }) => {
      return <SanityImage value={value} isInline={false} />
    },
    vimeo: ({ value }) => {
      return <VideoPlayer {...value}/>
    },
    youtube: ({ value }) => {
      return (
        <div className="w-full h-auto">
          <VideoPlayer {...value} width={560} height={315} />
        </div>
      )
    },
    // Any other custom types you have in your content
    // Examples: mapLocation, contactForm, code, featuredProjects, latestNews, etc.
  },
}

const PortableText: React.FunctionComponent<IPortableTextProps> = (props) => {
  return (
    <div className="prose">
      <SanityPortableText value={props.value} components={components} />
    </div>
  )
}

export default PortableText
