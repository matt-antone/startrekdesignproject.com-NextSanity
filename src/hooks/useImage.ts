import { useEffect, useState } from 'react';
import { urlForImage } from '~/lib/sanity.image'

export const useImage = (image) => {
  const [url, setUrl] = useState('');
  useEffect(() => {
    setUrl(urlForImage(image)?.dpr(2).url() || '');
  }, [image]);
  return url;
}