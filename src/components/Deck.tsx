import * as React from 'react'
import Card, { type CardProps } from './Card'
import { CaseStudy } from '~/lib/sanity.queries.casestudy'
import { News } from '~/lib/sanity.queries.news'
import { Portfolio } from '~/lib/sanity.queries.portfolio'

interface IDeckProps {
  cards: CaseStudy[] | News[] | Portfolio[]
  path: string
}

const Deck: React.FunctionComponent<IDeckProps> = ({
  cards,
  path = 'news',
}) => {
  return (
    cards.length && (
      <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16 lg:py-12">
        {cards.map((post) => {
          return <Card key={post.title} post={post} path={path} />
        })}
      </ul>
    )
  )
}

export default Deck
