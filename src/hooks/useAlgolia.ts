import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch';

export const useAlgolia = () => {
  return algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || "", process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY || "");
}
