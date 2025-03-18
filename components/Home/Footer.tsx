import Image from 'next/image'
import FacebookSvg from '@/public/footer/facebook.svg'
import InstagramSvg from '@/public/footer/instagram.svg'
import Logo from './Logo'
import Link from 'next/link'

const FooterItemsName = [
  'Hem',
  'Diagnoser',
  'Fakta & råd',
  'Om oss',
  'Frågor & svar',
  'Kontakta oss',
  'Jobba på VetOnline',
]

const Footer = () => {
  return (
    <>
      <Logo />
      <footer className="bg-[#004E49] text-white">
        <div className="container mx-auto py-12 w-[90%] md:w-[60%]">
          <h1 className="md:hidden flex ml-4">Öppet dygnet runt!</h1>
          <div className="flex justify-between flex-col md:flex-row  mx-auto px-4 py-10">
            <div className="space-y-2 border-t-[1px] w-[100%] md:w-[40%]">
              <div className="flex flex-col gap-4 pt-10 pb-10 md:pb-0">
                {FooterItemsName.map((item) => {
                  return (
                    <Link
                      href={''}
                      className="text-sm md:text-base block hover:text-teal-200"
                    >
                      {item}
                    </Link>
                  )
                })}
              </div>
            </div>

            <div className="space-y-2 border-t-[1px] w-[100%] md:w-[40%]">
              <div className="flex flex-col pt-10">
                <div className="flex gap-4 flex-col">
                  <Link href="#" className="text-sm md:text-base">
                    Allmänna villkor
                  </Link>
                  <Link href="#" className="text-sm md:text-base">
                    Integritetspolicy
                  </Link>
                </div>

                <div className="flex space-x-2 mt-14 md:mx-0 mx-auto">
                  <Link href={''}>
                    <div className="w-8 h-8 rounded-full bg-opacity-20 flex items-center justify-center">
                      <Image src={FacebookSvg} alt="facebook" />
                    </div>
                  </Link>
                  <Link href={''}>
                    <div className="w-8 h-8 rounded-full bg-opacity-20 flex items-center justify-center">
                      <Image src={InstagramSvg} alt="Instagram" />
                    </div>
                  </Link>
                </div>

                {/* Copyright info */}
                <div className="text-xs text-white mt-6 flex flex-col text-center md:text-justify gap-1 pb-10 md:pb-0">
                  <p>VetOnline.se ägs och drivs av</p>
                  <p>eHealthcare Group AB (559322-9858)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
