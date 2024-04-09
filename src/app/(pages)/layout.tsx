import { Inter, Barlow } from "next/font/google";
import SpaceTravel from "./SpaceTravel";
import "./globals.css";
import Header from "../components/Header";
import Container from "../components/Container";
import type { Viewport } from 'next'
import Footer from "../components/Footer";
import { client } from "@/sanity/lib/client";
import type { Metadata, ResolvingMetadata } from 'next'


 
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
}

const barlow = Barlow({ subsets: ["latin"], weight: ["400", "500", "600"] });

const query = `*[_type == "settings"]{
  ...,
  siteTitle,
  "siteLogo": {
    "src": siteLogo.asset->url,
    "alt": siteTitle,
    "width": siteLogo.asset->metadata.dimensions.width,
    "height": siteLogo.asset->metadata.dimensions.height,
  }
}[0]`;

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const settings = await client.fetch(query);
 
  return {
    title: settings.siteTitle,
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let settings;
  try {
    settings = await client.fetch(query);
    console.log("settings",settings);
  } catch (error) {
    console.error("Failed to fetch settings:", error);
  }
  return (
    <html lang="en">
      <body className={`${barlow.className} text-white bg-black`}>
        <SpaceTravel />
        <Header settings={settings}/>
        <div className="relative z-10">
          <Container>{children}</Container>
        </div>
        <Footer />
      </body>
    </html>
  );
}
