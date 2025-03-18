import Image from 'next/image'
export default function About2() {
  return (
    <section className="bg-[#F3FFF6] w-full py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col justify-between md:flex-row items-center">
          {/* Left section */}
          <div className="md:w-[45%] flex flex-col gap-4">
            <p className="text-gray-600">Hur fungerar det?</p>
            <h3 className="text-xl md:text-4xl font-bold text-[#004E49]">
              Så här enkelt får du recept på fästingmedel av våra veterinärer
            </h3>
            <button className="bg-[#004E49] w-[60%] mt-4 text-white px-8 py-2 rounded-md hover:bg-opacity-90 transition-colors">
              Få recept
            </button>
          </div>

          {/* Vertical Divider */}
          <div className="hidden md:block w-[2px] bg-[#004E49] self-stretch"></div>

          {/* Right section */}
          <div className="md:w-[45%] space-y-12">
            <div className="flex items-start gap-6">
              <Image
                src="/images/landing/1.png"
                alt="Form"
                width={70}
                height={70}
                className="mt-1"
              />
              <div>
                <h3 className="font-medium text-[#004E49]">
                  Fyll i hälsoformuläret
                </h3>
                <p className="text-sm text-[#004E49] mt-1">
                  Besvara frågorna för att säkerställa att behandlingen är rätt
                  för din hund eller katt.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <Image
                src="/images/landing/2.png"
                alt="Payment"
                width={70}
                height={70}
                className="mt-1"
              />
              <div>
                <h3 className="font-medium text-[#004E49]">
                  Identifiera & betala
                </h3>
                <p className="text-sm text-[#004E49] mt-1">
                  Identifiera dig med BankID och betala 199kr.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <Image
                src="/images/landing/3.png"
                alt="Prescription"
                width={70}
                height={70}
                className="mt-1"
              />
              <div>
                <h3 className="font-medium text-[#004E49]">Recept samma dag</h3>
                <p className="text-sm text-[#004E49] mt-1">
                  Vår veterinär går igenom din frågeformulär och utfärdar
                  recept. Du kan sedan köpa ditt fästingmedel på ett online
                  apotek.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
