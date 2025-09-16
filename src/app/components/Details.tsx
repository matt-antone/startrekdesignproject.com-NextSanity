import * as React from 'react';

interface IDetialsProps {
  children: React.ReactNode;
  title: string;
}

const Detials: React.FunctionComponent<IDetialsProps> = (props) => {
  return (
    <>
      <style jsx>{`
        details > summary {
          list-style: none;
        }

        details > summary::marker,
        :is(details > ::-webkit-details-marker) {
          display: none;
        }

        details[open] > summary::before {
          transform: rotate(90deg);
        }
        details > summary::before {
          content: '▶'; /* Or a custom icon */
          font-size: 0.85rem;
          display: inline-block;
          transition: transform 0.2s ease-in-out;
          margin-right: 0.5rem;
        }
        details > div { 
            display: grid;
            grid-template-rows: 0fr;
            overflow: hidden;
            transition: grid-template-rows 0.3s ease-out;
        }
        details[open] > div {
            grid-template-rows: 1fr;
        }
  `}</style>
      <details className="bg-pink-700 p-1 rounded-3xl">
        <summary className="text-white px-2 py-1">{props.title}</summary>
        <div className="px-2">
          {props.children}
        </div>
      </details>
    </>
  );
};

export default Detials;
