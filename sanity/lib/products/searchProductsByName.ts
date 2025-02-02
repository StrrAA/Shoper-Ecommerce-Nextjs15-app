import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const searchProductsByName = async (searchParam: string) => {
  const PRODUCT_SEARCH_QUERY = defineQuery(`
        * [_type == "product" && (name match $searchParam || slug.current match $searchParam)] | order(name asc)
        `);
  try {
    const products = await sanityFetch({
      query: PRODUCT_SEARCH_QUERY,
      params: {
        searchParam: `${searchParam}*`, // Append wildcard for partial match
      },
    });
    return products.data || [];
  } catch (error) {
    console.error("Error while fetching products by name:", error);
    return [];
  }
};
