import React from 'react';

const Hero = () => {
  return (
    <div>
      <section>
        <div className=" hero min-h-screen bg-[url(https://images.pexels.com/photos/372810/pexels-photo-372810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)]">
          <div className="hero-overlay inset-0 bg-gradient-to-r from-black to-transparent"></div>
          <div></div>
          <div className="container flex flex-col items-center px-4 py-16 pb-24 mx-auto text-center lg:pb-56 md:py-32 md:px-10 lg:px-32 text-gray-900">
            <p className="text-2xl lg:text-5xl font-bold leading-none sm:text-6xl xl:max-w-3xl text-[#1f746a]">
              {" "}
              Premium Car Care
            </p>
            <p className="text-2xl lg:text-5xl font-extrabold leading-none sm:text-6xl xl:max-w-3xl text-[#2A9D8F]">
              Anytime, Anywhere
            </p>
            <p className="mt-6 mb-8 text-lg sm:mb-12 xl:max-w-3xl text-gray-50">
              {" "}
              We use water-efficient methods and environmentally safe products
            </p>
            <div className="flex flex-wrap justify-center">
              <a href={`/services`}>
                <button
                  type="button"
                  className="px-8 py-3 m-2 text-lg font-semibold rounded bg-[#2A9D8F] text-gray-50 hover:bg-[#0f685f] hover:font-bold"
                >
                  Click Here to Order Now
                </button>
              </a>
              <a href={`/services`}>
                <button
                  type="button"
                  className="px-8 py-3 m-2 text-lg border rounded border-gray-700 text-[#2A9D8F] hover:text-[#91adaa] hover:font-bold"
                >
                  Learn more
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;