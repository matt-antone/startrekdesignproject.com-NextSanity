import * as React from 'react';

interface IContainerProps {
  children: React.ReactNode;
}

const Container: React.FunctionComponent<IContainerProps> = (props) => {
  return (
    <div className="w-full max-w-[1300px] mx-auto px-12">
      {props.children}
    </div>
  );
};

export default Container;
