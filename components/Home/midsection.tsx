'use client'
import useIsMobile from '@/hooks/useIsMobile'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'
import TestimonialImage from '@/public/testimonial/image.svg'

const Midsection = () => {
  const sliderRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth
      const newScrollLeft =
        direction === 'left'
          ? sliderRef.current.scrollLeft - scrollAmount
          : sliderRef.current.scrollLeft + scrollAmount

      sliderRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      })
    }
  }
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
      <section className="py-20 bg-[#F3FFF6] shadow-xl">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-500 text-sm mb-2">Fakta om oss</p>
          <h2 className="text-center text-2xl md:text-4xl font-bold text-teal-800 mb-8">
            Läs vad veterinärer rekommenderar
          </h2>

          {isMobile ? (
            <div className="relative">
              <div
                ref={sliderRef}
                className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="snap-center shrink-0 w-[70vw] bg-white rounded-lg shadow-lg"
                  >
                    <div>
                      <Image
                        src={TestimonialImage || '/placeholder.svg'}
                        alt="Veterinarian with pet"
                        width={500}
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
                ))}
              </div>
              <button
                onClick={() => scroll('left')}
                className="absolute hidden left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10"
              >
                <ChevronLeft className="text-[#004E49]" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="absolute hidden right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10"
              >
                <ChevronRight className="text-[#004E49]" />
              </button>
            </div>
          ) : (
            <div className="w-full md:w-[55%] mx-auto flex flex-wrap gap-6">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full md:w-[30%] bg-white rounded-lg shadow-lg"
                >
                  <div>
                    <Image
                      src={TestimonialImage || '/placeholder.svg'}
                      alt="Veterinarian with pet"
                      width={300}
                      height={200}
                      className="rounded-t-lg"
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
              ))}
            </div>
          )}
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
