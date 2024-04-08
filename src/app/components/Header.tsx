import * as React from 'react';
import Container from './Container';
import Link from 'next/link';

interface IHeaderProps {
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  return (
    <div className="py-8 text-white relative z-10">
      <Container>
        <div className="flex justify-between items-center">
          <div><Link href="/">Home</Link></div>
         <div><Link href="/symbols">Symbols</Link></div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
