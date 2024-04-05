import { useState, useEffect } from 'react';
import { getClient } from '~/lib/sanity.client';

export const useSiteName = () => {
  const [siteName, setSiteName] = useState(null);
  useEffect(() => {
    const getSiteName = async () => {
      const query = `*[_type == "settings"][0]{siteName}`;
      const client = getClient();
      const {siteName} = await client.fetch(query);
      setSiteName(siteName);
    };
    getSiteName();
  }, []);
  return siteName;
}