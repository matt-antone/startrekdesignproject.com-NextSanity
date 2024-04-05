import { useState, useEffect } from 'react';
import { getClient } from '~/lib/sanity.client'


export interface INavigation {
  title: string;
  items: INavigationItem[];
}

export interface INavigationItem {
  text: string;
  slug: string;
}

// Navigation Hooks
export const useHeaderNavigation = () => {
  const [nav, setNav] = useState<INavigation>({
    title: '',
    items: []
  });
  useEffect(() => {
    const getNav = async () => {
      const query = `*[_type == "navigation"][title == "Header"][0]{
        title,
        items[]{
          text,
          "slug": navigationItemUrl.internalLink->slug.current
        }
      }`;
      const client = getClient();
      const nav = await client.fetch(query);
      setNav({title: nav.title, items: nav.items});
    };
    getNav();
  }, []);
  return nav;
}