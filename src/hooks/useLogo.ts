import { useEffect, useState } from 'react';
import { getClient } from '~/lib/sanity.client'
import { urlForImage } from '~/lib/sanity.image'

export const useLogo = () => {
  const [logo, setLogo] = useState('');
  useEffect(() => {
    const getLogo = async () => {
      const query = `*[_type == "settings"][0]{siteLogo,siteLogoAlt}`;
      const client = getClient();
      const { siteLogo } = await client.fetch(query);
      setLogo(urlForImage(siteLogo)?.width(206).height(85).dpr(2).url() || '');
    };
    getLogo();
  }, []);
  return logo;
}