import * as React from 'react'
import Container from './Container'
import NextImage from 'next/image'
import { useHeaderNavigation, useLogo, useSiteName } from '@/hooks/'
import Link from 'next/link'
import { GrMenu } from "react-icons/gr";

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = () => {
  const {items} = useHeaderNavigation()
  const logo = useLogo()
  const siteName = useSiteName()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  
  return (
    <>
      <div className="absolute z-60 -top-full focus-within:top-0">
        <div className="flex">
          <div>
            <a href="/us-in-90-seconds#content">Skip to Content</a>
          </div>
          <div></div>
        </div>
      </div>
      <header
        id="site-header"
        className="block w-screen fixed top-0 z-50 bg-whiten  bg-white"
      >
        <Container>
          <div className="flex gap-8 py-4 items-center justify-between ">
            <div className="flex items-center">
              { logo ? (
                <Link href="/">
                  <NextImage
                    className="block min-w-32"
                    src={logo}
                    width={206}
                    height={85}
                    alt={siteName || 'Website'}
                  />
                </Link>
              ) : (
                siteName || 'Website'
              )}
            </div>
            <div className="hidden lg:flex items-stretch mt-8">
              {items?.length > 0 && (
                <nav>
                  <ol className="flex gap-4 items-center">
                    {items.map((item) => {
                      return (
                        <li key={item.slug} className="block">
                          <Link
                            href={`/${item.slug}`}
                            className=" block whitespace-nowrap p-2 text-xs lg:text-base uppercase font-semibold text-primary"
                          >
                            {item.text || 'untitled'}
                          </Link>
                        </li>
                      )
                    })}
                  </ol>
                </nav>
              )}
            </div>
            <div className='lg:hidden relative'>
              <button onClick={()=>{ setIsMenuOpen(!isMenuOpen) }}>
                <span className="sr-only">Menu</span>
                <GrMenu className="h-8 w-8" />
              </button>
              {items?.length > 0 && (
                <nav className={`${isMenuOpen ? 'block' : 'hidden'} absolute right-0 top-8 bg-white w-auto shadow-lg`}>
                  <ol className="flex flex-col gap-8 p-8">
                    {items.map((item) => {
                      return (
                        <li key={item.slug} className="block">
                          <Link
                            href={`/${item.slug}`}
                            className=" block whitespace-nowrap p-2 text-lg uppercase font-semibold text-primary"
                          >
                            {item.text || 'untitled'}
                          </Link>
                        </li>
                      )
                    })}
                  </ol>
                </nav>
              )}
            </div>
          </div>
        </Container>
      </header>
    </>
  )
}

export default Header
