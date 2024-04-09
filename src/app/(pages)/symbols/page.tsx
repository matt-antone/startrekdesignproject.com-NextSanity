import * as React from 'react';
import SymbolList from './SymbolList';
import PageHeader from '../../components/PageHeader';
import type { Metadata } from 'next'

interface ISymbolsProps {
}

export const metadata: Metadata = {
  title: 'Symbols',
  description: 'All the symbols in the library.',
}

const Symbols: React.FunctionComponent<ISymbolsProps> = (props) => {
  return (
    <div>
      <PageHeader title='Symbols'/>
      <SymbolList/>
    </div>
  );
};

export default Symbols;
