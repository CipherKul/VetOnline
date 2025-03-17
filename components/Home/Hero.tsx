"use client"

import Image from "next/image"
// import Navbar from "../layout/Navbar"
import { ChevronRight } from "lucide-react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { useEffect, useState } from "react"

export default function Herosection() {
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
    autoplaySpeed: 3000
  };

  const reviews = [...Array(5)].map((_, i) => (
    <div key={i} className="px-2">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex justify-center mb-2">
          {[...Array(5)].map((_, j) => (
            <svg key={j} className="w-4 h-4 text-[#004E49]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <p className="text-sm text-[#004E49] text-center mb-2">Snabb och smidig process!</p>
        <p className="text-xs text-gray-600 text-center">
          Fick snabbt hjälp av veterinären!
        </p>
        <div className="text-center mt-2">
          <span className="text-xs text-gray-500">Åsa, 42år</span>
        </div>
      </div>
    </div>
  ));

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-[#004E49] text-white relative overflow-hidden">
        <div className="container mx-auto flex flex-col-reverse md:flex-row items-center">
          {/* Left Side - Text Content */}
          <div className="w-full md:w-1/2 p-8 md:p-12 z-10">
            <h1 className="text-2xl md:text-3xl font-bold">
              Få recept på <span className="text-teal-400">fästingmedel</span> 
            </h1>
            <h1 className="text-2xl md:text-3xl font-bold">av veterinär online</h1>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center space-x-2">
                <span className="text-white bg-teal-400 rounded-full px-1">✓</span>
                <span>Tillgängliga dygnet runt</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-white bg-teal-400 rounded-full px-1">✓</span>
                <span>Skippa veterinärbesök och videosamtal</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-white bg-teal-400 rounded-full px-1">✓</span>
                <span>Recept inom 15 minuter</span>
              </li>
            </ul>
            <button className="mt-8 bg-white text-[#004D40] font-medium px-12 py-1.5 rounded-md hover:bg-gray-100 transition-colors">
              Få recept idag
            </button>
          </div>

          {/* Right Side - Image */}
          <div className="w-full md:absolute md:right-0 md:top-0 md:bottom-0 md:w-1/2 h-[300px] md:h-full">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-[#004E49] to-transparent z-10 md:w-32 hidden md:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#004E49] to-transparent z-10 md:hidden opacity-50" />
              <Image
                src="/images/landing/hero.png"
                alt="Cat and Dog"
                fill
                className="object-cover object-center"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#F3FFF6] py-6 shadow-2xl">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
            {/* First Stat */}
            <div className="text-center p-4 relative">
              <div className="text-2xl font-bold text-emerald-800">4.8</div>
              <div className="text-sm text-gray-600">Average customer rating</div>
              <div className="flex justify-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div className="hidden md:block absolute right-0 top-1/2 w-px h-20 bg-gray-400 transform -translate-y-1/2"></div>
            </div>

            {/* Second Stat */}
            <div className="text-center p-4 relative">
              <div className="text-2xl font-bold text-emerald-800">15 minutes</div>
              <div className="text-sm text-gray-600">Average consultation time</div>
              <div className="hidden md:block absolute right-0 top-1/2 w-px h-20 bg-gray-400 transform -translate-y-1/2"></div>
            </div>

            {/* Third Stat */}
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-emerald-800">+50,000</div>
              <div className="text-sm text-gray-600">Happy pets we&apos;ve helped so far</div>
              <div className="flex justify-center mt-1">
                <Image src="/images/landing/footmark.png" alt="Happy Pet" width={40} height={40} />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* First Part */}
          <div>
            <span className="text-sm text-[#004E49]">Vi behandlar fästingar</span>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Left Column */}
            <div className="md:w-1/2">
              <h2 className="text-xl md:text-2xl font-bold text-[#004E49]">
                Få recept av våra 
              </h2>
              <h2 className="text-xl md:text-2xl font-bold text-[#004E49]">veterinärer och mer tid</h2>
              <h2 className="text-xl md:text-2xl font-bold text-[#004E49]">för lek och gos</h2>
              <button className="bg-[#004E49] mt-4 text-white px-8 py-1 rounded-md hover:bg-opacity-90 transition-colors">
                Få recept nu
              </button>
            </div>

            {/* Vertical Divider */}
            <div className="hidden md:block w-px bg-gray-200 h-48 self-center relative">
            </div>

            {/* Right Column - Links */}
            <div className="md:w-1/2 space-y-8 relative">
              <div className="flex items-center gap-3">
                <Image
                  src="/images/landing/dog.png"
                  alt="Dog icon"
                  width={24}
                  height={24}
                />
                <span className="font-medium text-gray-900">Fästingmedel för hund</span>
                <ChevronRight className="h-5 w-5 text-gray-400 ml-auto" />
              </div>
              
              {/* Horizontal Divider */}
              <div className="w-full h-px bg-gray-200"></div>
            
              <div className="flex items-center gap-3">
                <Image
                  src="/images/landing/cat.png"
                  alt="Cat icon"
                  width={24}
                  height={24}
                />
                <span className="font-medium text-gray-900">Fästingmedel för katt</span>
                <ChevronRight className="h-5 w-5 text-gray-400 ml-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section with full-width background */}
      <section className="bg-[#F3FFF6] w-full py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Left section */}
            <div className="md:w-1/2">
              <h3 className="text-xl md:text-2xl font-bold text-[#004E49]">
                Så här enkelt får du recept på fästingmedel av våra veterinärer
              </h3>
              <button className="bg-[#004E49] mt-4 text-white px-8 py-1 rounded-md hover:bg-opacity-90 transition-colors">
                Få recept
              </button>
            </div>

            {/* Vertical Divider */}
            <div className="hidden md:block w-px bg-gray-200 h-64 self-stretch"></div>

            {/* Right section */}
            <div className="md:w-1/2 space-y-12">
              <div className="flex items-start gap-6">
                <Image src="/images/landing/1.png" alt="Form" width={32} height={32} className="mt-1" />
                <div>
                  <h3 className="font-medium text-[#004E49]">Fyll i hälsoformuläret</h3>
                  <p className="text-sm text-gray-600 mt-1">Besvara frågorna för att säkerställa att behandlingen är rätt för din hund eller katt.</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <Image src="/images/landing/2.png" alt="Payment" width={32} height={32} className="mt-1" />
                <div>
                  <h3 className="font-medium text-[#004E49]">Identifiera & betala</h3>
                  <p className="text-sm text-gray-600 mt-1">Identifiera dig med BankID och betala 199kr.</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <Image src="/images/landing/3.png" alt="Prescription" width={32} height={32} className="mt-1" />
                <div>
                  <h3 className="font-medium text-[#004E49]">Recept samma dag</h3>
                  <p className="text-sm text-gray-600 mt-1">Vår veterinär går igenom din frågeformulär och utfärdar recept. Du kan sedan köpa ditt fästingmedel på ett online apotek.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <div className="flex justify-center mb-3">
            <Image
              src="/images/landing/badge.png"
              alt="Check"
              width={24}
              height={24}
              className="text-[#004E49]"
            />
          </div>
          <p className="text-sm text-[#004E49] mb-4">Betalningsmetoder</p>

          <h3 className="text-2xl font-bold text-[#004E49] mb-8">
            Vi erbjuder följande trygga betalsätt
          </h3>

          <div className="flex flex-wrap justify-center items-center gap-4">
            <Image
              src="/images/landing/klarna.png"
              alt="Klarna"
              width={80}
              height={32}
            />
            <Image
              src="/images/landing/swish.png"
              alt="Swish"
              width={80}
              height={32}
            />
            <Image
              src="/images/landing/visa.png"
              alt="VISA"
              width={80}
              height={32}
            />
            <Image
              src="/images/landing/mastercard.png"
              alt="Mastercard"
              width={80}
              height={32}
            />
            <Image
              src="/images/landing/applepay.png"
              alt="Apple Pay"
              width={80}
              height={32}
            />
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-12 bg-[#F3FFF6]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-4">
            <span className="text-sm text-[#004E49]">Läs deras historia</span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-[#004E49] text-center mb-8">
            Läs vad andra hund- och kattägare<br />tycker om oss
          </h2>

          {/* Reviews Cards - Mobile Slider / Desktop Grid */}
          {isMobile ? (
            <div className="md:hidden">
              <Slider {...sliderSettings}>
                {reviews}
              </Slider>
            </div>
          ) : (
            <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-5 gap-4">
              {reviews}
            </div>
          )}

          <div className="text-center mt-8">
            <button className="bg-[#004E49] text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors">
              Få recept nu
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row">
          {/* Left side */}
          <div className="md:w-1/3 mb-6 md:mb-0 pr-0 md:pr-8">
            <p className="text-gray-500 text-sm">Följ upp och svar</p>
            <h2 className="text-2xl font-bold text-teal-800 mb-4">
              Läs veterinärens svar på era frågor
            </h2>
            <button className="bg-teal-800 text-white px-8 py-1 rounded-md font-medium">
              Få recept 
            </button>
          </div>
          
          {/* Right side - FAQ */}
          <div className="md:w-2/3 border-l border-gray-200 pl-0 md:pl-8">
            <div className="mb-4">
              <h3 className="text-teal-800 font-medium mb-2">• Vad är RecceptOnline?</h3>
              <h3 className="text-teal-800 font-medium mb-2">• Hur fungerar RecceptOnline?</h3>
              <h3 className="text-teal-800 font-medium mb-2">• Var kan jag hämta ut mitt läkemedel?</h3>
              <h3 className="text-teal-800 font-medium mb-2">• Vilka läkemedel/behandlingar erbjuder ni på RecceptOnline?</h3>
              <h3 className="text-teal-800 font-medium mb-2">• Vad krävs för att få använda tjänsten?</h3>
            </div>
            
            {/* FAQ highlighted box */}
            <div className="bg-green-100 p-4 rounded-md mb-4 relative">
              <button className="absolute top-2 right-2 text-gray-500">×</button>
              <p className="text-gray-700">
                För att använda vår tjänst behöver du ha fyllt 18 år och ha tillgång till mobilt BankID.
              </p>
            </div>
            
            <div className="mb-4">
              <h3 className="text-teal-800 font-medium mb-2">• Vad kostar det?</h3>
              <h3 className="text-teal-800 font-medium mb-2">• Hur lång tid tar det från jag får mitt recept?</h3>
            </div>
            
            <div className="text-center">
              <a href="#" className="text-teal-800 font-medium hover:underline">
                Se fler frågor
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>


    



    </main>
  )
};
