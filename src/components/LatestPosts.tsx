import * as React from 'react';
import { useLatestNews } from '@/hooks';
import Card from './Card';
import { News } from '@/lib/sanity.queries.news'

const LatestPosts: React.FunctionComponent = () => {
  const {posts}:{
    posts: News[]
  } = useLatestNews();
  return (
    <div>
      {
        posts && (
          <div>
            <h2 className='text-xl text-primary mb-12'>Latest Posts</h2>
            <ul className='flex gap-12 flex-col'>
              {
                posts.map((post) => (
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

export default LatestPosts;
