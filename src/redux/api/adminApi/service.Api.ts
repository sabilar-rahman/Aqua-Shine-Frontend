// import { baseApi } from "../../api/baseApi";

import { baseApi } from "../baseApi";

const serviceApi = baseApi.injectEndpoints({
  endpoints: (buildre) => ({
    getAllServices: buildre.query({
      query: () => ({
        url: "/services",
        method: "GET",
      }),
      transformResponse: (response) => {
        return response.data;
      },
    }),
    createAService: buildre.mutation({
      query: (data) => ({
        url: "/services",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllServicesQuery, useCreateAServiceMutation } = serviceApi;