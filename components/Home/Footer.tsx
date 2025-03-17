import Image from 'next/image'



// Footer component for VetOnline
const Footer = () => {
    return (
      <footer className="bg-teal-800 text-white">
        <div className="container mx-auto py-12">
          {/* Logo section */}
          <div className="flex justify-center mb-12">
            <div className="w-32">
              <Image 
                src="/images/landing/logo.png" 
                alt="VetOnline" 
                width={120} 
                height={30} 
              />
            </div>
          </div>
          
          {/* Footer links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto px-4">
            {/* Left column - main links */}
            <div className="space-y-2">
              <a href="#" className="block hover:text-teal-200">Hem</a>
              <a href="#" className="block hover:text-teal-200">Diagnoser</a>
              <a href="#" className="block hover:text-teal-200">Fakta & råd</a>
              <a href="#" className="block hover:text-teal-200">Om oss</a>
              <a href="#" className="block hover:text-teal-200">Frågor & svar</a>
              <a href="#" className="block hover:text-teal-200">Kontakta oss</a>
              <a href="#" className="block hover:text-teal-200">Jobba på VetOnline</a>
            </div>
            
            {/* Middle column - empty or with a divider */}
            <div className="hidden md:block">
              <div className="border-t border-teal-700 mt-4"></div>
            </div>
            
            {/* Right column - legal and social links */}
            <div className="space-y-2">
              <a href="#" className="block hover:text-teal-200">Allmänna villkor</a>
              <a href="#" className="block hover:text-teal-200">Integritetspolicy</a>
              
              {/* Social media icons */}
              <div className="flex space-x-4 mt-8">
                <a href="#" className="hover:text-teal-200">
                  <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm3 5.5h-1.5c-.54 0-.9.36-.9.8V10h2.4l-.4 2h-2v5h-2v-5H9v-2h2V8.5C11 6.57 12.14 5.5 14 5.5h1v2z"/>
                    </svg>
                  </div>
                </a>
                <a href="#" className="hover:text-teal-200">
                  <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm2.5 7.5A2.5 2.5 0 0014 12a2.5 2.5 0 00-2.5 2.5A2.5 2.5 0 009 12a2.5 2.5 0 002.5-2.5 2.5 2.5 0 002.5 2.5 2.5 2.5 0 002.5-2.5 2.5 2.5 0 00-2.5-2.5zM12 17.5c-3.038 0-5.5-1.343-5.5-3 0-1.024 1.04-1.916 2.5-2.415.5.64 1.33 1.165 3 1.165s2.5-.526 3-1.165c1.46.5 2.5 1.39 2.5 2.415 0 1.657-2.462 3-5.5 3z"/>
                    </svg>
                  </div>
                </a>
              </div>
              
              {/* Copyright info */}
              <div className="text-xs text-teal-300 mt-6">
                <p>Telefontider: Mån-Fre 8-17</p>
                <p>Utvecklad av: Hoi AB | © 2023 VetOnline</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  };

  export default Footer;