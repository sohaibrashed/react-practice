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
    getOrder: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
      }),
    }),
    updateOrder: builder.mutation({
      query: ({ data, id }) => ({
        url: `${ORDERS_URL}/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Order"],
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: `${ORDERS_URL}/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Order"],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetOrdersQuery,
  useGetOrderQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = ordersApi;
