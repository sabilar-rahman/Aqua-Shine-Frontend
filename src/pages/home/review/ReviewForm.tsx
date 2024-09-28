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

    // <div className="flex items-center justify-center max-w-screen md:my-8">
    //   <div className="w-full max-w-xl p-8 bg-white rounded-lg shadow-lg">
    //     <h2 className="text-2xl  font-bold text-center mb-6 text-primary">
    //       Leave a Review
    //     </h2>

    //     <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
    //       <div className="flex justify-center mb-4">
    //         {[...Array(5)].map((_, index) => (
    //           <svg
    //             key={index}
    //             onClick={() => setRating(index + 1)}
    //             xmlns="http://www.w3.org/2000/svg"
    //             fill={index < rating ? "#14a0d1" : "none"}
    //             viewBox="0 0 24 24"
    //             strokeWidth={1.5}
    //             stroke={index < rating ? "#14a0d1" : "currentColor"}
    //             className="w-8 h-8 cursor-pointer transition duration-300"
    //           >
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.414 4.36a1 1 0 00.95.69h4.602c.969 0 1.371 1.24.588 1.81l-3.72 2.702a1 1 0 00-.364 1.118l1.415 4.36c.3.922-.755 1.688-1.538 1.117l-3.72-2.702a1 1 0 00-1.175 0l-3.72 2.702c-.783.57-1.838-.195-1.538-1.117l1.415-4.36a1 1 0 00-.364-1.118L2.497 9.787c-.783-.57-.38-1.81.588-1.81h4.602a1 1 0 00.95-.69l1.414-4.36z"
    //             />
    //           </svg>
    //         ))}
    //       </div>

    //       <div>
    //         <label
    //           htmlFor="review"
    //           className="  font-medium text-primary"
    //         >
    //           Your Review
    //         </label>
    //         <textarea
    //           id="review"
    //           {...register("review", { required: true })}
    //           placeholder="Write your review here..."
    //           rows={4}
    //           className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 resize-none"
    //         />
    //       </div>

    //       <button
    //         type="submit"
    //         className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
    //       >
    //         Submit Review
    //       </button>
    //     </form>
    //   </div>
    // </div>

    <div className="flex items-center justify-center max-w-screen py-2">
  <div className="w-full max-w-lg bg-white dark:bg-gray-800 ">
    <h2 className="text-3xl font-bold text-center text-primary mb-2">
      Leave a Review
    </h2>

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Star Rating Section */}
      <div className="flex justify-center mb-6">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            onClick={() => setRating(index + 1)}
            xmlns="http://www.w3.org/2000/svg"
            fill={index < rating ? "#14a0d1" : "none"}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke={index < rating ? "#14a0d1" : "currentColor"}
            className="w-10 h-10 cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-110"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.414 4.36a1 1 0 00.95.69h4.602c.969 0 1.371 1.24.588 1.81l-3.72 2.702a1 1 0 00-.364 1.118l1.415 4.36c.3.922-.755 1.688-1.538 1.117l-3.72-2.702a1 1 0 00-1.175 0l-3.72 2.702c-.783.57-1.838-.195-1.538-1.117l1.415-4.36a1 1 0 00-.364-1.118L2.497 9.787c-.783-.57-.38-1.81.588-1.81h4.602a1 1 0 00.95-.69l1.414-4.36z"
            />
          </svg>
        ))}
      </div>

      {/* Text Area for Review */}
      <div>
        <label
          htmlFor="review"
          className="block text-lg font-medium text-primary mb-2"
        >
          Your Review
        </label>
        <textarea
          id="review"
          {...register("review", { required: true })}
          placeholder="Write your review here..."
          rows={5}
          className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
  <button
    type="submit"
    className="btn rounded-lg text-lg font-semibold bg-[#2A9D8F] text-gray-50 hover:bg-[#0f685f] hover:font-bold transition duration-300 ease-in-out"
  >
    Submit Review
  </button>
</div>
    </form>
  </div>
</div>

  );
};

export default ReviewForm;