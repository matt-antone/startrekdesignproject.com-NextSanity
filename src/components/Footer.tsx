import * as React from 'react';
import Container from './Container';
import { useFooterNavigation } from '~/hooks';

interface IFooterProps {
}

const Footer: React.FunctionComponent<IFooterProps> = (props) => {
  const { items } = useFooterNavigation();

  return (
    <footer className='block bg-primary text-white py-12 mt-32'>
      <Container>
        <nav>
          <ul className='flex gap-8 pb-8 flex-wrap lg:flex-nowrap'>
            { items && items.map( ( item, i ) => {
              return (
                <li key={item.slug} className='block'>
                  <a href={`/${item.slug}`} className='block whitespace-nowrap p-2 text-xs lg:text-base uppercase font-semibold text-white'>{item.text || 'untitled'}</a>
                </li>
              );
            }) }
          </ul>
        </nav>
        <p>©{new Date().getFullYear()} Glyphix. All rights reserved. Committed to WCAG 2.1 AA Accessibility Compliance.</p>
      </Container>
    </footer>
  );
};

export default Footer;
