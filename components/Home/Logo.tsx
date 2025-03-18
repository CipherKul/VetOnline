'use client'
import useIsMobile from '@/hooks/useIsMobile'
import Image from 'next/image'

export default function Logo() {
  const isMobile = useIsMobile()
  return (
    <div className="w-full py-8 md:py-10 bg-[#F3FFF6]">
      <Image
        src={'/footer/footer-logo.png'}
        alt="Footer Logo"
        width={isMobile ? 200 : 250}
        height={isMobile ? 200 : 250}
        className="mx-auto"
      />
    </div>
  )
}
