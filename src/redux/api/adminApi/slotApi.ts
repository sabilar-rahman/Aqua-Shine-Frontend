import { baseApi } from "../../api/baseApi";
import { TSlot } from "../../../types";

const slotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Mutation for creating a new slot
    createASlot: builder.mutation<TSlot, Partial<TSlot>>({
      query: (data) => ({
        url: "/services/slots",
        method: "POST",
        body: data,
      }),
      // Invalidate the 'Slots' tag to trigger a refetch of slot data
      invalidatesTags: ["Slots"],
    }),

    // Query for fetching all slots
    getSlots: builder.query<TSlot[], void>({
      query: () => ({
        url: "/slots",
        method: "GET",
      }),
      // Provide the 'Slots' tag for this query
      providesTags: ["Slots"],
    }),

    // Mutation for updating a slot's status
    updateSlotStatus: builder.mutation<TSlot, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `/slots/${id}`,
        method: "PUT",
        body: { status }, // Only update the status field
      }),
      // Invalidate the 'Slots' tag to refetch slot data after update
      invalidatesTags: ["Slots"],
    }),
  }),
});

export const {
  useGetSlotsQuery,
  useUpdateSlotStatusMutation, // Use this for status update
  useCreateASlotMutation,
} = slotApi;

export default slotApi;