import * as React from 'react';

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout: React.FunctionComponent<ILayoutProps> = (props) => {
  return (
    <div className="grid grid-cols-12 lg:gap-24">
      {props.children}
    </div>
  );
};

export default Layout;
