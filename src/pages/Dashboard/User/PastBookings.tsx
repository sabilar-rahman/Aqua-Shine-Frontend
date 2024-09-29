// import LoaderSpinner from "@/pages/shared/loadingPage/LoadingSpinner";

// import { useGetAllbookingsByEmailQuery } from "@/redux/api/UserApi/bookingslotApi";
// import { useAppSelector } from "@/redux/hook";
// import { TUser } from "@/types";
// import { useEffect, useState } from "react";

// interface TBooking {
//   _id: string;
//   service: {
//     name: string;
//   };
//   slot: {
//     date: string;
//     startTime: string;
//     endTime: string;
//   };
//   vehicleBrand: string;
//   vehicleModel: string;
//   vehicleType: string;
//   paymentStatus: string;
// }

// const PastBookings = () => {
//   const userEmail = useAppSelector((state) => (state.auth.user as TUser)?.email); // Retrieve email from auth state

//   // Type the API query response properly
//   const { data, isLoading } = useGetAllbookingsByEmailQuery(
//     userEmail as string
//   );

//   // Set the state with the correct type
//   const [pastBookings, setPastBookings] = useState<TBooking[]>([]);

//   useEffect(() => {
//     if (data && data.data) {
//       const bookings = data.data as TBooking[]; // Type assertion if necessary
//       const currentDate = new Date();
//       const filteredBookings = bookings.filter((booking) => {
//         const bookingDate = new Date(booking.slot.date);
//         return bookingDate < currentDate;
//       });
//       setPastBookings(filteredBookings);
//     }
//   }, [data]);

//   if (isLoading) {
//     return <LoaderSpinner />;
//   }

//   // if (!pastBookings || pastBookings.length === 0) {
//   //   return <div>No past bookings found.</div>;
//   // }

//   console.log(pastBookings);

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-xl md:text-3xl text-primary font-semibold text-center mb-6">
//         Past Bookings
//       </h2>
//       <table className="min-w-full bg-white border">
//         <thead>
//           <tr className="border-b">
//             <th className="py-2 px-4 text-left">Service</th>
//             <th className="py-2 px-4 text-left">Date</th>
//             <th className="py-2 px-4 text-left">Slot Time</th>
//             <th className="py-2 px-4 text-left">Vehicle</th>
//             <th className="py-2 px-4 text-left">Payment Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {pastBookings.map((booking) => (
//             <tr key={booking._id} className="border-b">
//               <td className="py-2 px-4">{booking.service.name}</td>
//               <td className="py-2 px-4">
//                 {new Date(booking.slot.date).toLocaleDateString()}
//               </td>
//               <td className="py-2 px-4">
//                 {booking.slot.startTime} - {booking.slot.endTime}
//               </td>
//               <td className="py-2 px-4">
//                 {booking.vehicleBrand} {booking.vehicleModel} (
//                 {booking.vehicleType})
//               </td>
//               <td className="py-2 px-4 text-green-500">
//                 {booking.paymentStatus}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default PastBookings;

import LoaderSpinner from "@/pages/shared/loadingPage/LoadingSpinner";
import { useGetAllbookingsByEmailQuery } from "@/redux/api/UserApi/bookingslotApi";
import { useAppSelector } from "@/redux/hook";
import { TUser } from "@/types";
import { useEffect, useState } from "react";

interface TBooking {
  _id: string;
  createdAt: Date;
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
  paymentStatus: string;
}

const PastBookings = () => {
  const userEmail = useAppSelector(
    (state) => (state.auth.user as TUser)?.email
  );
  // console.log("User Email:", userEmail); // Log user email

  const { data, isLoading, isError } = useGetAllbookingsByEmailQuery(
    userEmail as string
  );
  console.log("API Response:", data); // Log API response

  const [pastBookings, setPastBookings] = useState<TBooking[]>([]);

  useEffect(() => {
    if (data && data.data) {
      const bookings = data.data as TBooking[];
      const currentDate = new Date();
      const filteredBookings = bookings.filter((booking) => {
        const bookingDate = new Date(booking.slot.date);
        return bookingDate < currentDate;
      });
      setPastBookings(filteredBookings);
    }
  }, [data]);

  if (isLoading) {
    return <LoaderSpinner />;
  }

  if (isError) {
    return <div>Error fetching bookings.</div>;
  }

  // if (pastBookings) {
  //   return <div className="text-center">No past bookings found.</div>;
  // }

  // Test rendering userEmail
  // console.log("User Email in Render:", userEmail); // Log during render

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl md:text-3xl text-primary font-semibold text-center mb-6">
        Past Bookings
      </h2>
      <div className="mb-4">User Email: {userEmail}</div>{" "}
      {/* Debug email display */}
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="border-b">
            <th className="py-2 px-4 text-left">Service</th>
            <th className="py-2 px-4 text-left">Date</th>
            <th className="py-2 px-4 text-left">Slot Time</th>
            <th className="py-2 px-4 text-left">Vehicle</th>
            <th className="py-2 px-4 text-left">Payment Status</th>
            <th className="py-2 px-4 text-left">User Email</th>
          </tr>
        </thead>
        <tbody>
          {pastBookings.map((booking) => (
            <tr key={booking._id} className="border-b">
              <td className="py-2 px-4">{booking?.service.name}</td>
              <td className="py-2 px-4">
                {/* {new Date(booking.slot.date).toLocaleDateString()}*/}
                {new Date(booking.createdAt).toLocaleString()}
              </td>
              <td className="py-2 px-4">
                {booking.slot.startTime} - {booking.slot.endTime}
              </td>
              <td className="py-2 px-4">
                {booking.vehicleBrand} {booking.vehicleModel} (
                {booking.vehicleType})
              </td>
              {/* <td className="py-2 px-4 text-green-500">
                {booking.paymentStatus}
              </td> */}
              <td
                className={`py-2 px-4 ${
                  booking.paymentStatus === "Pending"
                    ? "text-red-500 "
                    : "text-green-500"
                }`}
              >
                {booking.paymentStatus}
              </td>

              <td className="py-2 px-4">
                {" "}
                {userEmail}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PastBookings;
