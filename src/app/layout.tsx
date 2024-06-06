import { Inter, Barlow } from "next/font/google";
import SpaceTravel from "@/src/app/(pages)//SpaceTravel";
import "./globals.css";
import Header from "@/src/app/components/Header";
import Container from "@/src/app/components/Container";
import type { Viewport } from 'next'
import Footer from "@/src/app/components/Footer";
import { client } from "@/sanity/lib/client";
import type { Metadata, ResolvingMetadata } from 'next'
import { GoogleTagManager } from '@next/third-parties/google'
import { GoogleAnalytics } from '@next/third-parties/google'


 
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

export async function generateMetadata(
  { params, searchParams }: any,
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
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID || ""} />
      </body>
    </html>
  );
}
