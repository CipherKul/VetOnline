'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import useIsMobile from '@/hooks/useIsMobile'
export default function Review() {
  const isMobile = useIsMobile()
  return (
    <section className="py-12 bg-white md:bg-[#F3FFF6] shadow-2xl shadow-gray-200">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-left md:text-center mb-4">
          <span className="text-sm text-[#787878]">Läs deras historia</span>
        </div>

        <h2 className="w-full md:w-[60%] mx-auto text-left md:text-center text-2xl md:text-4xl font-bold text-[#004E49] mb-8">
          Läs vad andra hund- och kattägare tycker om oss
        </h2>

        <div className="w-full md:w-[80%] mx-auto">
          <Swiper
            spaceBetween={10}
            slidesPerView={isMobile ? 1 : 3}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            className="mySwiper"
          >
            {[...Array(5)].map((_, i) => (
              <SwiperSlide key={i}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden drop-shadow-xl h-full">
                  <div className="bg-white p-4 rounded-lg shadow-xl">
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, j) => (
                        <svg
                          key={j}
                          className="w-4 h-4 text-[#6AA896]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-xs font-bold text-[#666666] mb-2">
                      Snabb och smidig process!
                    </p>
                    <p className="text-xs text-[#787878]">
                      Sjukt smidigt och professionellt. Fick snabbt hjälp av
                      veterinären!
                    </p>
                    <div className="mt-10">
                      <span className="text-xs text-gray-500">Åsa, 42år</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="text-center mt-8 md:w-1/2 mx-auto">
          <button className="bg-[#004E49] text-white px-24 py-2 tracking-wide shadow-xl rounded-md hover:bg-opacity-90 transition-colors">
            Få recept nu
          </button>
        </div>
      </div>
    </section>
  )
}
