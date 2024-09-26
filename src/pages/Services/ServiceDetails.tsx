import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  useGetAServiceByIdQuery,
  useGetAvailabilityByDateAndServiceIdQuery,
} from "@/redux/api/adminApi/service.Api";
import { TSlot } from "@/types";

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: service,
    isLoading: serviceLoading,
    error: serviceError,
  } = useGetAServiceByIdQuery(id as string);

  const today = new Date().toLocaleDateString("en-CA");

  const {
    data: slotData,
    isLoading: slotLoading,
    error: slotError,
  } = useGetAvailabilityByDateAndServiceIdQuery({
    date: today,

    serviceId: id as string,
  });

  const [selectedSlot, setSelectedSlot] = useState<TSlot | null>(null);

  useEffect(() => {
    if (serviceError) {
      console.error("Error fetching service:", serviceError);
    }
    if (slotError) {
      console.error("Error fetching slots:", slotError);
    }
  }, [serviceError, slotError]);

  if (serviceLoading || slotLoading) {
    return (
      <div className="flex items-center justify-center">
        <span className="loading loading-ring loading-xs"></span>
        <span className="loading loading-ring loading-sm"></span>
        <span className="loading loading-ring loading-md"></span>
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }
  // @ts-expect-error: Ignoring type error due to mismatch in expected types from external library
  if (serviceError || !service || !service?.data) {
    return (
      <p className="text-center text-red-500">
        Service not available at the moment.
      </p>
    );
  }

  const handleSlotClick = (slot: TSlot) => {
    setSelectedSlot(slot);
  };

  const handleBooking = () => {
    if (selectedSlot) {
      navigate("/booking", { state: { selectedSlot, service } });
    }
  };
  // @ts-expect-error: Ignoring type error due to mismatch in expected types from external library
  const { name, price, image, duration, description } = service.data;

  return (
    <div className="max-w-5xl mx-auto py-12 md:py-24">
      <div className="hero bg-base-200 p-6 rounded-lg shadow-lg mx-4">
        <div className="hero-content flex flex-col md:flex-row md:space-x-8">
          <img
            src={image}
            alt={name}
            className="w-full md:w-1/2 rounded-lg shadow-2xl object-cover"
          />
          <div className="mt-6 md:mt-0">
            <h1 className="text-4xl font-bold text-primary mb-4">{name}</h1>
            <p className="text-lg text-gray-700 my-3">{description}</p>
            <p className="text-xl font-semibold text-gray-900">
              Price: ${price}
            </p>
            <span className="text-gray-500 text-xl">
              Duration: {duration} mins
            </span>
          </div>
        </div>
      </div>

      <div className="mt-12 mx-4">
        {slotError || !slotData || slotData.length === 0 ? (
          <p className="text-center text-gray-500">
            No availability data for today.
          </p>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              Available Slots for {today}
            </h2>
            <ul className="space-y-3 grid grid-cols-2 md:grid-cols-3  gap-4">
              {slotData.data.map((slot: TSlot, index: number) => (
                <li
                  key={index}
                  className={`p-4 border rounded-md text-center hover:bg-hover hover:text-white ${
                    slot.isBooked === "available"
                      ? selectedSlot === slot
                        ? "border-primary bg-primary text-white"
                        : "border-green-500 cursor-pointer"
                      : "border-red-500 cursor-not-allowed text-red-500"
                  }`}
                  onClick={() =>
                    slot.isBooked === "available" && handleSlotClick(slot)
                  }
                >
                  <div className="text-xl font-semibold">
                    {slot.startTime} - {slot.endTime}
                  </div>
                </li>
              ))}
            </ul>

            {selectedSlot && (
              <div className="mt-6 flex justify-center">
                <button
                  className="btn bg-primary text-white hover:bg-hover"
                  onClick={handleBooking}
                >
                  Book This Service
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceDetail;
