import  { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import PageTitle from "../shared/PageTitleHelmet/PageTitle";


const AboutUs = () => {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <PageTitle title="About Us | Turbo Shine" />

      {/* Company Overview */}
      <section className="mb-16" data-aos="fade-up">
        <div className="py-12 px-8" data-aos="fade-right">
          <h1 className="text-4xl font-bold mb-4 text-[#02c39a]">
            Company Overview
          </h1>
          <p className="text-lg leading-relaxed text-justify">
            Founded in 2024, <span className="text-[#02c39a]">Turbo Shine</span>
            is dedicated to providing the ultimate car washing experience. Our mission
            is to offer high-quality, eco-friendly, and time-efficient car wash
            services that keep your vehicle looking brand new. From basic wash
            to premium detailing, we ensure top-notch care with the best products
            and technology. We aim to redefine car washing with a focus on
            convenience, customer satisfaction, and environmental responsibility.
          </p>
        </div>
      </section>

      {/* Team Introduction */}
      <section className="mb-16" data-aos="fade-up">
        <h1 className="text-4xl font-bold mb-8 text-center">Meet Our Team</h1>
        <div className="flex flex-wrap justify-center gap-8">
          <div
            className="w-full sm:w-1/2 md:w-1/4 p-4 text-center"
            data-aos="fade-up"
          >
            <img
              src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="Sarah Lee"
              className="w-40 h-40 rounded-full mx-auto mb-4 shadow-lg"
            />
            <h2 className="text-2xl font-semibold mb-2">Sarah Lee</h2>
            <h3 className="text-lg font-medium text-gray-600">
              CEO & Founder
            </h3>
            <p className="text-gray-800 mt-2">
              Sarah founded Turbo Shine with a passion for cars and customer
              service, aiming to bring top-tier car care services to all vehicle
              owners.
            </p>
          </div>

          <div
            className="w-full sm:w-1/2 md:w-1/4 p-4 text-center"
            data-aos="fade-up"
          >
            <img
              src="https://media.istockphoto.com/id/1410538853/photo/young-man-in-the-public-park.webp?b=1&s=170667a&w=0&k=20&c=pGdjFVdK-_BhTa6PMy5VNcXdbxVNngzg-OPzMfJKrG8="
              alt="John Doe"
              className="w-40 h-40 rounded-full mx-auto mb-4 shadow-lg"
            />
            <h2 className="text-2xl font-semibold mb-2">John Doe</h2>
            <h3 className="text-lg font-medium text-gray-600">
              Operations Manager
            </h3>
            <p className="text-gray-800 mt-2">
              John ensures that the daily operations of Turbo Shine run
              smoothly, focusing on efficiency and quality in every car wash.
            </p>
          </div>

          <div
            className="w-full sm:w-1/2 md:w-1/4 p-4 text-center"
            data-aos="fade-up"
          >
            <img
              src="https://images.unsplash.com/photo-1648415041078-d5b259c683be?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Emily White"
              className="w-40 h-40 rounded-full mx-auto mb-4 shadow-lg"
            />
            <h2 className="text-2xl font-semibold mb-2">Emily White</h2>
            <h3 className="text-lg font-medium text-gray-600">
              Head of Marketing
            </h3>
            <p className="text-gray-800 mt-2">
              Emily drives our marketing strategy, connecting with customers
              and ensuring Turbo Shine's brand reflects its quality and
              commitment to customer satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="mb-16" data-aos="fade-up">
        <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-12 px-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-8 text-center">
            What Our Customers Say
          </h1>
          <div className="flex flex-col items-center space-y-6">
            <blockquote className="border-l-4 border-gray-300 pl-4 text-left max-w-lg">
              <p className="text-xl italic">
                "Turbo Shine is simply the best. My car has never looked so
                clean and shiny. Their eco-friendly methods are a big bonus!"
              </p>
              <footer className="mt-2 text-gray-300">- Alex Green</footer>
            </blockquote>
            <blockquote className="border-l-4 border-gray-300 pl-4 text-left max-w-lg">
              <p className="text-xl italic">
                "I was impressed by the professionalism of the team. Turbo Shine
                delivers high-quality service and customer care every time."
              </p>
              <footer className="mt-2 text-gray-300">- Jane Smith</footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section data-aos="fade-up">
        <div className="bg-gradient-to-r from-green-400 to-green-600 text-white py-12 px-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
          <p className="text-lg leading-relaxed mb-6 text-center">
            Have questions? Reach out to Turbo Shine for all your car care
            needs!
          </p>
          <ul className="text-center text-lg mb-6 space-y-2">
            <li>
              <strong>Email:</strong> support@turboshine.com
            </li>
            <li>
              <strong>Phone:</strong> (123) 456-7890
            </li>
            <li>
              <strong>Address:</strong> 456 Shine Street, Clean City, CC 78910
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
