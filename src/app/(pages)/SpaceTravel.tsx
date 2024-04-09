"use client";
import * as React from "react";
import Script from "next/script";

interface ISpaceTravelProps {}

const SpaceTravel: React.FunctionComponent<ISpaceTravelProps> = (props) => {
  return (
    <>
      {/* <Script src="https://unpkg.com/space-travel?module" /> */}
      <canvas
        id="space-travel"
        className="fixed w-screen h-screen top-0 left-0 z-0"
      ></canvas>
      <Script
        id="space-travel-script"
        dangerouslySetInnerHTML={{
          __html: `
        const SpaceTravel = import("https://unpkg.com/space-travel?module").then(st => console.log(new st.default({ canvas: document.getElementById("space-travel") }).start()));
        `,
        }}
      ></Script>
    </>
  );
};

export default SpaceTravel;
