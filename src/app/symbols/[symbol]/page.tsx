import * as React from 'react';
import { client } from '@/sanity/lib/client';
import { slug } from '@/src/schema/fields';
interface ISymbolPageProps{
  params: {
    symbol: string;
  }
}

const SymbolPage: React.FunctionComponent<ISymbolPageProps> = async ({params: {symbol: slug}}) => {
  console.log(slug);
  const query = `*[_type == "post" && slug.current == "${slug}"]`
  const [post] = await client.fetch(query)
  console.log(post);
  return (
    <div>
      <h1>{post.title}</h1>
    </div>
  );
};

export default SymbolPage;

export async function generateStaticParams() {
  // const client = getClient(draftMode ? { token: readToken } : undefined)
  let posts = null;
  try {
    const query = `*[_type == "post"]{slug}`
    posts = await client.fetch(query)
} catch (error) {
    console.error(error)
  }

  return posts?.map((post:any) => { slug: post.slug.current }) || [];
}