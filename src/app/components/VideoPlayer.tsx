import * as React from 'react'
import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })
import type { PreviewProps } from 'sanity'

interface IVideoPlayerProps extends PreviewProps {
  url?: string
  width?: number
  height?: number
  
}

const VideoPlayer: React.FunctionComponent<IVideoPlayerProps> = ({
  url,
  width = 560,
  height = 315,
}) => {
  return (
    <div className="">
      <ReactPlayer
        url={url}
        width={560}
        height={315}
        className="player"
      />
    </div>
  )
}

export default VideoPlayer
