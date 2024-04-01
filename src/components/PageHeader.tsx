import * as React from 'react';
import Breadcrumb from './Breadcrumb';

interface IPageHeaderProps {
  title: string;
}

const PageHeader: React.FunctionComponent<IPageHeaderProps> = ({title}) => {
  return (
    <div className='mb-8 mt-40'>
      <Breadcrumb title={title}/>
      <h1 className='text-3xl uppercase text-primary mt-12'>{title}</h1>
    </div>
  );
};

export default PageHeader;
