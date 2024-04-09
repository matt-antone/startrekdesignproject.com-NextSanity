import * as React from 'react';
import { client } from "@/sanity/lib/client";
import urlBuilder from '@sanity/image-url'

interface ISanityImageProps {
  value: any;
  isInline: boolean;
}

const SanityImage: React.FunctionComponent<ISanityImageProps> = ({ value, isInline }) => {
  return (
    <img
      src={urlBuilder(client)
        .image(value)
        .width(isInline ? 100 : 800)
        .fit('max')
        .auto('format')
        .url()}
      alt={value.alt || ' '}
      loading="lazy"
      style={{
        // Display alongside text if image appears inside a block text span
        display: isInline ? 'inline-block' : 'block',

        // Avoid jumping around with aspect-ratio CSS property
        // aspectRatio: width / height,
      }}
    />
  )
  return ;
};

export default SanityImage;