import * as React from 'react';

export interface ISidebarProps {
  children: React.ReactNode;
}

export default function Sidebar (props: ISidebarProps) {
  return (
    <div className='py-12 lg:py-0 col-span-12 lg:col-span-4'>
      {props.children}
    </div>
  );
}
