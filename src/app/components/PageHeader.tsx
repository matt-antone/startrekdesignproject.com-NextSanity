"use client";
import * as React from 'react';
import { useSearchParams } from 'next/navigation';

interface IPageHeaderProps {
  title: string;
}

const Header: React.FunctionComponent<IPageHeaderProps>  = ({title}) => {
  const searchParams = useSearchParams();
  const taxonomy = searchParams.get('tax') || '';
  const term = searchParams.get('term') || '';
  return (
    <div>
      <h1 className='capitalize text-3xl font-bold mb-8'>{term ? `${taxonomy} - ${term}` : title}</h1>
    </div>
  );  
}

const PageHeader: React.FunctionComponent<IPageHeaderProps> = ({title}) => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
    <Header title={title} />
    </React.Suspense>
  );
};

export default PageHeader;
