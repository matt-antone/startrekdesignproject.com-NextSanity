import Link from "next/link";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ISymbolCardProps {
  hit: any;
}

const SymbolCard: React.FunctionComponent<ISymbolCardProps> = (props) => {
  const { hit } = props;
  return (
    <Link href={"/symbols/" + hit.slug}>
      <AnimatePresence>
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          viewport={{ once: true }}
          key={hit.slug}
          transition={{ duration: 0.75, delay: 0.04 * (hit.__position % 48) }}
          className="flex w-full h-auto opacity-0"
        >
          <article>
            <header className="text-center">
              {hit.featuredImage ? (
                <img
                  src={hit.featuredImage.asset.url}
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
      </AnimatePresence>
    </Link>
  );
};

export default SymbolCard;
