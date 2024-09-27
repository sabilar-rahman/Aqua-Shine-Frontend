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
      <div className="flex space-x-2  text-lg">
        <span>{days}d</span>
        <span>{hours}h</span>
        <span>{minutes}m</span>
        <span>{seconds}s</span>
      </div>
    );
  };

  return (


    // <div className="p-6 bg-white rounded-lg shadow-md">
    //   {upcomingBookings.length > 0 && (
    //     <h2 className="text-xl md:text-3xl font-semibold text-primary text-center mb-6">
    //       Upcoming Bookings page
    //     </h2>
    //   )}

    //   {upcomingBookings.length === 0 && (
    //     <h1 className="text-2xl text-center text-red-500 font-bold mb-6">
    //       There are no upcoming bookings.
    //     </h1>
    //   )}

    //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //     {upcomingBookings.map((booking: Booking) => {
    //       const countdownDate = new Date(
    //         `${booking.slot.date}T${booking.slot.startTime}`
    //       ).getTime();

    //       return (
    //         <div
    //           key={booking._id}
    //           className="bg-gray-100 p-4 rounded-lg shadow-md"
    //         >
    //           <h3 className="text-xl md:text-3xl text-primary font-semibold mb-2">
    //             {booking.service.name}
    //           </h3>
    //           <p className="text-xl font-bold">
    //             Date: {new Date(booking.slot.date).toLocaleDateString()}{" "}
    //           </p>
    //           <p className="text-xl font-semibold">
    //             Time Slot: {booking.slot.startTime} - {booking.slot.endTime}
    //           </p>
    //           <p className="font-semibold">
    //             Vehicle: {booking.vehicleBrand} {booking.vehicleModel} (
    //             {booking.vehicleType})
    //           </p>
    //           <div className="mt-4">
    //             <p className="font-semibold">Countdown:</p>
    //             <Countdown date={countdownDate} renderer={renderer} />
    //           </div>
    //         </div>
    //       );
    //     })}
    //   </div>
    // </div>


//     <div className="p-6 bg-white rounded-lg shadow-lg lg:p-8">
//   {upcomingBookings.length > 0 && (
//     <h2 className="text-2xl md:text-4xl font-bold text-center text-primary mb-8">
//       Upcoming Bookings
//     </h2>
//   )}

//   {upcomingBookings.length === 0 && (
//     <h1 className="text-2xl md:text-3xl text-center text-red-500 font-bold mb-8">
//       There are no upcoming bookings.
//     </h1>
//   )}

//   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//     {upcomingBookings.map((booking: Booking) => {
//       const countdownDate = new Date(
//         `${booking.slot.date}T${booking.slot.startTime}`
//       ).getTime();

//       return (
//         <div
//           key={booking._id}
//           className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
//         >
//           <h3 className="text-xl md:text-2xl text-primary font-bold mb-3">
//             {booking.service.name}
//           </h3>
//           <p className="text-lg md:text-xl font-semibold text-gray-700 mb-1">
//             Date:{" "}
//             <span className="text-gray-900">
//               {new Date(booking.slot.date).toLocaleDateString()}
//             </span>
//           </p>
//           <p className="text-lg md:text-xl font-semibold text-gray-700 mb-2">
//             Time Slot:{" "}
//             <span className="text-gray-900">
//               {booking.slot.startTime} - {booking.slot.endTime}
//             </span>
//           </p>
//           <p className="text-lg font-semibold text-gray-600 mb-4">
//             Vehicle:{" "}
//             <span className="text-gray-900">
//               {booking.vehicleBrand} {booking.vehicleModel} (
//               {booking.vehicleType})
//             </span>
//           </p>
//           <div className="mt-6">
//             <p className="font-semibold text-gray-800">Countdown:</p>
//             <Countdown date={countdownDate} renderer={renderer} />
//           </div>
//         </div>
//       );
//     })}
//   </div>
// </div>

<div className="  p-6 bg-white rounded-lg shadow-lg lg:p-8">
  {upcomingBookings.length > 0 && (
    <h2 className="text-2xl md:text-4xl font-bold text-center text-primary mb-8">
      Upcoming Bookings
    </h2>
  )}

  {upcomingBookings.length === 0 && (
    <h1 className="text-2xl md:text-3xl text-center text-red-500 font-bold mb-8">
      There are no upcoming bookings.
    </h1>
  )}

  {/* Cards stacked one after another */}
  {/* <div className="space-y-4">
    {upcomingBookings.map((booking: Booking) => {
      const countdownDate = new Date(
        `${booking.slot.date}T${booking.slot.startTime}`
      ).getTime();

      return (

        <div
          key={booking._id}
          className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          <h3 className="text-xl md:text-2xl text-primary font-bold mb-3">
            {booking.service.name}
          </h3>
          <p className="text-lg md:text-xl font-semibold text-gray-700 mb-1">
            Date:{" "}
            <span className="text-gray-900">
              {new Date(booking.slot.date).toLocaleDateString()}
            </span>
          </p>
          <p className="text-lg md:text-xl font-semibold text-gray-700 mb-2">
            Time Slot:{" "}
            <span className="text-gray-900">
              {booking.slot.startTime} - {booking.slot.endTime}
            </span>
          </p>
          <p className="text-lg font-semibold text-gray-600 mb-4">
            Vehicle:{" "}
            <span className="text-gray-900">
              {booking.vehicleBrand} {booking.vehicleModel} (
              {booking.vehicleType})
            </span>
          </p>
          <div className="mt-6">
            <p className="font-semibold text-[#32a0a0]">Countdown:
           
            <Countdown date={countdownDate} renderer={renderer} />
           </p>
          </div>
        </div>
      );
    })}
  </div> */}

<div className="space-y-6">
  {upcomingBookings.map((booking: Booking) => {
    const countdownDate = new Date(
      `${booking.slot.date}T${booking.slot.startTime}`
    ).getTime();

    return (
      <div
        key={booking._id}
        className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out border border-gray-200"
      >
        <h3 className="text-2xl md:text-3xl text-primary font-bold mb-4">
          {booking.service.name}
        </h3>
        <p className="text-lg md:text-xl font-semibold text-gray-700 mb-2">
          Date:{" "}
          <span className="text-gray-900">
            {new Date(booking.slot.date).toLocaleDateString()}
          </span>
        </p>
        <p className="text-lg md:text-xl font-semibold text-gray-700 mb-3">
          Time Slot:{" "}
          <span className="text-gray-900">
            {booking.slot.startTime} - {booking.slot.endTime}
          </span>
        </p>
        <p className="text-lg font-semibold text-gray-600 mb-5">
          Vehicle Type:{" "}
          <span className="text-gray-900">
            {booking.vehicleBrand} {booking.vehicleModel} (
            {booking.vehicleType})
          </span>
        </p>
        <div className="mt-6">
          <p className="font-semibold text-[#32a0a0] flex items-center">
            Countdown Time:
            <span className="ml-2 px-4 py-1 bg-[#32a0a0] text-white rounded-full shadow-md">
              <Countdown date={countdownDate} renderer={renderer} />
            </span>
          </p>
        </div>
      </div>
    );
  })}
</div>



</div>


  );
};

export default UpcomingBookings;
