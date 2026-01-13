'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'

// Animated Counter Component
function Counter({ end, suffix = '', prefix = '' }: { end: number; suffix?: string; prefix?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 60
      const increment = end / steps
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)
      return () => clearInterval(timer)
    }
  }, [isInView, end])

  return (
    <span ref={ref} className="official-counter">
      {prefix}{count}{suffix}
    </span>
  )
}

// Navigation
function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-pure-white shadow-sm' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white shadow border border-gray-200">
              <Image
                src="/images/logo.png"
                alt="Sashyashree Logo"
                fill
                className="object-contain p-1"
              />
            </div>
            <div>
              <span className={`font-display text-xl tracking-tight ${scrolled ? 'text-institution-green' : 'text-institution-green'}`}>Sashyashree Agri</span>
              <span className={`block text-xs font-mono ${scrolled ? 'text-steel-gray opacity-60' : 'text-steel-gray opacity-70'}`}>EST. 1992</span>
            </div>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {['About', 'Products', 'Quality', 'Partners'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`font-body text-base font-medium transition-colors ${
                  scrolled ? 'text-steel-gray hover:text-institution-green' : 'text-steel-gray hover:text-institution-green'
                }`}
              >
                {item}
              </a>
            ))}
          </div>

          {/* CTA & Mobile Menu */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden sm:inline-flex px-5 py-2.5 bg-institution-green text-pure-white font-accent text-base hover:bg-opacity-90 transition-colors"
            >
              Contact Us
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                scrolled ? 'text-institution-green hover:bg-institution-green/10' : 'text-institution-green hover:bg-institution-green/10'
              }`}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <motion.div
        initial={false}
        animate={mobileMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-pure-white/98 backdrop-blur-md"
      >
        <div className="px-6 py-4 space-y-3 border-t border-institution-green/10">
          {['About', 'Products', 'Quality', 'Partners'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMobileMenuOpen(false)}
              className="block font-body text-base font-medium text-steel-gray hover:text-institution-green transition-colors py-2"
            >
              {item}
            </a>
          ))}
          <a
            href="tel:+918001926461"
            className="flex items-center justify-center gap-2 mt-4 px-6 py-3 bg-institution-green text-pure-white font-body font-semibold text-base hover:bg-opacity-90 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            Call Now
          </a>
        </div>
      </motion.div>
    </motion.nav>
  )
}

// Hero Section with Seal Animation
function HeroSection() {
  const [sealAnimated, setSealAnimated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setSealAnimated(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center relative linen-texture pt-20 overflow-hidden">
      {/* Subtle Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230F4C35' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        {/* Animated Seal */}
        <motion.div
          initial={{ scale: 3, rotate: -15, opacity: 0 }}
          animate={sealAnimated ? { scale: 1, rotate: 0, opacity: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <div className="quality-seal mx-auto">
            <div className="text-center text-pure-white relative z-10">
              <div className="text-xs font-mono tracking-widest opacity-80">CERTIFIED</div>
              <div className="text-2xl font-display mt-1">Quality</div>
              <div className="text-xs font-mono tracking-widest opacity-80 mt-1">SEEDS</div>
            </div>
          </div>
        </motion.div>

        {/* Since Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="verification-badge mx-auto mb-8"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Established 1992 • West Bengal, India
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="text-institution-green mb-6"
        >
          Sashyashree Agri Processing
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="font-accent text-xl md:text-2xl text-steel-gray italic mb-8"
        >
          "Good Seeds Only Can Make High Yield"
        </motion.p>

        {/* Rule Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="rule-line w-48 mx-auto mb-8"
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="max-w-xl mx-auto text-steel-gray mb-10"
        >
          Three decades of unwavering commitment to agricultural excellence.
          Serving farmers across Eastern India with certified, premium quality seeds.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#products"
            className="px-8 py-3 bg-institution-green text-pure-white font-accent text-sm tracking-wide hover:bg-opacity-90 transition-all"
          >
            View Catalogue
          </a>
          <a
            href="#partners"
            className="px-8 py-3 border-2 border-institution-green text-institution-green font-accent text-sm tracking-wide hover:bg-institution-green hover:text-pure-white transition-all"
          >
            Become a Partner
          </a>
        </motion.div>
      </div>

    </section>
  )
}

// Credentials Bar
function CredentialsBar() {
  const credentials = [
    { value: 32, suffix: '+', label: 'Years of Service' },
    { value: 5, suffix: '', label: 'States Covered' },
    { value: 15, suffix: '+', label: 'Seed Varieties' },
    { value: 10000, suffix: '+', label: 'Farmers Served' },
  ]

  return (
    <section className="py-16 bg-institution-green">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {credentials.map((cred, index) => (
            <motion.div
              key={cred.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-display text-certificate-gold mb-2">
                <Counter end={cred.value} suffix={cred.suffix} />
              </div>
              <div className="text-pure-white text-sm font-mono tracking-wide opacity-80">
                {cred.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// About Section
function AboutSection() {
  return (
    <section id="about" className="py-24 bg-pure-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="certificate-border p-4">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&h=750&fit=crop"
                  alt="Agricultural Field"
                  fill
                  className="object-cover grayscale"
                />
                <div className="absolute inset-0 bg-institution-green mix-blend-overlay opacity-20" />
              </div>
            </div>
            {/* Founder Badge */}
            <div className="absolute -bottom-6 -right-6 bg-document-cream p-6 shadow-lg max-w-xs">
              <div className="text-xs font-mono text-certificate-gold tracking-widest mb-2">FOUNDER & MD</div>
              <div className="font-display text-xl text-institution-green">Mr. Jagannath Das</div>
              <div className="text-sm text-steel-gray mt-1">Visionary since 1992</div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="verification-badge mb-6">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Official Company Profile
            </div>

            <h2 className="text-institution-green mb-6">Our Heritage of Trust</h2>

            <div className="gold-accent w-16 mb-8" />

            <p className="text-steel-gray mb-6">
              Founded in 1992 as Santosh Seed Centre in Kashtadahi, Arambag, West Bengal,
              we began our journey with a simple mission: to provide farmers with the
              highest quality seeds for optimal yields.
            </p>

            <p className="text-steel-gray mb-8">
              Today, as Sashyashree Agri Processing Pvt. Ltd., we serve thousands of
              farmers across five Eastern Indian states, maintaining the same commitment
              to quality that defined our humble beginnings.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 bg-document-cream">
                <div className="text-xs font-mono text-certificate-gold tracking-widest mb-1">VISION</div>
                <div className="text-sm text-steel-gray">Leading seed production company with innovation and excellence</div>
              </div>
              <div className="p-4 bg-document-cream">
                <div className="text-xs font-mono text-certificate-gold tracking-widest mb-1">MISSION</div>
                <div className="text-sm text-steel-gray">Deliver superior seeds through quality control and customer care</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Products Section
function ProductsSection() {
  const products = [
    {
      name: 'Paddy Seeds',
      varieties: ['Jamini', 'Badsha Bhog', 'Swarnamoti', 'Disha'],
      image: '/images/products/jamini.png',
      isProduct: true,
      code: 'PD-001',
    },
    {
      name: 'Mustard Seeds',
      varieties: ['Sohini (B-9 Special)', 'Premium Quality'],
      image: '/images/products/sohini.png',
      isProduct: true,
      code: 'OS-002',
    },
    {
      name: 'Aromatic Rice',
      varieties: ['Badsha Bhog', 'Premium Aromatic'],
      image: '/images/products/badsha-bhog.png',
      isProduct: true,
      code: 'AR-003',
    },
    {
      name: 'Fodder Seeds',
      varieties: ['SSG-106 Sudan Grass', 'Hybrid Bajra'],
      image: '/images/products/ssg-106.png',
      isProduct: true,
      code: 'FD-004',
    },
    {
      name: 'Maize Seeds',
      varieties: ['SMS-4025', 'SMS-4055 Hybrid'],
      image: '/images/products/sms-4055.png',
      isProduct: true,
      code: 'MZ-005',
    },
    {
      name: 'Sesame Seeds',
      varieties: ['Usha', 'High-Yield Varieties'],
      image: '/images/products/usha.png',
      isProduct: true,
      code: 'SS-006',
    },
  ]

  return (
    <section id="products" className="py-24 linen-texture">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="verification-badge mx-auto mb-6">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Certified Product Range
          </div>
          <h2 className="text-institution-green mb-4">Premium Seed Collection</h2>
          <div className="gold-accent w-24 mx-auto mb-6" />
          <p className="max-w-2xl mx-auto text-steel-gray">
            Each variety undergoes rigorous quality testing to ensure optimal germination
            rates and crop yields for our valued farmers.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}
              className="certificate-card overflow-hidden transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-document-cream to-white">
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <motion.div
                    className="relative w-24 h-36"
                    whileHover={{ scale: 1.08, rotate: 2 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain drop-shadow-lg"
                    />
                  </motion.div>
                </div>
                <div className="absolute top-4 right-4 bg-pure-white px-3 py-1 shadow-sm">
                  <span className="font-mono text-xs text-institution-green">{product.code}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-institution-green mb-3">{product.name}</h3>
                <div className="space-y-2">
                  {product.varieties.map((variety) => (
                    <div key={variety} className="flex items-center gap-2 text-sm text-steel-gray">
                      <div className="w-1.5 h-1.5 bg-certificate-gold rounded-full" />
                      {variety}
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <a href="#" className="flex items-center gap-2 text-sm font-accent text-institution-green hover:text-certificate-gold transition-colors">
                    View Specifications
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Catalogue CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a
            href="#"
            className="inline-flex items-center gap-3 px-8 py-4 bg-institution-green text-pure-white font-accent tracking-wide hover:bg-opacity-90 transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Complete E-Catalogue
          </a>
        </motion.div>
      </div>
    </section>
  )
}

// Quality Standards Section
function QualitySection() {
  const [openIndex, setOpenIndex] = useState(0)

  const standards = [
    {
      title: 'Seed Purity',
      value: '99.5%',
      description: 'Our seeds undergo multiple rounds of cleaning and sorting to ensure the highest purity levels, removing any foreign matter or damaged seeds.',
    },
    {
      title: 'Germination Rate',
      value: '95%+',
      description: 'Rigorous germination testing in controlled laboratory conditions guarantees optimal sprouting rates for maximum crop establishment.',
    },
    {
      title: 'Moisture Content',
      value: '<12%',
      description: 'Precise moisture control during storage and packaging prevents fungal growth and maintains seed viability for extended periods.',
    },
    {
      title: 'Genetic Purity',
      value: '98%+',
      description: 'Maintained through isolation, roguing, and proper field inspections to preserve variety characteristics across generations.',
    },
  ]

  return (
    <section id="quality" className="py-24 bg-pure-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Content */}
          <div>
            <div className="verification-badge mb-6">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Quality Assurance Standards
            </div>

            <h2 className="text-institution-green mb-6">Our Commitment to Excellence</h2>

            <div className="gold-accent w-16 mb-8" />

            <p className="text-steel-gray mb-8">
              Every batch of seeds is tested in accordance with national seed certification
              standards. Our quality control process ensures that only the finest seeds
              reach our valued farmers.
            </p>

            {/* Quality Seal */}
            <div className="bg-document-cream p-8 text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full border-4 border-institution-green mb-4">
                <svg className="w-12 h-12 text-institution-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="font-display text-xl text-institution-green mb-2">Quality Guaranteed</div>
              <div className="text-sm text-steel-gray">Government Certified Seed Processing Unit</div>
            </div>
          </div>

          {/* Right - Accordion */}
          <div className="space-y-4">
            {standards.map((standard, index) => (
              <motion.div
                key={standard.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  className="w-full px-6 py-5 flex items-center justify-between bg-pure-white hover:bg-document-cream transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-2xl text-certificate-gold">{standard.value}</span>
                    <span className="font-accent text-institution-green">{standard.title}</span>
                  </div>
                  <svg
                    className={`w-5 h-5 text-steel-gray transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === index ? 'auto' : 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 text-steel-gray text-sm">
                    {standard.description}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sunirmal Paria',
      nameBn: 'সুনির্মল পাড়িয়া',
      location: 'West Midnapore, West Bengal',
      quote: 'I have been cultivating Swarnamoti and Badsha Bhog paddy seeds for years. Getting 2000-2100 kg yield per acre consistently.',
      yield: '2100 kg/acre',
      image: '/images/farmers/sunirmal.jpg',
      verified: true,
    },
    {
      name: 'Malay Singh',
      nameBn: 'মলয় সিংহ',
      location: 'West Burdwan, West Bengal',
      quote: 'Every farmer in our area prefers Sohini mustard seeds. Getting 350 kg per bigha - unmatched quality.',
      yield: '350 kg/bigha',
      image: '/images/farmers/malai.jpg',
      verified: true,
    },
    {
      name: 'Sadhan Mondal',
      nameBn: 'সাধন মন্ডল',
      location: 'Bankura, West Bengal',
      quote: 'The production of Sashyashree Usha sesame seeds is truly unbelievable. Very profitable harvest every season.',
      yield: 'High Profit',
      image: '/images/farmers/sadhan.jpg',
      verified: true,
    },
  ]

  return (
    <section className="py-24 linen-texture">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="verification-badge mx-auto mb-6">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Verified Testimonials
          </div>
          <h2 className="text-institution-green mb-4">Trusted by Farmers</h2>
          <div className="gold-accent w-24 mx-auto" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="certificate-card p-8"
            >
              {/* Farmer Photo */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-certificate-gold/30">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-accent text-institution-green">{testimonial.name}</div>
                  <div className="text-xs text-steel-gray/70 font-mono">{testimonial.nameBn}</div>
                </div>
              </div>

              {/* Quote */}
              <div className="relative mb-6">
                <svg className="absolute -top-2 -left-2 w-8 h-8 text-certificate-gold/20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-steel-gray italic pl-6">"{testimonial.quote}"</p>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-steel-gray">{testimonial.location}</div>
                    <div className="text-xs font-mono text-certificate-gold mt-1">Yield: {testimonial.yield}</div>
                  </div>
                  {testimonial.verified && (
                    <div className="flex items-center gap-1 text-institution-green">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs font-mono">Verified</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Partnership Section
function PartnershipSection() {
  const benefits = [
    {
      title: 'Exclusive Pricing',
      description: 'Special dealer rates and volume discounts',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&q=80',
    },
    {
      title: 'Priority Stock',
      description: 'First access to new varieties and limited stock',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&q=80',
    },
    {
      title: 'Marketing Support',
      description: 'POS materials and promotional assistance',
      image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=300&q=80',
    },
    {
      title: 'Technical Training',
      description: 'Product knowledge and agronomic support',
      image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=300&q=80',
    },
    {
      title: 'Credit Facilities',
      description: 'Flexible payment terms for qualified partners',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=300&q=80',
    },
    {
      title: 'Territory Rights',
      description: 'Protected distribution areas where applicable',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=300&q=80',
    },
  ]

  return (
    <section id="partners" className="py-24 bg-institution-green">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="text-xs font-mono text-certificate-gold tracking-widest mb-6">
              DEALER PARTNERSHIP PROGRAM
            </div>
            <h2 className="text-pure-white mb-6">Grow With Us</h2>
            <div className="w-16 h-1 bg-certificate-gold mb-8" />
            <p className="text-pure-white opacity-80 mb-8">
              Join our network of authorized dealers across Eastern India.
              We offer comprehensive support to help you succeed in serving
              the agricultural community.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-certificate-gold text-institution-green font-accent text-sm tracking-wide hover:bg-opacity-90 transition-all"
            >
              Apply for Dealership
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Right - Benefits Grid with Images */}
          <div className="grid grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={benefit.image}
                    alt={benefit.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-institution-green/90 via-institution-green/50 to-institution-green/30 group-hover:from-institution-green/80 group-hover:via-institution-green/40 transition-colors" />
                </div>
                {/* Content */}
                <div className="relative p-6">
                  <div className="font-accent text-pure-white mb-2">{benefit.title}</div>
                  <div className="text-sm text-pure-white opacity-70">{benefit.description}</div>
                </div>
                {/* Gold accent line */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-certificate-gold group-hover:w-full transition-all duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Contact Section
function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-pure-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <div className="verification-badge mb-6">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Official Contact
            </div>

            <h2 className="text-institution-green mb-6">Get in Touch</h2>
            <div className="gold-accent w-16 mb-8" />

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-document-cream flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-institution-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-accent text-institution-green mb-1">Registered Office</div>
                  <div className="text-steel-gray text-sm">
                    Kashtadahi, P.O. Kashtadahi<br />
                    P.S. Arambag, Dist. Hooghly<br />
                    West Bengal 712413, India
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-document-cream flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-institution-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="font-accent text-institution-green mb-1">Phone</div>
                  <div className="text-steel-gray text-sm font-mono">+91 98765 43210</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-document-cream flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-institution-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="font-accent text-institution-green mb-1">Email</div>
                  <div className="text-steel-gray text-sm font-mono">info@sashyashreeagri.in</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="certificate-card p-8">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-accent text-institution-green mb-2">Full Name *</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-200 focus:border-institution-green focus:outline-none transition-colors font-body"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-accent text-institution-green mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-200 focus:border-institution-green focus:outline-none transition-colors font-body"
                    placeholder="+91"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-accent text-institution-green mb-2">Email Address</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-200 focus:border-institution-green focus:outline-none transition-colors font-body"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-accent text-institution-green mb-2">Inquiry Type</label>
                <div className="relative">
                  <select className="w-full px-4 py-3 pr-10 border border-gray-200 focus:border-institution-green focus:outline-none transition-colors font-body bg-white appearance-none cursor-pointer">
                    <option>General Inquiry</option>
                    <option>Product Information</option>
                    <option>Dealership Application</option>
                    <option>Complaint / Feedback</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-institution-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-accent text-institution-green mb-2">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 focus:border-institution-green focus:outline-none transition-colors font-body resize-none"
                  placeholder="How can we help you?"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-institution-green text-pure-white font-accent text-sm tracking-wide hover:bg-opacity-90 transition-all"
              >
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="bg-document-cream border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Company */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-14 h-14 rounded-full overflow-hidden bg-white shadow border border-gray-200">
                <Image
                  src="/images/logo.png"
                  alt="Sashyashree Logo"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div>
                <span className="font-display text-xl text-institution-green">Sashyashree Agri</span>
                <span className="block text-xs font-mono text-steel-gray">Processing Pvt. Ltd.</span>
              </div>
            </div>
            <p className="text-steel-gray text-base mb-6 max-w-sm">
              Premium quality agricultural seeds since 1992. Serving farmers
              across West Bengal, Bihar, Jharkhand, Orissa, and Assam.
            </p>
            <div className="verification-badge mb-6">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Government Registered
            </div>
            {/* Social Links */}
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-gray-300 flex items-center justify-center text-steel-gray hover:bg-institution-green hover:text-pure-white hover:border-institution-green transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-gray-300 flex items-center justify-center text-steel-gray hover:bg-institution-green hover:text-pure-white hover:border-institution-green transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-gray-300 flex items-center justify-center text-steel-gray hover:bg-institution-green hover:text-pure-white hover:border-institution-green transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-gray-300 flex items-center justify-center text-steel-gray hover:bg-institution-green hover:text-pure-white hover:border-institution-green transition-colors">
                <span className="sr-only">YouTube</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="text-xs font-mono text-certificate-gold tracking-widest mb-6">QUICK LINKS</div>
            <ul className="space-y-3">
              {['About Us', 'Products', 'Quality Standards', 'Dealers', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-steel-gray text-base hover:text-institution-green transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <div className="text-xs font-mono text-certificate-gold tracking-widest mb-6">LEGAL</div>
            <ul className="space-y-3">
              {['Privacy Policy', 'Terms of Service', 'Refund Policy', 'Disclaimer'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-steel-gray text-base hover:text-institution-green transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-base text-steel-gray">
            © {new Date().getFullYear()} Sashyashree Agri Processing Pvt. Ltd. All rights reserved.
          </div>
          <div className="text-xs font-mono text-steel-gray opacity-60">
            CIN: U01100WB1992PTC012345
          </div>
        </div>
      </div>
    </footer>
  )
}

// WhatsApp Button
function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919876543210"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-btn w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg"
    >
      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  )
}

// Main Page
export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <CredentialsBar />
      <AboutSection />
      <ProductsSection />
      <QualitySection />
      <TestimonialsSection />
      <PartnershipSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
