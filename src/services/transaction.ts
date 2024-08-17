import BaseResponse from "@/types/response";
import { Checkout, Product } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

interface CheckoutResponse extends BaseResponse {
  data: Checkout;
}

interface CheckoutsResponse extends BaseResponse {
  data: {
    id: String;
    userId: String;
    productId: String;
    qty: Number;
    pricePerItem: Number;
    createdAt: Date;
    updatedAt: Date;
    product: Product;
  };
}

interface CheckoutPayload {
  product_id: string;
  qty: number;
}
export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/transaction",
  }),
  tagTypes: ["checkout"],
  endpoints: (builder) => ({
    checkout: builder.mutation<CheckoutResponse, CheckoutPayload>({
      query: (body) => ({
        url: "/checkout",
        method: "POST",
        body,
      }),
      invalidatesTags: ["checkout"],
    }),
    checkouts: builder.query<CheckoutResponse, void>({
      query: () => ({
        url: "/checkout",
      }),
      providesTags: ["checkout"],
    }),
  }),
});

export const { useCheckoutMutation, useCheckoutsQuery } = transactionApi;
