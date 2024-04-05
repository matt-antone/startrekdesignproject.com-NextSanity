import * as React from 'react';
import imageUrlBuilder from '@sanity/image-url'
import { getClient } from '@/lib/sanity.client'
import Head from 'next/head'
import { CaseStudy } from '@/lib/sanity.queries.casestudy';
import { News } from '@/lib/sanity.queries.news';
import { Page } from '@/lib/sanity.queries.pages';
import { Portfolio } from '@/lib/sanity.queries.portfolio';


interface IMetaDataProps {
  post: Page | News | Portfolio | CaseStudy
}

const MetaData: React.FunctionComponent<IMetaDataProps> = ({post}) => {
  const image = post.featuredImage ?  imageUrlBuilder(getClient()).image(post.featuredImage).url() : ''
  return (
    <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt || ''} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt || ''} />
        <meta property="og:type" content="website" />
        { post.featuredImage &&  <meta property="og:image" content={imageUrlBuilder(getClient()).image(post.featuredImage).url()} /> }
       

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@site" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt || ''} />
        { post.featuredImage && <meta name="twitter:image" content={imageUrlBuilder(getClient()).image(post.featuredImage).url()} />}
    </Head>
  );
};

export default MetaData;
