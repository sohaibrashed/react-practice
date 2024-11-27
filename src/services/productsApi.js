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
  }),
  overrideExisting: false,
});

export const { useGetProductsQuery } = productsApi;
