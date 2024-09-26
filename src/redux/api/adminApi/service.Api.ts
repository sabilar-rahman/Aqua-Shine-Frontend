/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../baseApi";

// Define types for service data
interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface AvailabilityParams {
  date: string;
  serviceId: string;
}

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Query for fetching all services
    getAllServices: builder.query<Service[], void>({
      query: () => ({
        url: "/services",
        method: "GET",
      }),
      // Provide the 'Services' tag so that the query can be invalidated
      providesTags: ["Services"],
    }),

    // Mutation for creating a new service
    createAService: builder.mutation<Service, Partial<Service>>({
      query: (data) => ({
        url: "/services",
        method: "POST",
        body: data,
      }),
      // Invalidate 'Services' tag to refetch service data after creation
      invalidatesTags: ["Services"],
    }),

    // Query for fetching a service by ID
    getAServiceById: builder.query<Service, string>({
      query: (id: string) => ({
        url: `/services/${id}`,
        method: "GET",
      }),
      // Optionally provide the 'Services' tag to ensure freshness
      providesTags: ["Services"],
    }),

    // Query for fetching availability by date and service ID
    getAvailabilityByDateAndServiceId: builder.query<any, AvailabilityParams>({
      query: ({ date, serviceId }) => ({
        url: `/slots/availability`,
        method: "GET",
        params: { date, serviceId },
      }),
    }),

    // Mutation for updating a service
    updateService: builder.mutation<
      Service,
      { id: string; data: Partial<Service> }
    >({
      query: ({ id, data }) => ({
        url: `/services/${id}`,
        method: "PUT",
        body: data,
      }),
      // Invalidate 'Services' tag to refetch service data after update
      invalidatesTags: ["Services"],
    }),

    // Mutation for deleting a service
    deleteService: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `/services/${id}`,
        method: "DELETE",
      }),
      // Invalidate 'Services' tag to remove the deleted service from the UI
      invalidatesTags: ["Services"],
    }),
  }),
});

export const {
  useGetAllServicesQuery,
  useCreateAServiceMutation,
  useGetAServiceByIdQuery,
  useGetAvailabilityByDateAndServiceIdQuery,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
} = serviceApi;

export default serviceApi;
