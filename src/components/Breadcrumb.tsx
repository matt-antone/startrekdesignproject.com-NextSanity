import Head from 'next/head'
import { BreadcrumbList } from 'schema-dts'
import BreadcrumbItem from '@/components/BreadcrumbItem'
import { useBreadcrumbs } from '@/hooks'
import { jsonLdScriptProps } from 'react-schemaorg'
import type { ListItem } from 'schema-dts'
import { titleCase } from 'title-case'

const Breadcrumb = ({ title }:{title:string}) => {
  // const childrenArray = Children.toArray(children);
  const { breadcrumbs } = useBreadcrumbs()

  const pages = breadcrumbs.map((breadcrumb, i) => {
    return {
      "@type": "ListItem",
      "position": i + 1,
      "name": titleCase(breadcrumb.label.replaceAll('-', ' ')),
      "item": `${process.env.NEXT_PUBLIC_SITE_URL}${breadcrumb.href}`
    } as ListItem
  })

  const itemList = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": `${process.env.NEXT_PUBLIC_SITE_URL}/`
    } as ListItem,
    ...pages
  ]

  return breadcrumbs?.length > 0 ? (
    <>
      <Head>
        <script
          {...jsonLdScriptProps<BreadcrumbList>({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            name: 'breadcrumbs',
            "itemListElement": itemList
          })}
        />
      </Head>
      <nav className="my-8 text-xs" aria-label="breadcrumb">
        <ol className="flex content-center items-center space-x-4">
          <BreadcrumbItem
            key={'/'}
            href={'/'}
            className="flex"
            isCurrent={false}
          >
            <span>Home</span>
          </BreadcrumbItem>

          {breadcrumbs.map((breadcrumb, i) => {
            return (
              <BreadcrumbItem
                key={breadcrumb.href}
                href={breadcrumb.href}
                className="flex"
                isCurrent={breadcrumb.isCurrent}
              >
                <span>
                  {i < breadcrumbs.length - 1
                    ? breadcrumb.label.replaceAll('-', ' ')
                    : title}
                </span>
              </BreadcrumbItem>
            )
          })}
        </ol>
      </nav>
    </>
  ) : null
}

export default Breadcrumb
