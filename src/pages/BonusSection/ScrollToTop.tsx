import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa"; // Importing an icon

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-8 right-8">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="bg-gradient-to-r from-[#1f746a] to-[#2A9D8F] text-white p-4 rounded-full shadow-xl transform transition-all hover:scale-110 hover:bg-gradient-to-l focus:outline-none focus:ring-4 focus:ring-[#2A9D8F] hover:shadow-glow"
          style={{
            transition: "opacity 0.3s ease-in-out",
            opacity: isVisible ? 1 : 0,
          }}
        >
          <FaArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
