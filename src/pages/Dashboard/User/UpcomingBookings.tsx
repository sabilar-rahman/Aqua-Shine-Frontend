/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Countdown from "react-countdown";
import { useAppSelector } from "@/redux/hook";
import { useGetAllbookingsByEmailQuery } from "@/redux/api/UserApi/bookingslotApi";
import LoaderSpinner from "@/pages/shared/loadingPage/LoadingSpinner";

interface Booking {
  _id: string;
  service: {
    name: string;
  };
  slot: {
    date: string;
    startTime: string;
    endTime: string;
  };
  vehicleBrand: string;
  vehicleModel: string;
  vehicleType: string;
}

const UpcomingBookings = () => {
  const userEmail = useAppSelector((state) => state.auth.user?.email);
  const { data, error, isLoading } = useGetAllbookingsByEmailQuery(
    userEmail as string
  );
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);

  // Filter upcoming bookings
  useEffect(() => {
    if (data?.data) {
      const currentDate = new Date();
      const filteredBookings = data.data.filter((booking: Booking) => {
        const bookingDate = new Date(
          `${booking.slot.date}T${booking.slot.startTime}`
        );
        return bookingDate > currentDate; // Only show future bookings
      });
      setUpcomingBookings(filteredBookings);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch upcoming bookings.",
      });
    }
  }, [error]);

  if (isLoading) {
    return <LoaderSpinner />;
  }

  // Handle case when data is undefined or empty
  if (!data || !data.data) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl text-center text-red-500 font-bold mb-6">
          Failed to fetch upcoming bookings.
        </h1>
      </div>
    );
  }

  const renderer = ({ days, hours, minutes, seconds }: any) => {
    return (
      <div className="flex justify-around text-lg">
        <span>{days}d</span>
        <span>{hours}h</span>
        <span>{minutes}m</span>
        <span>{seconds}s</span>
      </div>
    );
  };

  return (


    <div className="p-6 bg-white rounded-lg shadow-md">
      {upcomingBookings.length > 0 && (
        <h2 className="text-xl md:text-3xl font-semibold text-primary text-center mb-6">
          Upcoming Bookings page
        </h2>
      )}

      {upcomingBookings.length === 0 && (
        <h1 className="text-2xl text-center text-red-500 font-bold mb-6">
          There are no upcoming bookings.
        </h1>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcomingBookings.map((booking: Booking) => {
          const countdownDate = new Date(
            `${booking.slot.date}T${booking.slot.startTime}`
          ).getTime();

          return (
            <div
              key={booking._id}
              className="bg-gray-100 p-4 rounded-lg shadow-md"
            >
              <h3 className="text-xl md:text-3xl text-primary font-semibold mb-2">
                {booking.service.name}
              </h3>
              <p className="text-xl font-bold">
                Date: {new Date(booking.slot.date).toLocaleDateString()}{" "}
              </p>
              <p className="text-xl font-semibold">
                Time Slot: {booking.slot.startTime} - {booking.slot.endTime}
              </p>
              <p className="font-semibold">
                Vehicle: {booking.vehicleBrand} {booking.vehicleModel} (
                {booking.vehicleType})
              </p>
              <div className="mt-4">
                <p className="font-semibold">Countdown:</p>
                <Countdown date={countdownDate} renderer={renderer} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpcomingBookings;
