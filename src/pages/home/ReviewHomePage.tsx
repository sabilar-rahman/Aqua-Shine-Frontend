import { useNavigate, useLocation } from "react-router-dom";


import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hook";
import { useGetAllReviewsQuery } from "@/redux/api/UserApi/reviewApi";
import { TReview } from "./review/Review";
import { useCurrentUser } from "@/redux/api/auth/authSlice";

const ReviewHomepage = () => {
  const { data: response, isLoading } = useGetAllReviewsQuery(undefined);
  const user = useAppSelector(useCurrentUser)

  const navigate = useNavigate();
  const location = useLocation();
  const [showOverlay, setShowOverlay] = useState(false);

  // Check if user is logged in, otherwise show the overlay
  useEffect(() => {
    if (!user) {
      setShowOverlay(true);
    } else {
      setShowOverlay(false);
    }
  }, [user]);

  const handleLoginClick = () => {
    navigate("/login", { state: { from: location } });
  };

  const reviews: TReview[] = response?.data || [];

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

  if (!reviews || reviews.length === 0) {
    return <p>No reviews available at the moment.</p>;
  }

  const overallRating = (
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
  ).toFixed(1);

  // Convert overall rating to an integer to handle the star display
  const fullStars = Math.floor(parseFloat(overallRating));
  const hasHalfStar = parseFloat(overallRating) - fullStars >= 0.5;

  return (
    <div className="relative lg:py-24 md:py-16 max-w-7xl mx-auto">
      {/* Black overlay for non-logged-in users */}
      {showOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg text-center">
            <p className="text-xl font-bold text-gray-800 mb-4">
              Please log in to view reviews
            </p>
            <button
              onClick={handleLoginClick}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
            >
              Login
            </button>
          </div>
        </div>
      )}

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
        {reviews.map((review: TReview, index: number) => (
          <div
            key={index}
            className="p-6 bg-white shadow-lg rounded-lg border border-gray-200 flex flex-col md:flex-row items-start space-x-4 hover:shadow-xl transition-shadow duration-300 ease-in-out"
          >
            <div className="flex-shrink-0">
              <div className="avatar">
                <div className="w-24 h-24 rounded-full border-4 border-primary overflow-hidden">
                  <img
                    src={review.user.image}
                    alt={`${review.user.name}'s avatar`}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0 md:ml-4 flex-1">
              <div className="flex items-center justify-between">
                <div className="text-xl font-bold text-primary">
                  {review.user.name}
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
    </div>
  );
};

export default ReviewHomepage;