import * as React from 'react';
import { useRelatedNews } from '~/hooks/useRelatedNews';
import Card from './Card';
import type { Slug } from '@sanity/types';
import { useLatestNews } from '~/hooks';
import { News } from '~/lib/sanity.queries.news';

interface IRelatedPostsProps {
  slug: Slug;
  tags: string[];
  collection?: string;
}

const RelatedPosts: React.FunctionComponent<IRelatedPostsProps> = (props) => {
  const { posts, isLoading: postsLoading }: {
    posts: News[]
    isLoading: boolean
  } = useLatestNews();

  const {posts: related, isLoading: relatedLoading }: {
    posts: News[]
    isLoading: boolean
  } = useRelatedNews({
    slug: props.slug,
    tags: props.tags,
  });
  return relatedLoading || postsLoading ? <p>Loading...</p> : (
    <div>
      {
        (related?.length || posts?.length) && (
          <div>
            <h2 className='text-xl text-primary mb-12'>{ related?.length ? 'Related Posts' : 'Latest Posts'}</h2>
            <ul className='flex gap-12 flex-col'>
              {
                related?.length ? related?.map((post) => (
                  <li key={post._id}>
                    <Card post={post} />
                  </li>
                )): posts.map((post) => (
                  <li key={post._id}>
                    <Card post={post} />
                  </li>
                ))
              }
            </ul>
          </div>
        )
      }
    </div>
  );
};

export default RelatedPosts;
