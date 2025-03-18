import Image from 'next/image'
import FacebookSvg from '@/public/footer/facebook.svg'
import InstagramSvg from '@/public/footer/instagram.svg'
import Logo from './Logo'

const Footer = () => {
  return (
    <>
      <Logo />
      <footer className="bg-[#004E49] text-white">
        <div className="container mx-auto py-12 w-[90%] md:w-[60%]">
          {/* Footer links */}
          <h1 className="md:hidden flex ml-4">Öppet dygnet runt!</h1>
          <div className="flex justify-between flex-col md:flex-row  mx-auto px-4 py-10">
            {/* Left column - main links */}
            <div className="space-y-2 border-t-[1px] w-[100%] md:w-[40%]">
              <div className="flex flex-col gap-4 pt-10 pb-10 md:pb-0">
                <a href="#" className="block hover:text-teal-200">
                  Hem
                </a>
                <a href="#" className="block hover:text-teal-200">
                  Diagnoser
                </a>
                <a href="#" className="block hover:text-teal-200">
                  Fakta & råd
                </a>
                <a href="#" className="block hover:text-teal-200">
                  Om oss
                </a>
                <a href="#" className="block hover:text-teal-200">
                  Frågor & svar
                </a>
                <a href="#" className="block hover:text-teal-200">
                  Kontakta oss
                </a>
                <a href="#" className="block hover:text-teal-200">
                  Jobba på VetOnline
                </a>
              </div>
            </div>

            {/* Right column - legal and social links */}
            <div className="space-y-2 border-t-[1px] w-[100%] md:w-[40%]">
              <div className="flex flex-col pt-10">
                <div className="flex gap-4 flex-col">
                  <a href="#" className="block hover:text-teal-200">
                    Allmänna villkor
                  </a>
                  <a href="#" className="block hover:text-teal-200">
                    Integritetspolicy
                  </a>
                </div>

                {/* Social media icons */}
                <div className="flex space-x-2 mt-14">
                  <a href="#" className="hover:text-teal-200">
                    <div className="w-8 h-8 rounded-full bg-opacity-20 flex items-center justify-center">
                      <Image src={FacebookSvg} alt="facebook" />
                    </div>
                  </a>
                  <a href="#" className="hover:text-teal-200">
                    <div className="w-8 h-8 rounded-full bg-opacity-20 flex items-center justify-center">
                      <Image src={InstagramSvg} alt="Instagram" />
                    </div>
                  </a>
                </div>

                {/* Copyright info */}
                <div className="text-xs text-teal-300 mt-6 flex flex-col gap-2">
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
