import * as React from 'react';
import SymbolList from './SymbolList';
import PageHeader from '../../components/PageHeader';

interface ISymbolsProps {
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
