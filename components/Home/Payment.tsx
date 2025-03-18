import Image from 'next/image'

export default function Payment() {
  return (
    <section className="py-12 bg-[#F3FFF6] sm:bg-white">
       <div className="container mx-auto px-4 max-w-5xl text-center">
        <div className="flex gap-2 justify-center items-center mb-6">
          <Image
            src="/images/landing/badge.png"
            alt="Check"
            width={24}
            height={24}
            className="text-[#004E49]"
          />
          <p className="text-sm text-[#004E49]">Betalningsmetoder</p>
        </div>
        
        <h3 className="text-3xl md:text-4xl font-bold text-[#004E49] mb-8">
          Vi erbjuder följande trygga betalsätt
        </h3>
        
        <div className="container mx-auto flex flex-wrap justify-center items-center gap-6 md:gap-10">
          <Image
            src="/images/landing/klarna.png"
            alt="Klarna"
            width={90}
            height={30}
            className="w-[90px] md:w-[120px]"
          />
          <Image
            src="/images/landing/swish.png"
            alt="Swish"
            width={90}
            height={30}
            className="w-[90px] md:w-[120px]"
          />
          <Image
            src="/images/landing/visa.png"
            alt="VISA"
            width={90}
            height={30}
            className="w-[90px] md:w-[120px]"
          />
          <Image
            src="/images/landing/mastercard.png"
            alt="Mastercard"
            width={90}
            height={30}
            className="w-[90px] md:w-[120px]"
          />
          <Image
            src="/images/landing/applepay.png"
            alt="Apple Pay"
            width={75}
            height={18}
            className="w-[75px] md:w-[100px]"
          />
        </div>
      </div>
    </section>
  )
}