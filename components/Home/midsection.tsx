"use client"
import Image from 'next/image'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { useEffect, useState } from "react"

interface Testimonial {
  id: number;
  name: string;
  description: string;
  text: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

// Testimonials Section
const Midsection = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      handleResize();
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    const sliderSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 3000,
      centerMode: true,
      centerPadding: '20px'
    };

    const testimonials: Testimonial[] = [
      {
        id: 1,
        name: "Elsa Svensson",
        description: "Leg.Vet, specialist smådjursvård",
        text: "Lätt att använda när det gäller rutinbehandlingar för husdjur."
      },
      {
        id: 2,
        name: "Elsa Svensson",
        description: "Leg.Vet, specialist smådjursvård",
        text: "Lätt att använda när det gäller rutinbehandlingar för husdjur."
      },
      {
        id: 3,
        name: "Elsa Svensson",
        description: "Leg.Vet, specialist smådjursvård",
        text: "Lätt att använda när det gäller rutinbehandlingar för husdjur."
      }
    ];
  
    const TestimonialCard = ({ testimonial }: TestimonialCardProps) => (
      <div className="px-2">
        <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-center mb-2">
            <Image 
              src="/images/landing/withpet.png" 
              alt="Veterinarian with pet" 
              width={180} 
              height={180} 
              className="rounded-lg"
            />
          </div>
          <h3 className="text-sm text-[#004E49] text-center mb-2 font-medium">{testimonial.name}</h3>
          <p className="text-xs text-gray-600 text-center">
            {testimonial.description}
          </p>
          <div className="text-center mt-2">
            <span className="text-xs text-gray-500">{testimonial.text}</span>
          </div>
        </div>
      </div>
    );

    return (
      <div>
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto max-w-6xl px-2">
            <div className="text-center mb-4">
              <span className="text-sm text-[#004E49]">Fakta om oss</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-[#004E49] text-center mb-8">
              Läs vad veterinärer rekommenderar
            </h2>

            {isMobile ? (
              <div className="md:hidden">
                <Slider {...sliderSettings}>
                  {testimonials.map(testimonial => (
                    <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                  ))}
                </Slider>
              </div>
            ) : (
              <div className="hidden md:flex justify-center">
                <div className="grid grid-cols-3 gap-4 max-w-3xl">
                  {testimonials.map(testimonial => (
                    <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="py-12 bg-white">
        <div>
          <div className="flex flex-col md:flex-row items-center">
            {/* Left side - image */}
            <div className="md:w-1/2 mb-6 md:mb-0">
            <Image 
  src="/images/landing/doctorcat.png"
  alt="Veterinarian with dog"
  width={500}
  height={400}
  className="rounded-lg"
  style={{ clipPath: 'path("M0,0 H80% Q100% 0, 100% 30% V100% Q100% 80%, 80% 100% H0 Z")' }}
/>

            </div>
            
            {/* Right side - text */}
            <div className="md:w-1/2 md:pl-8">
              <p className="text-gray-500 text-sm">Om oss</p>
              <h2 className="text-2xl font-bold text-teal-800 mb-4">
                Lär känna VetOnline
              </h2>
              <p className="text-gray-700 mb-6">
                VetRecept är en digital veterinärtjänst som erbjuder snabb, enkel och säker behandling för ditt husdjur – helt utan stressiga klinikbesök. Våra legitimerade veterinärer är specialiserade på att skriva ut recept på fästingmedel, avmaskningsmedel och andra vanliga behandlingar. Vi är här för att hjälpa den som behöver, direkt från hemmet.
              </p>
              <button className="bg-white text-teal-800 border border-teal-800 px-6 py-2 rounded-md font-medium hover:bg-teal-50">
                Läs mer om oss
              </button>
            </div>
          </div>
        </div>
      
        </section>
        </div>
    );
};

export default Midsection;