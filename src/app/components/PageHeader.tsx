import * as React from 'react';

interface IPageHeaderProps {
  title: string;
}

const PageHeader: React.FunctionComponent<IPageHeaderProps> = ({title}) => {
  return (
    <div>
      <h1 className='text-3xl font-bold mb-8'>{title}</h1>
    </div>
  );
};

export default PageHeader;
