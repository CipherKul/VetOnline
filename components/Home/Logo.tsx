import Image from 'next/image'

export default function Logo() {
  return (
    <div className="w-full py-10 bg-[#F3FFF6]">
      <Image
        src={'/footer/footer-logo.png'}
        alt="Footer Logo"
        width={250}
        height={250}
        className="mx-auto"
      />
    </div>
  )
}
