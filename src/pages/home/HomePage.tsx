import Hero from "./Hero";

import FeaturedService from "./FeaturedService";
import PageTitle from "../shared/PageTitleHelmet/PageTitle";
import ReviewForm from "./review/ReviewForm";
import ReviewHomePage from "./review/ReviewHomePage";

const HomePage = () => {
  return (
    <div>
      <PageTitle title="Home Page | Turbo Shine"></PageTitle>

      <Hero />
      <div>
        <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold py-8">
          Featured Services
          <hr className="w-20 mt-2 border-[3px] mx-auto border-[#02c39a] " />
        </h1>
        <FeaturedService />
      </div>

      <div className="container  mx-auto py-8 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          <ReviewForm />
        <ReviewHomePage />
        </div>
        
      </div>
    </div>
  );
};

export default HomePage;
