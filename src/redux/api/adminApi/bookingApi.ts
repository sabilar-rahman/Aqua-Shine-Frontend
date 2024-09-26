import { baseApi } from "../../api/baseApi";

const bookingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBookings: builder.query({
      query: () => ({
        url: "/bookings",
        method: "GET",
      }),

    }),
    createABooking: builder.mutation({
      query: (data) => ({
        url: "/bookings",
        method: "POST",
        body: data,
      }),
    }),
    getABookingById: builder.query({
      query: (id: string) => ({
        url: `/bookings/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateABookingMutation,
  useGetABookingByIdQuery,
  useGetAllBookingsQuery,
} = bookingsApi;