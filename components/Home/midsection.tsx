"use client"
import { Divide } from 'lucide-react';
import Image from 'next/image'


// Testimonials Section
const Midsection = () => {
    const testimonials = [
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
  
    return (
        <div>
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-500 text-sm mb-2">Fakta om oss</p>
          <h2 className="text-center text-2xl font-bold text-teal-800 mb-8">
            Läs vad veterinärer rekommenderar
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="bg-white rounded-lg shadow-sm p-4">
                <div className="mb-4">
                  <Image 
                    src="/vet-with-pet.jpg" 
                    alt="Veterinarian with pet" 
                    width={120} 
                    height={120} 
                    className="rounded-lg"
                  />
                </div>
                <h3 className="font-bold text-teal-800">{testimonial.name}</h3>
                <p className="text-gray-600 text-sm">{testimonial.description}</p>
                <p className="text-gray-800 mt-2">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left side - image */}
          <div className="md:w-1/2 mb-6 md:mb-0">
            <Image
              src="/images/landing/doctorcat.png"
              alt="Veterinarian with dog"
              width={500}
              height={400}
              className="rounded-lg"
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