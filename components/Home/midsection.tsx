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
    <>
      <section className="py-14 md:bg-[#F3FFF6] shadow-gray-200 shadow-lg">
        <div className="container mx-auto px-4">
          <p className="text-left md:text-center text-[#787878] text-sm mb-2">
            Fakta om oss
          </p>
          <h2 className="text-left md:text-center text-2xl md:text-5xl font-bold text-[#004E49] mb-8">
            Läs vad veterinärer rekommenderar
          </h2>

          <div className="w-[55%] mx-auto flex flex-wrap gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="w-[30%] bg-white rounded-t-lg shadow-lg shadown-gray-200"
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
    </>
  )
}

export default Midsection
