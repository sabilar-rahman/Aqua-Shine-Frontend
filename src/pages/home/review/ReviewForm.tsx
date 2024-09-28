import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

import { toast } from "sonner";
import { useCreateReviewMutation } from "@/redux/api/UserApi/reviewApi";
import { TReview } from "@/types";
// import { TReview } from "./ReviewPanel";

const ReviewForm = () => {
  const { handleSubmit, reset, register } = useForm<TReview>();
  const [rating, setRating] = useState<number>(0);
  const [createReview, refetch] = useCreateReviewMutation();

  const onSubmit: SubmitHandler<TReview> = async (data) => {
    console.log("Review Data:", { ...data, rating });
    reset();
    setRating(0);
    try {
      console.log("Submitting review data:", { ...data, rating });
      await createReview({ ...data, rating }).unwrap();

      toast.success("Review submitted successfully!");
    //   Swal.fire({
    //     title: "Success",
    //     text: "Review submitted successfully!",
    //     icon: "success",
    //   });
      refetch;

    } catch (err) {

        toast.warning("Something went wrong. Please try again.")


    //   console.error("Error submitting review:", err);
    //   const errorMessage =
    //     err?.message || "An error occurred while submitting the review.";

    //   Swal.fire({
    //     title: "Error",
    //     text: errorMessage,
    //     icon: "error",
    //   });
    }
  };

  return (
    <div className="flex items-center justify-center max-w-screen md:my-8">
      <div className="w-full max-w-xl p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 text-primary">
          Leave a Review
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex justify-center mb-4">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                onClick={() => setRating(index + 1)}
                xmlns="http://www.w3.org/2000/svg"
                fill={index < rating ? "#14a0d1" : "none"}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke={index < rating ? "#14a0d1" : "currentColor"}
                className="w-8 h-8 cursor-pointer transition duration-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.414 4.36a1 1 0 00.95.69h4.602c.969 0 1.371 1.24.588 1.81l-3.72 2.702a1 1 0 00-.364 1.118l1.415 4.36c.3.922-.755 1.688-1.538 1.117l-3.72-2.702a1 1 0 00-1.175 0l-3.72 2.702c-.783.57-1.838-.195-1.538-1.117l1.415-4.36a1 1 0 00-.364-1.118L2.497 9.787c-.783-.57-.38-1.81.588-1.81h4.602a1 1 0 00.95-.69l1.414-4.36z"
                />
              </svg>
            ))}
          </div>

          <div>
            <label
              htmlFor="review"
              className=" text-xl font-medium text-primary"
            >
              Your Review
            </label>
            <textarea
              id="review"
              {...register("review", { required: true })}
              placeholder="Write your review here..."
              rows={4}
              className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary text-white font-semibold rounded-md hover:bg-hover transition duration-300"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;