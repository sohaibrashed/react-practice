import { ORDERS_URL } from "@/constants";
import { apiSlice } from "./apiSlice";

const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL + "/",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Order"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetOrdersQuery } = ordersApi;
