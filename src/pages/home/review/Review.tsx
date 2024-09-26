import { Link } from "react-router-dom";

// import { TReview } from "../../types";
import ReviewForm from "./ReviewForm";
import { TUser } from "@/types";
import { useGetAllReviewsQuery } from "@/redux/api/UserApi/reviewApi";


export type TReview = {
  review: string;
  rating: number;
  createdAt: string;
  user: TUser;
};

const ReviewSection = () => {
  const { data: response, isLoading } = useGetAllReviewsQuery(undefined);

  const reviews: TReview[] = response?.data || [];
  console.log("review data", reviews);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <span className="loading loading-ring loading-xs"></span>
        <span className="loading loading-ring loading-sm"></span>
        <span className="loading loading-ring loading-md"></span>
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return <p>No reviews available at the moment.</p>;
  }

  // Calculate overall site's rating (average rating)
  const overallRating = (
    reviews.reduce(
      (sum, review) => sum + parseFloat(review.rating.toString()),
      0
    ) / reviews.length
  ).toFixed(1);

  // Select the last two reviews
  const lastTwoReviews = reviews.slice(-2);

  // Convert overall rating to an integer to handle the star display
  const fullStars = Math.floor(parseFloat(overallRating));
  const hasHalfStar = parseFloat(overallRating) - fullStars >= 0.5;

  return (
    <div className="max-w-7xl mx-auto">
      <ReviewForm />
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 text-primary mt-8">
        User Reviews
      </h2>

      <div className="text-center mb-6 flex justify-center items-center md:gap-4">
        <h3 className="text-xl md:text-2xl font-semibold text-hover">
          Overall Site Rating:
        </h3>
        <div className="flex justify-center items-center mt-2">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 ${
                i < fullStars
                  ? "text-yellow-500"
                  : hasHalfStar && i === fullStars
                  ? "text-yellow-500"
                  : "text-gray-300"
              }`}
              fill={
                i < fullStars || (hasHalfStar && i === fullStars)
                  ? "currentColor"
                  : "none"
              }
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {i < fullStars || (hasHalfStar && i === fullStars) ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21l1.09-6.86L2 9.27l6.91-1.01L12 2z"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 17.77L5.82 21l1.09-6.86L2 9.27l6.91-1.01L12 2v15.77z"
                />
              )}
            </svg>
          ))}
          <span className="ml-2 text-xl font-semibold text-gray-700">
            {overallRating}/5
          </span>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {lastTwoReviews.map((review, index: number) => (
          <div
            key={index}
            className="p-6 bg-white shadow-lg rounded-lg border border-gray-200 flex flex-col md:flex-row items-start space-x-4 hover:shadow-xl transition-shadow duration-300 ease-in-out"
          >
            <div className="flex-shrink-0">
              <div className="avatar">
                <div className="w-24 h-24 rounded-full border-4 border-primary overflow-hidden">
                  <img
                    src={review.user?.image || ""}
                    alt={`${review.user?.name || "User"}'s avatar`}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0 md:ml-4 flex-1">
              <div className="flex items-center justify-between">
                <div className="text-xl font-bold text-primary">
                  {review.user?.name || "Anonymous"}
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div className="mt-2 flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 ${
                      i < review.rating ? "text-yellow-500" : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957h4.146c.969 0 1.371 1.24.588 1.81l-3.353 2.435 1.287 3.956c.299.921-.755 1.688-1.54 1.115L10 13.348l-3.355 2.353c-.785.573-1.839-.194-1.54-1.115l1.287-3.956-3.353-2.435c-.783-.57-.381-1.81.588-1.81h4.146L9.05 2.927z" />
                  </svg>
                ))}
              </div>
              <p className="mt-4 text-gray-700 leading-relaxed">
                {review.review}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center my-5">
        <Link to="/review">
          <button className="text-xl font-bold text-white bg-primary px-3 lg:px-9 py-2 lg:py-4 hover:bg-hover rounded-md">
            See All Reviews
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ReviewSection;