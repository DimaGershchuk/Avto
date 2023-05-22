import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { buildUrl } from "../../utils/common";
import { BASE_URL } from "../../utils/constants";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: ({ id }) => `/auto/${id}`,
      providesTags: ["Product"],
    }),
     getProducts: builder.query({
       query: (params) => buildUrl("/auto", params),
       providesTags: ["Products"],
     }),
  }),
});

export const { useGetProductQuery, useGetProductsQuery } = apiSlice;
