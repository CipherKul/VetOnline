'use client'

import Image from 'next/image'
// import Navbar from "../layout/Navbar"
import { ChevronRight } from 'lucide-react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useEffect, useState } from 'react'
import FAQ from './FAQ'
import Payment from './Payment'
import About2 from './About2'
import About from './About'

export default function Herosection() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  }

  const reviews = [...Array(5)].map((_, i) => (
    <div key={i} className="px-2">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex justify-center mb-2">
          {[...Array(5)].map((_, j) => (
            <svg
              key={j}
              className="w-4 h-4 text-[#004E49]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <p className="text-sm text-[#004E49] text-center mb-2">
          Snabb och smidig process!
        </p>
        <p className="text-xs text-gray-600 text-center">
          Fick snabbt hjälp av veterinären!
        </p>
        <div className="text-center mt-2">
          <span className="text-xs text-gray-500">Åsa, 42år</span>
        </div>
      </div>
    </div>
  ))

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
            <h1 className="text-2xl md:text-3xl font-bold">
              av veterinär online
            </h1>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center space-x-2">
                <span className="text-white bg-teal-400 rounded-full px-1">
                  ✓
                </span>
                <span>Tillgängliga dygnet runt</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-white bg-teal-400 rounded-full px-1">
                  ✓
                </span>
                <span>Skippa veterinärbesök och videosamtal</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-white bg-teal-400 rounded-full px-1">
                  ✓
                </span>
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
              <div className="text-sm text-gray-600">
                Average customer rating
              </div>
              <div className="flex justify-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div className="hidden md:block absolute right-0 top-1/2 w-px h-20 bg-gray-400 transform -translate-y-1/2"></div>
            </div>

            {/* Second Stat */}
            <div className="text-center p-4 relative">
              <div className="text-2xl font-bold text-emerald-800">
                15 minutes
              </div>
              <div className="text-sm text-gray-600">
                Average consultation time
              </div>
              <div className="hidden md:block absolute right-0 top-1/2 w-px h-20 bg-gray-400 transform -translate-y-1/2"></div>
            </div>

            {/* Third Stat */}
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-emerald-800">+50,000</div>
              <div className="text-sm text-gray-600">
                Happy pets we&apos;ve helped so far
              </div>
              <div className="flex justify-center mt-1">
                <Image
                  src="/images/landing/footmark.png"
                  alt="Happy Pet"
                  width={40}
                  height={40}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <About />

      {/* Steps Section with full-width background */}
      <About2 />
      {/* Payment Section */}
      <Payment />
      {/* Reviews Section */}
      <section className="py-12 bg-[#F3FFF6]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-4">
            <span className="text-sm text-[#004E49]">Läs deras historia</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-[#004E49] text-center mb-8">
            Läs vad andra hund- och kattägare
            <br />
            tycker om oss
          </h2>

          {/* Reviews Cards - Mobile Slider / Desktop Grid */}
          {isMobile ? (
            <div className="md:hidden">
              <Slider {...sliderSettings}>{reviews}</Slider>
            </div>
          ) : (
            <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-5 gap-4">
              {reviews}
            </div>
          )}

          <div className="text-center mt-8">
            <button className="bg-[#004E49] text-white px-8 py-1 rounded-md hover:bg-opacity-90 transition-colors">
              Få recept nu
            </button>
          </div>
        </div>
      </section>
      <FAQ />
    </main>
  )
}
