import { useCurrentUser } from "@/redux/api/auth/authSlice";
import { useCreateBookingMutation } from "@/redux/api/UserApi/bookingslotApi";
import { useAppSelector } from "@/redux/hook";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

const Booking = () => {
  const location = useLocation();

  const [createBooking] = useCreateBookingMutation();
  const { selectedSlot, service } = location.state || {};

  const user = useAppSelector((state) => state.auth?.user);
  // const user = useAppSelector(useCurrentUser);

  const { name, email, address, phone } = user || {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: name || "",
      email: email || "",
      address: address || "",
      phone: phone || "",
      vehicleType: "car",
      vehicleBrand: "Bugatti",
      vehicleModel: "Chiron",
      manufacturingYear: 2021,
      registrationPlate: "BUG123",
    },
  });
  // @ts-expect-error: Ignoring type error due to mismatch in expected types from external library
  const onSubmit = async (data) => {
    try {
      const bookingPayload = {
        customer: {
          name: data.userName,
          email: data.email,
          phone: data.phone,
          address: data.address,
        },
        serviceId: service.data._id,
        slotId: selectedSlot._id,
        vehicleType: data.vehicleType,
        vehicleBrand: data.vehicleBrand,
        vehicleModel: data.vehicleModel,
        manufacturingYear: data.manufacturingYear,
        registrationPlate: data.registrationPlate,
        selectedSlot,
      };

      const bookingResult = await createBooking(bookingPayload).unwrap();
      if (bookingResult.success) {
        window.location.href = bookingResult.data.paymentUrl;
      }
    } catch (error) {
      console.error("Booking or Payment Error:", error);
    }
  };

  if (!selectedSlot || !service) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-[#2A9D8F]">
          Please go back to the services page &
          <br /> select a service and time slot
          to proceed with your booking.
        </h1>

        <p className="text-xl mt-4"></p>
      </div>
    );
  }

  const { name: serviceName, img, description, price } = service.data;
  const { startTime, endTime } = selectedSlot;

  return (
    <div className=" container mx-auto">
      {/* <h1 className="text-xl md:text-4xl text-primary font-bold text-center">
        See your booking here
      </h1> */}
      {service.data && selectedSlot ? (
        <div className="  grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6  ">
            <h2 className="text-3xl font-semibold text-primary mb-4">
              {serviceName}
            </h2>
            <img
              src={img}
              alt={serviceName}
              className="rounded-lg shadow-md mb-4"
            />
            <p className="text-lg text-gray-700 mb-4">{description}</p>
            <p className="text-xl text-gray-900 font-semibold">
              Price: {price}$
            </p>
            <p className="text-lg text-gray-700">
              Selected Slot Time: {startTime} - {endTime}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-primary text-center my-4">
              Booking Details
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div>
                <label
                  htmlFor="userName"
                  className="block text-sm font-medium text-gray-700"
                >
                  User Name
                </label>
                <input
                  id="userName"
                  type="text"
                  {...register("userName", {
                    required: "User name is required",
                  })}
                  placeholder="Enter your name"
                  defaultValue={name}
                  className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.userName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.userName.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  placeholder="Enter your email"
                  defaultValue={email}
                  className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="number"
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                  placeholder="Enter your phone number"
                  defaultValue={phone}
                  className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <input
                  id="address"
                  type="text"
                  {...register("address", { required: "Address is required" })}
                  placeholder="Enter your address"
                  defaultValue={address}
                  className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="vehicleType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Vehicle Type
                </label>
                <input
                  id="vehicleType"
                  type="text"
                  {...register("vehicleType", {
                    required: "Vehicle type is required",
                  })}
                  placeholder="Enter your vehicle type"
                  className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.vehicleType && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.vehicleType.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="vehicleBrand"
                  className="block text-sm font-medium text-gray-700"
                >
                  Vehicle Brand
                </label>
                <input
                  id="vehicleBrand"
                  type="text"
                  {...register("vehicleBrand", {
                    required: "Vehicle brand is required",
                  })}
                  placeholder="Enter your vehicle brand"
                  className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.vehicleBrand && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.vehicleBrand.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="vehicleModel"
                  className="block text-sm font-medium text-gray-700"
                >
                  Vehicle Model
                </label>
                <input
                  id="vehicleModel"
                  type="text"
                  {...register("vehicleModel", {
                    required: "Vehicle model is required",
                  })}
                  placeholder="Enter your vehicle model"
                  className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.vehicleModel && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.vehicleModel.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="manufacturingYear"
                  className="block text-sm font-medium text-gray-700"
                >
                  Manufacturing Year
                </label>
                <input
                  id="manufacturingYear"
                  type="number"
                  {...register("manufacturingYear", {
                    required: "Manufacturing year is required",
                  })}
                  placeholder="Enter the manufacturing year"
                  className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.manufacturingYear && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.manufacturingYear.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="registrationPlate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Registration Plate
                </label>
                <input
                  id="registrationPlate"
                  type="text"
                  {...register("registrationPlate", {
                    required: "Registration plate is required",
                  })}
                  placeholder="Enter your registration plate"
                  className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.registrationPlate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.registrationPlate.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="selectedTime"
                  className="block text-sm font-medium text-gray-700"
                >
                  Selected Time
                </label>
                <input
                  id="selectedTime"
                  type="text"
                  value={`${startTime} - ${endTime}`}
                  readOnly
                  className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm bg-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary text-white font-semibold rounded-md hover:bg-hover transition duration-300"
              >
                Pay Now
              </button>
            </form>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-4xl">
            No selected slot from any service.
            <br />
            Go to service page and book a service
          </h1>
        </>
      )}
    </div>
  );
};

export default Booking;
