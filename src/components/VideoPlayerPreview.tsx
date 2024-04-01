import * as React from 'react'
import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })
import type { PreviewProps } from 'sanity'
import {Flex, Text} from '@sanity/ui'

interface IVideoPlayerProps extends PreviewProps {
  url: string
  width?: number
  height?: number
}

const VideoPlayer: React.FunctionComponent<IVideoPlayerProps> = ({
  url,
  height = 315,
  width = 560,
}) => {
  return url 
    ? (
      <Flex justify="center" align="center" className="w-full h-auto">
        <ReactPlayer
          url={url}
          width={width}
          height={height}
          className="block mx-auto"
        />
      </Flex>
    )
    : <Text>Add a YouTube URL</Text>
}

export default VideoPlayer
