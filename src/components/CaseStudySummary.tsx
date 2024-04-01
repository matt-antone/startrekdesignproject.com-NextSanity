import * as React from 'react'
import { CaseStudy } from '~/lib/sanity.queries.casestudy'
import NextImage from 'next/image'
import { urlForImage } from '~/lib/sanity.image'
import PortableText from '~/components/PortableText'
import Link from 'next/link'
import SanityImage from '~/components/SanityImage'
import { Controller, Scene } from 'react-scrollmagic'
import { Timeline, Tween } from 'react-gsap'
import { useEffect, useState } from 'react'
import { useImage } from '~/hooks'

interface ICaseStudySummaryProps {
  caseStudy: CaseStudy
  key?: string
  index?: number
}

const CaseStudySummary: React.FunctionComponent<ICaseStudySummaryProps> = (
  { caseStudy, index },
  i,
) => {
  const [height, setHeight] = useState(1000)



  useEffect(() => {
    setHeight(window.innerHeight)
  }, [])

  const logo = useImage(caseStudy.clientLogo)
  const featuredImage = useImage(caseStudy.featuredImage)

  return (
    <Controller>
      <Scene triggerHook="onLeave" duration={height} pin>
        {(progress) => (
          <article className="relative w-screen h-screen pt-32">
            <div className="">
              <header className="lg:max-w-[33%] text-primary text-xl lg:text-3xl font-light uppercase p-12">
                <h1 className="sr-only">{caseStudy.title}</h1>
                {caseStudy.headline && <div>{caseStudy.headline}</div>}
              </header>
              <Timeline totalProgress={progress} paused>
                <Tween
                  from={{
                    x: `0px`,
                    y: '1500px'
                  }}
                  to={{ x: `${0}px`, y: `${ 0}px` }}
                >
                  <div className="absolute w-full lg:max-w-[65ch] lg:right-12 animated-block-text lg:w-1/2 ml-auto prose prose-xs lg:prose-sm bg-light shadow-lg">
                    <article className="px-8 pb-8">
                    {logo && (
                      <NextImage
                        className="card__cover contain max-w-32"
                        src={logo}
                        width={300}
                        height={300}
                        alt={`${caseStudy.title} logo`}
                        priority={index === 0}
                      />
                    )}
                    {caseStudy.summary && (
                      <div className="mb-4">
                        <div className="not-prose">
                          <h2 className='not-prose text-xl uppercase leading-tight text-primary mb-4'>{caseStudy.subheadline}</h2>
                        </div>
                        <div className="line-clamp-4 lg:line-clamp-none">
                          <PortableText
                            value={caseStudy.summary}
                          />
                        </div>
                      </div>
                    )}
                    <footer>
                      <Link 
                        href={`/case-studies/${caseStudy.slug.current}`}
                        className='inline-block bg-primary text-white uppercase no-underline py-2 px-4'>
                        Read More about {caseStudy.title || 'this project'}
                      </Link>
                    </footer>
                    </article>

                  </div>
                </Tween>
              </Timeline>
              {featuredImage && (
                <NextImage
                  className="contain absolute bottom-0 right-0 -z-10"
                  src={featuredImage}
                  height={500}
                  width={1200}
                  alt={(caseStudy?.featuredImage?.alt as string) || ''}
                  priority={index === 0}
                />
              )}
            </div>
          </article>
        )}
      </Scene>
    </Controller>
  )
}

export default CaseStudySummary
