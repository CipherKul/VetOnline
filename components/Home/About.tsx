import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
export default function About() {
  return (
    <>
      <section className="py-20 w-full bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col justify-between md:flex-row items-center">
            <div className="flex flex-col gap-4 w-full md:w-[45%]">
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
                <button className="bg-[#004E49] hidden md:flex w-[60%] mt-4 text-white cursor-pointer px-8 py-2 rounded-md hover:bg-opacity-90 transition-colors shadow-xl shadow-gray-400">
                  Få recept nu
                </button>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-8  items-start md:w-[50%]">
              <div className="w-full border-l-[1px] border-[#004E49] space-y-8 relative">
                <div className="flex items-center gap-3 pt-3 pl-3">
                  <Image
                    src="/images/landing/doge.png"
                    alt="Dog icon"
                    width={30}
                    height={30}
                  />
                  <span className="font-medium text-[#004E49]">
                    Fästingmedel för hund
                  </span>
                  <ChevronRight
                    className="h-5 w-5 text-gray-400 ml-auto"
                    color="#004E49"
                  />
                </div>
                <div className="w-full h-px bg-[#004E49]"></div>
                <div className="flex items-center gap-3 pb-3 pl-3">
                  <Image
                    src="/images/landing/cat.png"
                    alt="Cat icon"
                    width={30}
                    height={30}
                  />
                  <span className="font-medium text-[#004E49]">
                    Fästingmedel för katt
                  </span>
                  <ChevronRight
                    className="h-5 w-5 text-gray-400 ml-auto"
                    color="#004E49"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="md:hidden flex">
        <Image
          src={'/images/landing/dog.png'}
          alt="Dog Image"
          width={400}
          height={300}
        />
      </section>
    </>
  )
}
