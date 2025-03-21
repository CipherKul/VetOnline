'use client'

import Image from 'next/image'
import { Check } from 'lucide-react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useEffect, useState } from 'react'
import FAQ from './FAQ'
import Payment from './Payment'
import About2 from './About2'
import About from './About'
import Review from './review'

export default function Herosection() {
  const [isMobile, setIsMobile] = useState(false)

  // const sliderRef = useRef<HTMLDivElement>(null)
  // const scroll = (direction: 'left' | 'right') => {
  //   if (sliderRef.current) {
  //     const scrollAmount = sliderRef.current.clientWidth
  //     const newScrollLeft =
  //       direction === 'left'
  //         ? sliderRef.current.scrollLeft - scrollAmount
  //         : sliderRef.current.scrollLeft + scrollAmount

  //     sliderRef.current.scrollTo({
  //       left: newScrollLeft,
  //       behavior: 'smooth',
  //     })
  //   }
  // }

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

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-[#004E49]   text-white relative overflow-hidden shadow-xl">
        <div className="container mx-auto flex flex-col-reverse md:flex-row items-center">
          {/* Left Side - Text Content */}
          <div className="w-full md:w-1/2 p-4 md:p-12 z-10">
            <h1 className="text-2xl 2xl:text-4xl xl:text-2xl font-bold tracking-wide drop-shadow-[2px_2px_2px_rgba(0,0,0,1)]">
              Få recept på{' '}
              <span className="text-[#B2FFE4] text-2xl 2xl:text-4xl xl:text-2xl lg:text-xl  font-mono tracking-normal font-bold h-10 md:text-5xl md:drop-shadow-[2px_2px_2px_rgba(20,20,20,1)]">
                fästingmedel
              </span>
            </h1>
            <h1 className="text-2xl 2xl:text-4xl xl:text-2xl font-bold tracking-wide drop-shadow-[2px_2px_2px_rgba(0,0,0,1)]">
              av veterinär online
            </h1>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center space-x-2 gap-2 drop-shadow-md">
                <span className="text-white bg-[#B2FFE4] h-6 w-6 rounded-full ">
                  <Check className="text-[#004E49] mt-0.5 ml-0.5" />
                </span>
                <span className="text-white ">Tillgängliga dygnet runt</span>
              </li>
              <li className="flex items-center space-x-2 gap-2 drop-shadow-md">
                <span className="text-white bg-[#B2FFE4] h-6 w-6 rounded-full">
                  <Check className="text-[#004E49] mt-0.5 ml-0.5" />
                </span>{' '}
                <span className="text-white ">
                  Skippa veterinärbesök och videosamtal
                </span>
              </li>
              <li className="flex items-center space-x-2 gap-2 drop-shadow-md">
                <span className="text-white bg-[#B2FFE4] h-6 w-6 rounded-full">
                  <Check className="text-[#004E49] mt-0.5 ml-0.5" />
                </span>{' '}
                <span className="text-white ">Recept inom 15 minuter</span>
              </li>
            </ul>
            <div className="md:w-auto w-full flex">
              <button className="mt-8 bg-white text-[#004D40] md:w-auto w-full font-medium px-4 md:py-1.5 md:px-24 py-3 rounded-md hover:bg-gray-100 transition-colors drop-shadow-[2px_2px_2px_rgba(10,10,10,1)]">
                Få recept idag
              </button>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="w-full  md:absolute md:right-0 md:top-0 md:bottom-0 2xl:w-[50%] lg:w-[36rem] xl:w-[40rem] h-[450px] md:h-full ">
            <div className="relative w-full h-full">
              <Image
                src={
                  isMobile
                    ? '/images/landing/heromobile.png'
                    : '/images/landing/hero.png'
                }
                alt="Cat and Dog"
                fill
                className="object-cover  object-center    h-full"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>{' '}
      </section>

      {/* Stats Section */}
      <section className="md:rounded-none rounded-br-[120px] rounded-bl-[70px] py-6 shadow-2xl drop-shadow-[1px_1px_1px_rgba(0,0,0,0.01)] bg-[#F3FFF6]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:divide-y-0 divide-y-2 md:divide-x-2 divide-gray-200 md:grid-cols-3 gap-4 relative">
            {/* First Stat */}
            <div className="text-center p-4 relative">
              <div className="text-2xl font-medium text-[#004E49]">4,8</div>
              <div className="tracking-wide font-medium text-[#004E49] text-base">
                i betyg av djurägare{' '}
              </div>
              <div className="flex justify-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    width="35"
                    height="33"
                    key={i}
                    viewBox="0 0 35 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18.3131 0.338873L22.6437 11.4298L34.3544 12.1919C34.4605 12.1986 34.5622 12.2376 34.6462 12.3038C34.7303 12.37 34.7928 12.4604 34.8256 12.5632C34.8585 12.6661 34.8602 12.7766 34.8305 12.8804C34.8008 12.9842 34.741 13.0765 34.6591 13.1454L25.627 20.7621L28.5335 32.3253C28.5611 32.4333 28.5551 32.5475 28.5163 32.6519C28.4774 32.7563 28.4076 32.8459 28.3165 32.9082C28.2255 32.9705 28.1176 33.0026 28.0079 32.9998C27.8981 32.9971 27.7919 32.9598 27.7039 32.893L17.8211 26.5288L7.90571 32.9138C7.81609 32.9708 7.71175 32.9993 7.6061 32.9955C7.50045 32.9917 7.39834 32.9559 7.31288 32.8926C7.22742 32.8293 7.16252 32.7415 7.12654 32.6404C7.09056 32.5393 7.08514 32.4295 7.11097 32.3253L10.0175 20.7621L0.983115 13.1458C0.899585 13.0759 0.839073 12.9817 0.809705 12.8759C0.780338 12.77 0.783522 12.6575 0.81883 12.5536C0.854138 12.4496 0.919879 12.3591 1.00722 12.2943C1.09457 12.2294 1.19933 12.1933 1.30745 12.1908L12.9985 11.4298L17.3291 0.338873C17.3684 0.238844 17.4363 0.153094 17.524 0.0926898C17.6117 0.0322856 17.7152 0 17.8211 0C17.927 0 18.0305 0.0322856 18.1182 0.0926898C18.2059 0.153094 18.2738 0.238844 18.3131 0.338873Z"
                      fill="#004E49"
                    />
                  </svg>
                ))}
              </div>
            </div>

            {/* Second Stat */}
            <div className="text-center p-4 relative">
              <div className="text-3xl font-medium  text-[#004E49]">
                15 minutes
              </div>
              <div className="tracking-wide font-medium text-[#004E49] text-base">
                i snitt till recept{' '}
              </div>
            </div>

            {/* Third Stat */}
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-[#004E49]">+50,000</div>
              <div className="tracking-wide font-medium text-[#004E49] text-base">
                Djur har fått vård av oss{' '}
              </div>
              <div className="flex justify-center mt-1">
                <Image
                  src="/images/landing/footmark.svg"
                  alt="Happy Pet"
                  width={50}
                  height={50}
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
      <Review />
      <FAQ />
    </main>
  )
}
