import { getSymbols } from "./getSymbols.mjs";
import { buildIndex } from "./buildIndex.mjs";

(async function () {
  const symbols = await getSymbols();
  await buildIndex("posts", symbols);
})();