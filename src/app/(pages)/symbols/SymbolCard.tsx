import Link from "next/link";
import * as React from "react";
import { motion } from "framer-motion";

interface ISymbolCardProps {
  hit: any;
}

const SymbolCard: React.FunctionComponent<ISymbolCardProps> = ({ hit }) => {
  return (
    <Link href={hit.link}>
      <motion.span
        initial={{opacity: 0, scale: 0.9}}
        whileInView={{opacity: 1, scale: 1}}
        viewport={{ once: true }}
        key={hit.slug}
        transition={{ duration: 0.75, delay: 0.4 }}
        
        className="block w-full h-auto"
      >
        <article>
          <header className="text-center">
            {hit.featuredImage ? (
              <img
                src={hit.featuredImage.src}
                alt={hit.title}
                width={300}
                height={300}
                className="block w-full h-auto"
              />
            ) : null}
            <h1>{hit.title}</h1>
          </header>
        </article>
      </motion.span>
    </Link>
  );
};

export default SymbolCard;
