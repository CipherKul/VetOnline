import Image from 'next/image'
import { useState } from 'react'
import { Menu } from 'lucide-react'
import Link from 'next/link'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-[#004E49] text-sm text-white p-2">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl ml-4 p-4 font-bold">
          <Image
            src="/images/landing/logo.png"
            alt="VetOnline"
            width={150}
            height={120}
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex ml-150 space-x-8">
          <Link href="#" className="hover:underline">
            Fakta & råd
          </Link>
          <Link href="#" className="hover:underline">
            Hur går det till?
          </Link>
          <Link href="#" className="hover:underline">
            Frågor & svar
          </Link>
          <Link href="#" className="hover:underline">
            Om oss
          </Link>
        </nav>

        <button className="hidden md:block border border-white px-4 py-1 mr-4 rounded-md hover:bg-white hover:text-teal-900">
          Börja här
        </button>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden flex flex-col items-center bg-teal-800 text-white p-4 space-y-4">
          <Link href="#" className="hover:underline">
            Fakta & råd
          </Link>
          <Link href="#" className="hover:underline">
            Hur går det till?
          </Link>
          <Link href="#" className="hover:underline">
            Frågor & svar
          </Link>
          <Link href="#" className="hover:underline">
            Om oss
          </Link>
          <button className="border border-white px-4 py-2 rounded-md hover:bg-white hover:text-teal-900">
            Börja här
          </button>
        </nav>
      )}
    </nav>
  )
}
