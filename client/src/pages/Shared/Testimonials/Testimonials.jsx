import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css"; // Add Swiper styles
import "swiper/css/navigation"; // Add Swiper navigation styles
import "swiper/css/pagination"; // Add Swiper pagination styles
import { FaQuoteLeft } from "react-icons/fa";

const Testimonials = () => {
  const swiperRef = useRef(null);

  const testimonials = [
    {
      content:
        "“Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus libero ad tempora doloribus expedita laborum saepe voluptas perferendis delectus assumenda rerum, culpa aperiam dolorum, obcaecati corrupti aspernatur a.”",
      name: "Robert",
      role: "CTO, Robert Consultancy",
      image:
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    },
    {
      content:
        "“Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus libero ad tempora doloribus expedita laborum saepe voluptas perferendis delectus assumenda rerum, culpa aperiam dolorum, obcaecati corrupti aspernatur a.”",
      name: "Jeny Doe",
      role: "CEO, Jeny Consultancy",
      image:
        "https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
    },
    {
      content:
        "“Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus libero ad tempora doloribus expedita laborum saepe voluptas perferendis delectus assumenda rerum, culpa aperiam dolorum, obcaecati corrupti aspernatur a.”",
      name: "Ema Watson",
      role: "Marketing Manager at Stech",
      image:
        "https://images.unsplash.com/photo-1488508872907-592763824245?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
  ];

  return (
    <div className="px-52 py-16">
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={2}
        navigation={false} // Disable default navigation
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="p-8 sm:p-14 border rounded-lg border-[#F7A582] hover:bg-[#F7A582] group transition-all duration-300 ease-in-out">
              <FaQuoteLeft className="text-[#F7A582] group-hover:text-gray-100 mb-2 text-4xl" />
              <p className="leading-relaxed text-gray-500 dark:text-gray-400 group-hover:text-gray-100">
                {testimonial.content}
              </p>

              <div className="flex items-center mt-6 sm:mt-8 -mx-2">
                <img
                  className="object-cover mx-2 rounded-full w-12 sm:w-14 h-12 sm:h-14 ring-2 group-hover:ring-gray-100 ring-[#F7A582] dark:ring-gray-700"
                  src={testimonial.image}
                  alt={testimonial.name}
                />

                <div className="mx-2">
                  <h1 className="font-semibold text-gray-800 dark:text-white group-hover:text-gray-100">
                    {testimonial.name}
                  </h1>
                  <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-100">
                    {testimonial.role}
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className="flex items-center justify-between mt-12 lg:justify-center space-x-32 relative">
        <button
          title="left arrow"
          className="p-2 text-[#F7A582] transition-colors duration-300 border rounded-full rtl:-scale-x-100 bg-white border-[#F7A582] hover:text-gray-100 dark:hover:bg-gray-800 hover:bg-[#F7A582] absolute -left-6 bottom-[185px] z-10"
          onClick={() => swiperRef.current.swiper.slidePrev()} // Go to previous slide
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          title="right arrow"
          className="p-2 text-[#F7A582] transition-colors duration-300 border rounded-full rtl:-scale-x-100 border-[#F7A582] hover:text-gray-100 dark:hover:bg-gray-800 lg:mx-6 hover:bg-[#F7A582] absolute -right-6 bottom-[185px] z-10 bg-white"
          onClick={() => swiperRef.current.swiper.slideNext()} // Go to next slide
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Testimonials;
