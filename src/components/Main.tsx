import * as React from 'react';

interface IBodyProps {
  children: React.ReactNode;
}

const Body: React.FunctionComponent<IBodyProps> = (props) => {
  return (
    <main className="col-span-12 lg:col-span-8">
      {props.children}
    </main>
  );
};

export default Body;
