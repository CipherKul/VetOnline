'use client'
import useIsMobile from '@/hooks/useIsMobile'
import Image from 'next/image'
import TestimonialImage from '@/public/testimonial/image.svg'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

const Midsection = () => {
  const isMobile = useIsMobile()
  const testimonials = [
    {
      id: 1,
      name: 'Så här fungerar fästingmedel till din hund ',
      description: 'Bla bla bla bla bla blba balBla bla bla bla bla blba ',
    },
    {
      id: 2,
      name: 'Så här fungerar fästingmedel till din hund ',
      description: 'Bla bla bla bla bla blba balBla bla bla bla bla blba ',
    },
    {
      id: 3,
      name: 'Så här fungerar fästingmedel till din hund ',
      description: 'Bla bla bla bla bla blba balBla bla bla bla bla blba ',
    },
  ]

  return (
    <div>
      <section className="py-20 bg-white md:bg-[#F3FFF6] shadow-xl">
        <div className="container mx-auto px-4">
          <p className="text-left md:text-center text-gray-500 text-sm ml-3 md:ml-0 mb-2">
            Fakta om oss
          </p>
          <h2 className="text-left md:text-center text-xl md:text-4xl font-bold ml-3 md:ml-0 text-teal-800 mb-4 md:mb-8">
            Läs vad veterinärer rekommenderar
          </h2>

          <div className="w-full md:w-[55%] mx-auto">
            <Swiper
              spaceBetween={20}
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
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <div className="w-full bg-white rounded-lg shadow-lg">
                    <div>
                      <Image
                        src={TestimonialImage || '/placeholder.svg'}
                        alt="Veterinarian with pet"
                        width={300}
                        height={200}
                        className="rounded-t-lg w-full"
                      />
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="font-bold text-[#004E49] text-sm">
                        {testimonial.name}
                      </h3>
                      <p className="text-[#004E49] text-xs">
                        {testimonial.description}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-[60%] mb-6 md:mb-0">
              <Image
                src={`/midsection/${
                  isMobile ? 'doctor-mobile.png' : 'doctor-web.png'
                }`}
                alt="Veterinarian with dog"
                width={800}
                height={600}
              />
            </div>
            <div className="md:w-[40%] md:pl-8 w-[90%] mx-auto">
              <p className="text-gray-500 text-sm">Om oss</p>
              <h2 className="text-2xl font-bold text-[#004E49] mb-4">
                Lär känna VetOnline
              </h2>
              <p className="text-[#004E49] text-sm mb-6 md:text-base tracking-wide leading-5 md:leading-6 w-[100%] md:w-[70%]">
                VetRecept är en digital veterinärtjänst som erbjuder snabb,
                smidig och säker behandling för ditt husdjur – helt utan
                stressiga klinikbesök. Våra legitimerade veterinärer granskar
                din förfrågan och skriver ut recept på fästingmedel,
                avmaskningsmedel och andra vanliga behandlingar, så att du kan
                ge ditt husdjur den vård de behöver, direkt från hemmet.
              </p>
              {isMobile ? (
                <button className="w-full text-white bg-[#004E49] py-2 rounded-md font-medium mb-10">
                  Läs mer om oss
                </button>
              ) : (
                <button className="bg-white text-[#004E49] border-[#004E49] border-2 rounded-md font-medium py-2 px-16">
                  Läs mer om oss
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Midsection
