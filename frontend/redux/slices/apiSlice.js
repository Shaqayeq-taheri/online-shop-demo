import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../src/constants";

// fetchBaseQuery a function that we make query to backend api

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ["Product", "User", "Order"], // to define the data we are fetching from api
    endpoints: (builder) => ({}),
});
