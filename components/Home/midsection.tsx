'use client'
import useIsMobile from '@/hooks/useIsMobile'
import Image from 'next/image'
import TestimonialImage from '@/public/testimonial/image.svg'

// Testimonials Section
const Midsection = () => {
  const isMobile = useIsMobile()
  const testimonials = [
    {
      id: 1,
      name: 'Elsa Svensson',
      description: 'Leg.Vet, specialist smådjursvård',
      text: 'Lätt att använda när det gäller rutinbehandlingar för husdjur.',
    },
    {
      id: 2,
      name: 'Elsa Svensson',
      description: 'Leg.Vet, specialist smådjursvård',
      text: 'Lätt att använda när det gäller rutinbehandlingar för husdjur.',
    },
    {
      id: 3,
      name: 'Elsa Svensson',
      description: 'Leg.Vet, specialist smådjursvård',
      text: 'Lätt att använda när det gäller rutinbehandlingar för husdjur.',
    },
  ]

  return (
    <div>
      <section className="py-14 bg-[#F3FFF6]">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-500 text-sm mb-2">Fakta om oss</p>
          <h2 className="text-center text-2xl md:text-4xl font-bold text-teal-800 mb-8">
            Läs vad veterinärer rekommenderar
          </h2>

          <div className="w-[70%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-t-lg shadow-sm"
              >
                <div>
                  <Image
                    src={TestimonialImage}
                    alt="Veterinarian with pet"
                    width={300}
                    height={200}
                    className="rounded-t-lg"
                  />
                </div>
                <div className="flex flex-col gap-1 p-4">
                  <h3 className="font-bold text-teal-800 text-base">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-600 text-xs">
                    {testimonial.description}
                  </p>
                  <p className="text-gray-800 mt-2 text-xs">
                    {testimonial.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            {/* Left side - image */}
            <div className="md:w-1/2 mb-6 md:mb-0">
              <Image
                src={`/midsection/${
                  isMobile ? 'doctor-mobile.png' : 'doctor-web.png'
                }`}
                alt="Veterinarian with dog"
                width={700}
                height={600}
              />
            </div>

            {/* Right side - text */}
            <div className="md:w-1/2 md:pl-8 w-[90%] mx-auto">
              <p className="text-gray-500 text-sm">Om oss</p>
              <h2 className="text-xl md:text-2xl font-bold text-teal-800 mb-4">
                Lär känna VetOnline
              </h2>
              <p className="text-[#004E49] text-sm mb-6 md:text-base tracking-wide leading-6">
                VetRecept är en digital veterinärtjänst som erbjuder snabb,
                enkel och säker behandling för ditt husdjur – helt utan
                stressiga klinikbesök. Våra legitimerade veterinärer är
                specialiserade på att skriva ut recept på fästingmedel,
                avmaskningsmedel och andra vanliga behandlingar. Vi är här för
                att hjälpa den som behöver, direkt från hemmet.
              </p>
              {isMobile ? (
                <button className="w-full text-white bg-[#004E49] py-2 rounded-md font-medium mb-10">
                  Läs mer om oss
                </button>
              ) : (
                <button className="bg-white text-teal-800 border border-teal-800 px-6 py-2 rounded-md font-medium hover:bg-teal-50">
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
