import Image from 'next/image'
import MasterCrad from '@/public/icons/mastercard.svg'
import ApplePayCrad from '@/public/icons/applepay.svg'
export default function Payment() {
  return (
    <section className="py-12 bg-[#F3FFF6] md:bg-white">
      <div className="container mx-auto px-4 max-w-5xl text-center">
        <div className="flex flex-row-reverse justify-between md:flex-row gap-2 md:justify-center items-center mb-6">
          <Image
            src="/images/landing/badge.png"
            alt="Check"
            width={24}
            height={24}
            className="text-[#004E49]"
          />
          <p className="text-sm text-[#004E49]">Betalningsmetoder</p>
        </div>

        <h3 className="text-3xl md:text-4xl text-justify md:text-center font-bold text-[#004E49] mb-8">
          Vi erbjuder följande trygga betalsätt
        </h3>

        <div className="container mx-auto flex flex-wrap md:justify-center items-center gap-6 md:gap-10">
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
            src={MasterCrad}
            alt="Mastercard"
            width={90}
            height={30}
            className="w-[90px] md:w-[120px]"
          />
          <Image
            src={ApplePayCrad}
            alt="Apple Pay"
            width={18}
            height={20}
            className="w-[75px] h-[60px] md:w-[100px]"
          />
        </div>
      </div>
    </section>
  )
}
