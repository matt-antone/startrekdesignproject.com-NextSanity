import * as React from 'react';
import { getClient } from '~/lib/sanity.client';
import type { Slug } from '@sanity/types';

type RelatedNews = {
  slug: Slug;
  tags: string[];
}

export const useRelatedPortfolio = (props:RelatedNews) => {
  const { slug, tags } = props;
  const [posts, setPosts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        const client = getClient();
        const query = `
        *[_type == "portfolio" && slug.current == $slug][0] {
          title,
          tags,
          "sameTags": *[_type == "portfolio" && slug.current != $slug && count(tags[@ in ^.^.tags]) > 0]{
            _id,
            title,
            slug,
            featuredImage,
            "related": count(tags[@ in ^.^.tags])
          } | order(related desc) [0...3]
        }
        `;
        const data = await client.fetch(query, { slug:slug.current, tags });
        setPosts(data.sameTags);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  });

  return { posts, isLoading, error };
}; 