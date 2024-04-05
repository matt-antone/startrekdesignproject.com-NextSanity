import * as React from 'react';
import {getImageDimensions} from '@sanity/asset-utils'
import urlBuilder from '@sanity/image-url'
import { getClient } from '@/lib/sanity.client'

interface ISanityImageProps {
  value: any;
  isInline: boolean;
}

const SanityImage: React.FunctionComponent<ISanityImageProps> = ({ value, isInline }) => {
  const client = getClient({ token: 'skstHu26LPUR2bVneSMFPceHT65YJ7A8lYMinN4qHBkgq8RlenuhYmyeZQT0jA6YcOkQYApeA8yXE1Rabukt3JWpPQHTFv1uWqh1iQMhLwp4GbTm6oJDoe8wdKcj0434rLePyCD1GyB1HtCGEhVM7IejsVHrQfHRcwEjZI9fTwAxKyMNtC1T' })
  const {width, height} = getImageDimensions(value)
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
        aspectRatio: width / height,
      }}
    />
  )
  return ;
};

export default SanityImage;