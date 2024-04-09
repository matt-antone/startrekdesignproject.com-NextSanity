import * as React from 'react';
import Container from './Container';

interface IFooterProps {
}

const Footer: React.FunctionComponent<IFooterProps> = (props) => {
  return (
    <footer className='py-12 relative z-10 text-center'>
      <Container>
        <p>©{new Date().getFullYear()} Star Trek Design Project. All rights reserved. Committed to WCAG 2.1 AA Accessibility Compliance.</p>
      </Container>
    </footer>
  );
};

export default Footer;
