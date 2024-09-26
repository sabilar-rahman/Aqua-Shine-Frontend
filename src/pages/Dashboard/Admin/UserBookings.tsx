
import { useGetAllBookingsQuery } from "@/redux/api/adminApi/bookingApi";
import { TBooking } from "../../../types";

const UserBookings = () => {
  const { data: response, isLoading } = useGetAllBookingsQuery(undefined);
  const bookings: TBooking[] = response?.data || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center lg:py-32">
        <span className="loading loading-ring loading-xs"></span>
        <span className="loading loading-ring loading-sm"></span>
        <span className="loading loading-ring loading-md"></span>
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return <p>No bookings available at the moment.</p>;
  }

  return (
    <div className="overflow-x-auto bg-base-200">
      <h1 className="text-xl md:text-3xl font-lora font-bold text-primary text-center">
        {" "}
        User bookings
      </h1>
      <div className="m-5 md:mt-7 bg-white rounded-xl h-full md:py-8">
        <table className="table w-full ">
          {/* Table Header */}
          <thead>
            <tr className="text-xl">
              <th>Customer Info</th>
              <th>Customer Email</th>
              <th>Service Name</th>
              <th>Payment Status</th>
              <th>Registration Plate</th>
              <th>Transaction ID</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.tran_id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={
                            // @ts-expect-error: Ignoring type error due to mismatch in expected types from external library
                            booking.customer?.img ||
                            "https://via.placeholder.com/150"
                          }
                          alt="Customer Avatar"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">
                        {
                          // @ts-expect-error: Ignoring type error due to mismatch in expected types from external library
                          booking.customer?.name
                        }
                      </div>
                      <div className="text-sm opacity-50">
                        {
                          // @ts-expect-error: Ignoring type error due to mismatch in expected types from external library
                          booking.customer?.address
                        }
                      </div>
                    </div>
                  </div>
                </td>
                <td className="text-[17px] font-semibold">
                  {
                    // @ts-expect-error: Ignoring type error due to mismatch in expected types from external library
                    booking.customer?.email
                  }
                </td>
                <td className="text-[17px] font-semibold">
                  {
                    // @ts-expect-error: Ignoring type error due to mismatch in expected types from external library
                    booking.service?.name as string
                  }
                </td>
                <td
                  className={`${
                    booking.paymentStatus === "Paid"
                      ? "text-green-500"
                      : "text-red-500"
                  } font-semibold`}
                >
                  {booking.paymentStatus}
                </td>
                <td className="text-[17px] font-semibold">
                  {booking.registrationPlate}
                </td>
                <td className="text-[17px] font-semibold">{booking.tran_id}</td>
              </tr>
            ))}
          </tbody>
          {/* Table Footer */}
        </table>
      </div>
    </div>
  );
};

export default UserBookings;