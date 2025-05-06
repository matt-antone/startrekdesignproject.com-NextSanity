"use client";
import * as React from "react";
import { useAlgolia } from "@/src/hooks/useAlgolia";
import {
  InstantSearch,
  Configure,
  Hits,
  RefinementList,
  Pagination,
  SearchBox,
  Stats,
  SortBy,
  CurrentRefinements,
} from "react-instantsearch";
import SymbolCard from "./SymbolCard";
import { useSearchParams } from 'next/navigation'


interface ISymbolsProps { }
interface IList { }

const List: React.FunctionComponent<IList> = () => {
  const client = useAlgolia();
  const paginationClasses = {
    root: "mb-12",          //The root element of the widget.
    noRefinementRoot: "",   //The root element when there are no refinements.
    list: "flex gap-4",     //The list element.
    item: "",               //Each item element.
    firstPageItem: "",      //The first page element.
    previousPageItem: "",   //The previous page element.
    pageItem: "",           //Each page element.
    selectedItem: "font-bold", //The selected page element.
    disabledItem: "",       //Each disabled page element.
    nextPageItem: "",       //The next page element.
    lastPageItem: "",       //The last page element.
    link: "",               //The link of each items
  };

  const refinementClasses = {
    root: "", //The root element of the widget.
    noRefinementRoot: "", //The root element when there are no refinements.
    searchBox: "", //The search box element.
    noResults: "", //The root element of the widget when there are no results.
    list: "", //The list element.
    item: "", //Each item element.
    selectedItem: "", //Each selected item element.
    label: "flex gap-2 items-center w-full justify-start text-sm py-1", //The label of each item.
    checkbox: "", //The checkbox of each item.
    labelText: "", //The text element of each label.
    count:
      "hidden lg:inline-flex text-xs justify-center items-center p-0 px-1 rounded bg-white text-black opacity-60", //The count of each item.
    showMore: "", //The "Show more" button.
    disabledShowMore: "", //The disabled "Show more" button.
  };
  const searchParams = useSearchParams()
  const tax = searchParams.get('tax')
  const term = searchParams.get('term')
  const filter = tax ? `${tax}:'${term}'` : ""
  console.log(tax, term, filter)

  return (
    <InstantSearch searchClient={client} indexName="post">
      <Configure
        hitsPerPage={48}
        {...(filter ? { filters: filter } : {})}
      />
      <div className="lg:grid grid-cols-10 gap-12">
        <div className="col-span-8">
          {/* Main */}
          <SearchBox
            placeholder="search"
            classNames={{
              root: "pb-4", //The root element of the widget.
              form: "", //The form element.
              input:
                "bg-transparent border border-white w-full text-white px-2", //The input element.
              submit: "", //The submit button.
              reset: "", //The reset button.
              loadingIndicator: "", //The loading indicator element.
              submitIcon: "", //The submit icon.
              resetIcon: "", //The reset icon.
              loadingIcon: "", //The loading icon.
            }}
          />
          <div className="flex justify-between">
            <Pagination classNames={paginationClasses} />
            <div className="text-black">
              <SortBy
                items={[
                  { label: "Date (desc)", value: "post_date_desc" },
                  { label: "Date (asc)", value: "post_date_asc" },
                  { label: "Title (asc)", value: "post_title_asc" },
                  { label: "Title (desc)", value: "post_title_desc" },
                  { label: "Time Period (asc)", value: "post_timePeriod_asc" },
                  { label: "Time Period (desc)", value: "post_timePeriod_desc" },
                ]}
                classNames={{
                  root: 'MyCustomSortBy',
                  select: 'MyCustomSortBySelect MyCustomSortBySelect--subclass',
                }}
              />
            </div>
            <div className="flex gap-4">
              {term && (
                <p>{term}</p>
              )}
              <CurrentRefinements
                classNames={{
                  root: 'MyCustomCurrentRefinements',
                  list: 'MyCustomCurrentRefinementsList MyCustomCurrentRefinementsList--subclass',
                }}
              />
              <Stats />
            </div>
          </div>
          <Hits
            hitComponent={SymbolCard}
            classNames={{
              item: "col-span-1",
              list: "grid grid-cols-3 lg:grid-cols-4 w-full gap-12 mb-12",
            }}
          />
          <Pagination classNames={paginationClasses} />
        </div>
        {/* Sidebar */}
        <div className="py-12 lg:py-0 col-span-2 grid grid-cols-3 gap-2 lg:block">
          <div className="mb-8">
            <h2 className="font-bold mb-2">Time Period</h2>
            <RefinementList
              attribute="timePeriod"
              limit={15}
              showMoreLimit={16}
              classNames={refinementClasses}
              sortBy={["name:asc"]}
            />
          </div>

          <div className="mb-8">
            <h2 className="font-bold mb-2">Quadrant</h2>
            <RefinementList
              attribute="quadrant"
              limit={15}
              showMoreLimit={16}
              classNames={refinementClasses}
              sortBy={["name:asc"]}
            />
          </div>

          <div className="mb-8">
            <h2 className="font-bold mb-2">Universe</h2>
            <RefinementList
              attribute="universes"
              limit={15}
              classNames={refinementClasses}
              sortBy={["name:asc"]}
            />
          </div>

          <div className="mb-8">
            <h2 className="font-bold mb-2">Affiliation</h2>
            <RefinementList
              attribute="affiliations"
              limit={50}
              classNames={refinementClasses}
              sortBy={["name:asc"]}
            />
          </div>

          <div className="mb-8">
            <h2 className="font-bold mb-2">Type</h2>
            <RefinementList
              attribute="types"
              limit={1000}
              classNames={refinementClasses}
              sortBy={["name:asc"]}
            />
          </div>
          <div className="mb-8">
            <h2 className="font-bold mb-2">Franchise</h2>
            <RefinementList
              attribute="franchise"
              limit={1000}
              classNames={refinementClasses}
              sortBy={["name:asc"]}
            />
          </div>
          <div className="mb-8">
            <h2 className="font-bold mb-2">Designer</h2>
            <RefinementList
              attribute="designers"
              limit={1000}
              classNames={refinementClasses}
              sortBy={["name:asc"]}
            />
          </div>
        </div>
      </div>
    </InstantSearch>
  );
}

export const SymbolList: React.FunctionComponent<ISymbolsProps> = (
  props
) => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <List />
    </React.Suspense>
  )
};



export default SymbolList;
