/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllReviewsQuery } from "@/redux/api/UserApi/reviewApi";

import LoaderSpinner from "../shared/loadingPage/LoadingSpinner";
import { TReview } from "@/types";
import PageTitle from "../shared/PageTitleHelmet/PageTitle";




 export const formatDate = (dateString: any) => {
    const options = { year: "numeric", month: "long", day: "numeric" }; // You can customize the format
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

const AllReviewPage = () => {

  const { data, isLoading } = useGetAllReviewsQuery(undefined);

  // Ensure data is defined and has reviews
  const reviews: TReview[] = data?.data || [];

  if (isLoading) {
    return <LoaderSpinner />;
  }

  return (

    
    <div className="container mx-auto">

<PageTitle title="Review | Turbo Shine" />
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <figure
              key={review._id}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4 text-yellow-300">
                {[...Array(review.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 sm:w-6 sm:h-6 me-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                ))}
              </div>
              <blockquote>
                <p className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                  "{review.review}"
                </p>
              </blockquote>
              <figcaption className="flex items-center mt-6 space-x-3 rtl:space-x-reverse">
                <img
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                  src={review.user.img}
                  alt={`${review.user.name}'s profile`}
                />
                <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-300 dark:divide-gray-700">
                  <cite className="pe-3 font-medium text-xs lg:text-sm text-gray-900 dark:text-white">
                    {review.user.name}
                  </cite>
                  <cite className="ps-3 text-xs lg:text-sm text-gray-500 dark:text-gray-400">
                    {review.user.email}
                  </cite>
                  <cite className="ps-3 text-xs lg:text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(review.createdAt)}
                  </cite>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllReviewPage;
