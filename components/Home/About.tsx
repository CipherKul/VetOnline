import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
export default function About() {
  return (
    <section className="py-20 w-full bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col justify-between md:flex-row items-center">
          <div className="flex flex-col gap-4 md:w-[45%]">
            <span className="text-xs text-[#787878]">
              Vi behandlar fästingar
            </span>
            <div>
              <h2 className="text-xl md:text-4xl font-bold text-[#004E49]">
                Få recept av våra
              </h2>
              <h2 className="text-xl md:text-4xl font-bold text-[#004E49]">
                veterinärer och mer tid
              </h2>
              <h2 className="text-xl md:text-4xl font-bold text-[#004E49]">
                för lek och gos
              </h2>
              <button className="bg-[#004E49] w-[60%] mt-4 text-white cursor-pointer px-8 py-2 rounded-md hover:bg-opacity-90 transition-colors">
                Få recept nu
              </button>
            </div>
          </div>
          <div className="hidden md:block w-[2px] bg-[#004E49] self-stretch"></div>
          <div className="flex flex-col md:flex-row gap-8  items-start md:w-[45%]">
            {/* Right Column - Links */}
            <div className="md:w-1/2 space-y-8 relative">
              <div className="flex items-center gap-3">
                <Image
                  src="/images/landing/dog.png"
                  alt="Dog icon"
                  width={24}
                  height={24}
                />
                <span className="font-medium text-gray-900">
                  Fästingmedel för hund
                </span>
                <ChevronRight className="h-5 w-5 text-gray-400 ml-auto" />
              </div>

              {/* Horizontal Divider */}
              <div className="w-full h-px bg-gray-200"></div>

              <div className="flex items-center gap-3">
                <Image
                  src="/images/landing/dog.png"
                  alt="Cat icon"
                  width={24}
                  height={24}
                />
                <span className="font-medium text-gray-900">
                  Fästingmedel för katt
                </span>
                <ChevronRight className="h-5 w-5 text-gray-400 ml-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
