import * as React from "react";
import Container from "./Container";
import Link from "next/link";
import PortableText from "@/src/app/components/PortableText";

interface IHeaderProps {
  settings: {
    siteTitle: string;
    siteLogo: {
      src: string;
      alt: string;
      width: number;
      height: number;
    };
  };
}

const Header: React.FunctionComponent<IHeaderProps> = async ({settings}) => {
  return (
    <div className="py-8 text-white relative z-10">
      <Container>
        <div className="flex justify-between items-center">
          <div>
            <Link href="/">
              {settings?.siteLogo ? (
                <img
                  src={settings.siteLogo.src}
                  alt={settings.siteLogo.alt}
                  width={settings.siteLogo.width}
                  height={settings.siteLogo.height}
                />
              ) : (
                "Home"
              )}
            </Link>
          </div>
          <div>
            <Link href="/symbols">Symbols</Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
