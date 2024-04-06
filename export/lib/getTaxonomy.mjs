import { type } from "os";

const findTaxonomy = (list, term) => {
  const taxonomy = list.find((tp) => {
    return typeof tp?.title === "string" && tp.title === term;
  });
  return taxonomy?._id || null;
};

export const getTaxonomy = (post, key, list, target) => {
  const term = post.attributes.hasOwnProperty("taxonomy")
    ? post.attributes.taxonomy[key]
    : null;
  if (typeof term === "string") {
    console.log("term string", term);
    const taxonomy = findTaxonomy(list, term);
    return taxonomy ? { _ref: taxonomy, _type: "reference" } : null;
  } else if (Array.isArray(term) && term.length > 0) {
    console.log("term array", term);
    const taxonomies = term.map((t) => {
      const taxonomy = findTaxonomy(list, t);
      return taxonomy ? { _ref: taxonomy, _type: target } : null;
    });
    return taxonomies;
  }
  return null;
};
