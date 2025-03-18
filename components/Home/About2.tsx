import Image from 'next/image'
export default function About2() {
  return (
    <section className="bg-white sm:bg-[#F3FFF6] w-full py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col justify-between md:flex-row items-center">
          {/* Left section */}
          <div className="w-full md:w-[45%] flex flex-col mb-6 md:mb-0">
            <p className="text-gray-600">Hur fungerar det?</p>
            <h3 className="text-2xl mt-2 md:text-4xl font-bold text-[#004E49]">
              Så här enkelt får du
            </h3>
            <h3 className="text-2xl md:text-4xl font-bold text-[#004E49]">
              recept på fästingmedel
            </h3>
            <h3 className="text-2xl  md:text-4xl font-bold text-[#004E49]">
              av våra veterinärer
            </h3>
            <button className="hidden md:block bg-[#004E49] shadow-xl shadow-gray-400  w-[60%] mt-4 text-white px-8 py-2 rounded-md hover:bg-opacity-90 transition-colors">
              Få recept
            </button>
          </div>

          {/* Vertical Divider */}
          <div className="hidden md:block w-[2px] bg-[#004E49] self-stretch"></div>

          {/* Right section */}
          <div className="md:w-[45%] space-y-6">
            <div className="flex items-center gap-6">
              <Image
                src="/images/landing/1.png"
                alt="Form"
                width={70}
                height={70}
                className="mt-1"
              />
              <div>
                <h3 className="font-medium text-[#004E49] text-tracking-spaced">
                  Fyll i hälsoformuläret
                </h3>
                <p className="text-sm text-[#004E49]">
                  Besvara frågorna för att säkerställa att behandlingen är rätt
                  för din hund eller katt.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <Image
                src="/images/landing/2.png"
                alt="Payment"
                width={70}
                height={70}
                className="mt-1"
              />
              <div>
                <h3 className="font-medium text-[#004E49] text-tracking-spaced">
                  Identifiera & betala
                </h3>
                <p className="text-sm text-[#004E49]">
                  Identifiera dig med BankID och betala 199kr med Swish.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <Image
                src="/images/landing/3.png"
                alt="Prescription"
                width={70}
                height={70}
                className="mt-1"
              />
              <div>
                <h3 className="font-medium text-[#004E49] text-tracking-spaced">
                  Recept samma dag
                </h3>
                <p className="text-sm text-[#004E49]">
                  Vår veterinären går igenom ditt hälsoformulär och skriver
                  recept på önskad behandling som du kan hämta ut på valfritt
                  apotek.
                </p>
              </div>
            </div>
            <div className="flex justify-center w-full">
              <button className="block sm:hidden bg-[#004E49] w-full mt-4 text-white px-24 py-2 rounded-md hover:bg-opacity-90 transition-colors">
                Få recept
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
