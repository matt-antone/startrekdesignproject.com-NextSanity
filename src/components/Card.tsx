import Image from 'next/image'

import { urlForImage } from '~/lib/sanity.image'
import { type Post, type News } from '~/lib/sanity.queries'
import { type Portfolio } from '~/lib/sanity.queries.portfolio'
import { type CaseStudy } from '~/lib/sanity.queries.casestudy'
import { useImage } from '~/hooks'

export type CardProps = {
  post: Post | News | Portfolio | CaseStudy
  path?: string
}

export default function Card({
  post,
  path = 'news',
}: CardProps){
  const image = useImage(post.featuredImage)
  return (
    <a className="card__link" href={`/${path}/${post.slug.current}`}>
      <article className="card grid grid-cols-5 gap-4 lg:block items-center">
        {post.featuredImage ? (
          <Image
            className="shadow-lg lg:mb-8 col-span-2"
            src={image}
            width={500}
            height={300}
            alt=""
          />
        ) : (
          <div className="card__cover--none" />
        )}
        <header className="card__container col-span-3">
          <h2 className="text-lg uppercase text-primary font-thin line-clamp-3">{post.title}</h2>
        </header>
      </article>
    </a>
  )
}
