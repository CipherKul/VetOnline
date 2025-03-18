'use client'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'
import useIsMobile from '@/hooks/useIsMobile'

const ReviewsSection = () => {
  const sliderRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth
      const newScrollLeft =
        direction === 'left'
          ? sliderRef.current.scrollLeft - scrollAmount
          : sliderRef.current.scrollLeft + scrollAmount

      sliderRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      })
    }
  }

  // Sample review data
  const reviews = [
    {
      id: 1,
      name: 'Anna L.',
      rating: 5,
      comment: 'Enkelt och snabbt! Fick recept till min hund inom en timme.',
      image: '/reviews/review1.jpg',
    },
    {
      id: 2,
      name: 'Lars P.',
      rating: 5,
      comment:
        'Fantastisk service! Slapp åka till veterinären med min stressade katt.',
      image: '/reviews/review2.jpg',
    },
    {
      id: 3,
      name: 'Maria J.',
      rating: 5,
      comment:
        'Smidigt sätt att få fästingmedel till mina hundar. Rekommenderar starkt!',
      image: '/reviews/review3.jpg',
    },
  ]

  // Generate review cards
  const reviewCards = reviews.map((review) => (
    <div
      key={review.id}
      className={`${
        isMobile ? 'snap-center shrink-0 w-[80vw]' : 'w-full md:w-[30%]'
      } bg-white rounded-lg shadow-lg overflow-hidden`}
    >
      <div>
        <Image
          src={review.image || '/placeholder.svg'}
          alt={`${review.name}'s pet`}
          width={300}
          height={200}
          className="rounded-t-lg w-full h-40 object-cover"
        />
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-[#004E49]">{review.name}</h3>
          <div className="flex">
            {[...Array(review.rating)].map((_, i) => (
              <Star
                key={i}
                className="h-4 w-4 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
        </div>
        <p className="text-[#004E49] text-sm">{review.comment}</p>
      </div>
    </div>
  ))

  return (
    <section className="py-12 bg-white md:bg-[#F3FFF6] shadow-xl">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-4">
          <span className="text-sm text-[#787878]">Läs deras historia</span>
        </div>

        <h2 className="text-2xl md:text-4xl font-bold text-[#004E49] text-center mb-8">
          Läs vad andra hund- och kattägare
          <br className="hidden md:block" />
          tycker om oss
        </h2>

        {isMobile ? (
          <div className="relative">
            <div
              ref={sliderRef}
              className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {reviewCards}
            </div>
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10"
              aria-label="Previous review"
            >
              <ChevronLeft className="text-[#004E49]" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10"
              aria-label="Next review"
            >
              <ChevronRight className="text-[#004E49]" />
            </button>
          </div>
        ) : (
          <div className="hidden md:flex flex-wrap justify-center gap-6">
            {reviewCards}
          </div>
        )}

        <div className="text-center mt-8 md:w-1/2 mx-auto">
          <button className="bg-[#004E49] text-white px-8 md:px-24 py-2 tracking-wide shadow-xl rounded-md hover:bg-opacity-90 transition-colors w-full md:w-auto">
            Få recept nu
          </button>
        </div>
      </div>
    </section>
  )
}

export default ReviewsSection
