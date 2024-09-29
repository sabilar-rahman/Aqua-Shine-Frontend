import { baseApi } from "../../api/baseApi";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllbookings: builder.query({
      query: () => ({
        url: "/bookings",
        method: "GET",
      }),
      // providesTags: ["reviews"],
    }),


    getAllbookingsByEmail: builder.query({
      query: (email: string) => ({
        url: `/bookings/${email}`, // Pass email as a query parameter
        method: "GET",
      }),
      //  providesTags: ["bookings"], //  for caching
    }),



    createBooking: builder.mutation({
      query: (slotData) => ({
        url: "/bookings",
        method: "POST",
        body: slotData,
      }),
      // invalidatesTags: ["slot"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetAllbookingsQuery,
  useGetAllbookingsByEmailQuery,
} = bookingApi;