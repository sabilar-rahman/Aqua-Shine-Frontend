import { baseApi } from "../baseApi";


export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query({
      query: () => ({
        url: "/review",
        method: "GET",
      }),
       providesTags: ["reviews"],
    }),

    createReview: builder.mutation({
      query: (reviewData) => ({
        url: "/review",
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: ["reviews"],
    }),
  }),
});

export const { useGetAllReviewsQuery, useCreateReviewMutation } = reviewApi;