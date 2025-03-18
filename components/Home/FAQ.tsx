'use client'

import { useState, useEffect, useRef } from 'react'
import { Plus, Minus, X } from 'lucide-react'
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
  const isMobile = useIsMobile()
  const faqContainerRef = useRef<HTMLDivElement>(null)
  const answerRefs = useRef<Array<HTMLDivElement | null>>([])

  // Pre-calculate heights for smooth transitions
  useEffect(() => {
    // Initialize the refs array with the correct length
    answerRefs.current = Array(FAQArray.length).fill(null)
  }, [])

  const toggleFAQ = (index: number) => {
    // If closing the last accordion, scroll to keep position stable
    if (openIndex === index && index === FAQArray.length - 1) {
      const currentPosition = window.scrollY
      setOpenIndex(null)
      // Maintain scroll position after state update
      setTimeout(() => window.scrollTo(0, currentPosition), 0)
    } else {
      setOpenIndex(openIndex === index ? null : index)
    }
  }

  return (
    <section className="bg-[#F3FFF6] md:bg-white py-14 border-gray-200">
      <div className="w-[90%] md:w-[80%] mx-auto flex flex-row">
        <div className="flex flex-col md:flex-row md:gap-0 gap-6 items-center">
          <div className="flex flex-col gap-2 md:w-1/2">
            <div className="w-[100%] md:w-[80%] flex flex-col gap-3">
              <p className="text-[#787878] text-sm">
                {isMobile ? 'Frågor & svar' : 'Följ upp och svar'}
              </p>
              <h2 className="text-xl md:text-4xl font-bold text-[#004E49] mb-4">
                Läs veterinärens svar på era frågor
              </h2>
              {!isMobile && (
                <button className="bg-[#004E49] shadow-lg shadow-gray-400 text-white w-[80%] py-2 rounded-md font-medium">
                  Få recept nu
                </button>
              )}
            </div>
          </div>

          {/* Right side - FAQ */}
          <div
            className="w-full md:w-2/3 md:border-l-2 border-[#004E49]"
            ref={faqContainerRef}
          >
            <div className="flex flex-col md:ml-6">
              {FAQArray.map((faq, index) => (
                <div key={index} className="mb-1">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex justify-between items-center py-3 text-left focus:outline-none"
                  >
                    <span className="flex flex-row items-center gap-2 text-sm text-[#004E49] tracking-wider">
                      {openIndex === index ? (
                        <Minus width={17} height={17} color="#004E49" />
                      ) : (
                        <Plus width={17} height={17} color="#004E49" />
                      )}
                      {faq.question}
                    </span>
                  </button>
                  {/* Using a fixed height container with conditional rendering */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openIndex === index ? 'max-h-32' : 'max-h-0'
                    }`}
                  >
                    <div
                      ref={(el) => (answerRefs.current[index] = el)}
                      className="relative"
                    >
                      <p className="text-sm text-[#004E49] tracking-wider bg-[#B2FFE4] py-3 px-6">
                        {faq.answer}
                      </p>
                      <X
                        onClick={() => toggleFAQ(index)}
                        className="absolute top-0 right-0 cursor-pointer"
                        color="#004E49"
                        width={20}
                        height={20}
                      />
                    </div>
                  </div>
                </div>
              ))}

              {isMobile && (
                <button className="bg-teal-800 text-white w-[100%] px-14 py-1 rounded-md font-medium mt-4">
                  Få recept
                </button>
              )}
            </div>

            <div className="ml-6 mt-4 md:text-left text-center">
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
