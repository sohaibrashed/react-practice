import { PRODUCTS_URL } from "@/constants";
import { apiSlice } from "./apiSlice";

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL + "/",
        // params: { keyword, pageNumber },
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Product"],
    }),
    getProduct: builder.query({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}`,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetProductsQuery, useGetProductQuery } = productsApi;
