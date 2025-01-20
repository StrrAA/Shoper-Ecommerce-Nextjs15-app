import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getOrdersByUserId = async (userId: string) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const GET_ORDERS_BY_USER_ID_QUERY = defineQuery(`
            *[_type == "order" && clerkUserId == $userId] | order(name desc) {
                ...,
                products[]{
                    ...,
                    product->
                }
            }
        `);
  try {
    const orders = await sanityFetch({
      query: GET_ORDERS_BY_USER_ID_QUERY,
      params: { userId },
    });
    return orders.data || [];
  } catch (error) {
    console.log("Error while fetching orders: ", error);
    throw new Error("Error while fetching orders by user ID");
  }
};
