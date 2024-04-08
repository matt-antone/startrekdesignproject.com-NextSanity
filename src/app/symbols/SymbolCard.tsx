import Link from 'next/link';
import * as React from 'react';

interface ISymbolCardProps {
  hit:any;
}

const SymbolCard: React.FunctionComponent<ISymbolCardProps> = ({hit}) => {
  console.log(hit);
  return (
    <Link href={hit.link}>
      <article>
        <header className='text-center'>
          { hit.featuredImage ? <img src={hit.featuredImage.src} alt={hit.title} width={300} height={300} className='block w-full h-auto'/> : null }
          <h1>{hit.title}</h1>
        </header>
      </article>    
    </Link>
  );
};

export default SymbolCard;
