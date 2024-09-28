import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";

import { TService, TSlot } from "../../../types";
import { useCreateASlotMutation } from "@/redux/api/adminApi/slotApi";
import { useGetAllServicesQuery } from "@/redux/api/adminApi/service.Api";
import { toast, Toaster } from "sonner";
import LoaderSpinner from "@/pages/shared/loadingPage/LoadingSpinner";

const CreateSlot = () => {
  const { data: servicesData, isLoading: servicesLoading } =
    useGetAllServicesQuery();
  const [createSlot] = useCreateASlotMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TSlot>(); // Specify the type of form data

  const onSubmit: SubmitHandler<TSlot> = async (formData) => {
    console.log(formData);
    try {
      await createSlot(formData).unwrap();
      toast.info("Slot created successfully");

      // Swal.fire("Success", "Slot created successfully", "success");

      reset();
    } catch (error) {
      toast.error("Failed to create Slot")

      // Swal.fire("Error", "Failed to create slot", "error");
    }
  };

  if (servicesLoading) {
    return <LoaderSpinner/>
  }

  // Directly use the data as TService[]
  // @ts-expect-error: Ignoring type error due to mismatch in expected types from external library
  const services: TService[] = servicesData?.data || [];
  return (
    <div className="container mx-auto p-4 max-w-xl">

      <h2 className="text-xl md:text-3xl text-primary font-bold mb-4 text-center">
        Create Slot
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        {/* Service Selection */}
        <div className="form-group">
          <label htmlFor="service">Select Service</label>
          <select
            {...register("service", { required: "Service is required" })}
            className="input input-bordered w-full"
          >
            <option value="">Select a service</option>
            {services?.map((service: TService) => (
              <option key={service._id} value={service._id}>
                {service.name}
              </option>
            ))}
          </select>
          {errors.service && (
            <p className="text-red-500">{errors.service.message}</p>
          )}
        </div>

        {/* Date Field */}
        <div className="form-group mt-2">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            {...register("date", { required: "Date is required" })}
            className="input input-bordered w-full"
          />
          {errors.date && <p className="text-red-500">{errors.date.message}</p>}
        </div>

        {/* Start Time */}
        <div className="form-group mt-2">
          <label htmlFor="startTime">Start Time</label>
          <input
            type="time"
            {...register("startTime", { required: "Start time is required" })}
            className="input input-bordered w-full"
          />
          {errors.startTime && (
            <p className="text-red-500">{errors.startTime.message}</p>
          )}
        </div>

        {/* End Time */}
        <div className="form-group mt-2">
          <label htmlFor="endTime">End Time</label>
          <input
            type="time"
            {...register("endTime", { required: "End time is required" })}
            className="input input-bordered w-full"
          />
          {errors.endTime && (
            <p className="text-red-500">{errors.endTime.message}</p>
          )}
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="btn bg-red-700 hover:bg-red-500 text-white hover:text-white"
          >
            Create Slot
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSlot;
