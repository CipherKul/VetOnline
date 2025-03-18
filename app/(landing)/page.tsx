import Herosection from '@/components/Home/Hero'
import Midsection from '@/components/Home/midsection'
import Footer from '@/components/Home/Footer'
// import MidSection from '@/components/Home/MidSection'
// import ProductGrid from '@/components/Home/product/ProductGrid'

export default function Home() {
  return (
    <main>
      <Herosection />
      <Midsection />
      <Footer />
      {/* <ProductGrid />
      <AboutUsSection /> */}
      <section id="contact-section" className="bg-[#D9FCB4]"></section>
    </main>
  );
}