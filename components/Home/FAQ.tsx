'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import useIsMobile from '@/hooks/useIsMobile'

const FAQArray = [
  {
    question: 'Vad är RecceptOnline?',
    answer:
      'För att använda vår tjänst behöver du ha fyllt 18 år och ha tillgång till mobilt BankID.',
  },
  {
    question: 'Hur fungerar RecceptOnline?',
    answer:
      'För att använda vår tjänst behöver du ha fyllt 18 år och ha tillgång till mobilt BankID.',
  },
  {
    question: 'Var kan jag hämta ut mitt läkemedel?',
    answer:
      'För att använda vår tjänst behöver du ha fyllt 18 år och ha tillgång till mobilt BankID.',
  },
  {
    question: 'Vilka läkemedel/behandlingar erbjuder ni på RecceptOnline?',
    answer:
      'För att använda vår tjänst behöver du ha fyllt 18 år och ha tillgång till mobilt BankID.',
  },
  {
    question: 'Vad krävs för att få använda tjänsten?',
    answer:
      'För att använda vår tjänst behöver du ha fyllt 18 år och ha tillgång till mobilt BankID.',
  },
  {
    question: 'Vad kostar det?',
    answer:
      'För att använda vår tjänst behöver du ha fyllt 18 år och ha tillgång till mobilt BankID.',
  },
  {
    question: 'Hur lång tid tar det från jag får mitt recept?',
    answer:
      'För att använda vår tjänst behöver du ha fyllt 18 år och ha tillgång till mobilt BankID.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(1)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }
  const isMobile = useIsMobile()

  return (
    <section className="py-14 border-gray-200">
      <div className="w-[80%] mx-auto flex flex-row">
        <div className="flex flex-col md:flex-row md:gap-0 gap-6 items-center">
          <div className="flex flex-col gap-2 md:w-1/2">
            <div className="w-[80%] flex flex-col gap-3">
              <p className="text-[#787878] text-sm">Följ upp och svar</p>
              <h2 className="text-xl md:text-4xl font-bold text-[#004E49] mb-4">
                Läs veterinärens svar på era frågor
              </h2>
              {!isMobile && (
                <button className="bg-[#004E49] shadow-lg shadow-gray-400 text-white w-[80%] py-2 rounded-md font-medium">
                  Få recept
                </button>
              )}
            </div>
          </div>

          {/* Right side - FAQ */}
          <div className="md:w-2/3  md:border-l-2 border-[#004E49]">
            <div className="flex flex-col gap-4">
              {FAQArray.map((faq, index) => (
                <div key={index}>
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex justify-between items-center py-3 text-left focus:outline-none"
                  >
                    <span className="flex flex-row items-center gap-2 text-sm text-[#004E49] font-semibold tracking-wider">
                      {openIndex === index ? (
                        <Minus width={17} height={17} color="#004E49" />
                      ) : (
                        <Plus width={17} height={17} color="#004E49" />
                      )}
                      {faq.question}
                    </span>
                  </button>
                  {openIndex === index && (
                    <p className="text-sm text-[#004E49] tracking-wider bg-[#B2FFE4] py-3 px-6">
                      {faq.answer}
                    </p>
                  )}
                </div>
              ))}
              {isMobile && (
                <button className="bg-teal-800 text-white w-[100%] px-14 py-1 rounded-md font-medium">
                  Få recept
                </button>
              )}
            </div>

            <div className="mt-4 text-center">
              <span className="text-[#004E49] font-semibold underline cursor-pointer">
                Se fler frågor
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
