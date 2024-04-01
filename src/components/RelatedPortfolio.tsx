import * as React from 'react'
import { useRelatedPortfolio } from '~/hooks/useRelatedPortfolio'
import Card from './Card'
import type { Slug } from '@sanity/types'
import { useLatestPortfolio } from '~/hooks'
import { Portfolio } from '~/lib/sanity.queries.portfolio'

interface IRelatedPostsProps {
  slug: Slug
  tags: string[]
  collection?: string
}

const RelatedPosts: React.FunctionComponent<IRelatedPostsProps> = (props) => {
  const { posts, isLoading: postsLoading }: {
    posts: Portfolio[]
    isLoading: boolean
  } = useLatestPortfolio();

  const {posts: related, isLoading: relatedLoading }: {
    posts: Portfolio[]
    isLoading: boolean
  } = useRelatedPortfolio({
    slug: props.slug,
    tags: props.tags,
  });
  return !relatedLoading && !postsLoading && (
    <div id="related">
      {(related.length || posts?.length) && (
        <div>
          <h2 className="text-xl text-primary mb-12">
            { related?.length ? 'Related' : 'Latest' }
          </h2>
          <ul className="flex gap-12 flex-col">
            { related?.length > 0
              ? related?.map((post) => (
                  <li key={post._id}>
                    <Card post={post} path='portfolio'/>
                  </li>
                ))
              : posts.map((post) => (
                  <li key={post._id}>
                    <Card post={post} path='portfolio'/>
                  </li>
                ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default RelatedPosts
