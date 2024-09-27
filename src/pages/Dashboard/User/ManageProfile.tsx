import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
// import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { TUser } from "../../../types";
// import { useUpdateUserInfoMutation } from "../../../redux/features/admin/user.api";
// Import the updateUserInfo action
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useUpdateUserInfoMutation } from "@/redux/api/adminApi/userApi";
import { updateUserInfo } from "@/redux/api/auth/authSlice";
import { toast } from "sonner";

const ManageProfile = () => {
  const user = useAppSelector((state) => state.auth.user) as TUser;
  const dispatch = useAppDispatch();
  const [updateUserInfoMutation, { isLoading, isError }] =
    useUpdateUserInfoMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TUser>({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
      img: user?.img || "",
    },
  });

  // Pre-fill the form with current user data when the component mounts
  useEffect(() => {
    reset({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
      img: user?.img || "",
    });
  }, [user, reset]);

  const onSubmit: SubmitHandler<TUser> = async (data: object) => {
    if (!user?.sub) {
      // Handle the case where userId is not available.
      toast.error("Failed to update profile");


   
      return;
    }

    try {
      // @ts-expect-error: Ignoring type error due to mismatch in expected types from external library
      await updateUserInfoMutation({ userId: user.sub, data }).unwrap();

      // Dispatch action to update the user information in the Redux store
      dispatch(updateUserInfo(data));
      toast.success("Profile updated successfully");



  
    } catch (error) {
     toast.error("Failed to update profile");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-center text-primary mb-6">
        Manage Profile
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name", { required: "Name is required" })}
            className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
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
            className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm"
            readOnly
          />
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone
          </label>
          <input
            id="phone"
            type="text"
            {...register("phone", { required: "Phone number is required" })}
            className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>

        {/* Address */}
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
            className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm"
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}
        </div>

        {/* Profile Image */}
        <div>
          <label
            htmlFor="img"
            className="block text-sm font-medium text-gray-700"
          >
            Profile Image URL
          </label>
          <input
            id="img"
            type="text"
            {...register("img")}
            className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-primary text-white font-semibold rounded-md hover:bg-hover transition duration-300"
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Profile"}
        </button>

        {isError && (
          <p className="text-red-500 text-center mt-4">
            Failed to update profile. Please try again.
          </p>
        )}
      </form>
    </div>
  );
};

export default ManageProfile;