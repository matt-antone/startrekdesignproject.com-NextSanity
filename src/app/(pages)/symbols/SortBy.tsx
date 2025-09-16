'use client'

import React from 'react';
import {
  useSortBy,
  UseSortByProps,
} from 'react-instantsearch';
import clsx from 'clsx'

// export function SortBy(props: UseSortByProps) {
//   const { currentRefinement, options, refine } = useSortBy(props);

//   return (
//     <select
//       onChange={(event) => refine(event.target.value)}
//       value={currentRefinement}
//       className="bg-transparent border border-white w-full text-white px-4"
//     >
//       {options.map((option) => (
//         <option key={option.value} value={option.value}>
//           {option.label}
//         </option>
//       ))}
//     </select>
//   );
// }




import { useState } from 'react'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpDownIcon } from '@heroicons/react/16/solid'
import { CheckIcon } from '@heroicons/react/20/solid'

const people = [
  { id: 1, name: 'Wade Cooper' },
  { id: 2, name: 'Arlene Mccoy' },
  { id: 3, name: 'Devon Webb' },
  { id: 4, name: 'Tom Cook' },
  { id: 5, name: 'Tanya Fox' },
  { id: 6, name: 'Hellen Schmidt' },
  { id: 7, name: 'Caroline Schultz' },
  { id: 8, name: 'Mason Heaney' },
  { id: 9, name: 'Claudie Smitham' },
  { id: 10, name: 'Emil Schaefer' },
]

export function SortBy(props: UseSortByProps) {
  console.log(props);
  const { currentRefinement, options, refine } = useSortBy(props);
  console.log({ currentRefinement, options, refine })
  const selectedOption = options.find((option) => option.value === currentRefinement) || options[0]
  return (
    <div className="relative flex-1">
      <Listbox value={selectedOption} onChange={(opt: { label: string; value: string }) => refine(opt.value)}>
        {/* <Label className="block text-sm/6 font-medium text-gray-900 dark:text-white">Assigned to</Label> */}
        <div className="relative w-full">
          <ListboxButton className={clsx(
            'relative block w-full rounded-3xl border border-white/80 bg-black/70 py-1.5 pr-8 pl-3 text-left text-sm/6 text-white',
            'outline-2 outline-white data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white data-focus:border-red-500'
          )}>
            {selectedOption?.value === "post" ? "Date (desc)" : selectedOption?.label}
            <ChevronDownIcon
              className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
              aria-hidden="true"
            />
          </ListboxButton>

          <ListboxOptions
            transition
            className={clsx(
              'mt-4 w-full rounded-3xl border border-white/80 bg-black/70 p-1 [--anchor-gap:--spacing(1)] focus:outline-none',
              'transition duration-100 ease-in data-leave:data-closed:opacity-0',
              'absolute top-full'
            )}>
            {options.map((option) => (
              <ListboxOption
                key={option.value}
                value={option}
                className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-white/10"
              >
                {<CheckIcon aria-hidden={selectedOption?.value === option.value} className={clsx(
                  selectedOption?.value === option.value ? "visible" : "invisible",
                  "size-4 fill-white group-data-selected:visible",
                )} />}
                <div className="text-sm/6 text-white">{option.label}</div>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
      {/* <select
        onChange={(event) => refine(event.target.value)}
        value={currentRefinement}
        className="bg-transparent border border-white w-full text-white px-4"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select> */}
    </div>

  )
}
