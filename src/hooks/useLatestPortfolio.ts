import * as React from 'react';
import { getClient } from '~/lib/sanity.client'

export const useLatestPortfolio = () => {
  const [posts, setPosts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        const client = getClient();
        const query = `
          *[_type == "portfolio"] | order(date desc) [0...3] {
            _id,
            title,
            slug,
            publishedAt,
            featuredImage,
          }
        `;
        const data = await client.fetch(query);
        setPosts(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  },[]);

  return { posts, isLoading, error };
}