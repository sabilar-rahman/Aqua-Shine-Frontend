
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#02c39a] to-[#028978] text-white py-12 px-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-3xl font-bold mb-4">Stay Connected</h1>
            <p className="text-lg mb-4">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <form className="flex flex-col sm:flex-row items-center">
              <input
                type="email"
                placeholder="Your email address"
                className="p-2 mb-4 sm:mb-0 sm:mr-4 rounded-md w-full sm:w-64"
              />
              <button
                type="submit"
                className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-md hover:bg-yellow-500 transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>

          <nav className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 text-center md:text-left">
            {/* <a href="/about" className="hover:underline"></a> */}

            <NavLink to={`/aboutUs`} className="hover:underline">
              About Us
            </NavLink>
            <NavLink to={`/aboutUs`} className="hover:underline">
              Contact
            </NavLink>
            <NavLink to={`/products`} className="hover:underline">
              Products
            </NavLink>

            
            {/* <a href="/press-kit" className="hover:underline">
              Press Kit
            </a> */}
          </nav>

          <div className="mt-8 md:mt-0">
            <div className="flex justify-center space-x-6">
              <a href="https://twitter.com" aria-label="Twitter">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current hover:text-yellow-400 transition duration-300"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </a>
              <a href="https://youtube.com" aria-label="YouTube">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current hover:text-yellow-400 transition duration-300"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                </svg>
              </a>
              <a href="https://facebook.com" aria-label="Facebook">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current hover:text-yellow-400 transition duration-300"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-12">
          <p>© {new Date().getFullYear()} Max Fit - All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
