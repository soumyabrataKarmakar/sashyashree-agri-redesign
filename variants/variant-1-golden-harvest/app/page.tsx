'use client'

import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'

// ============================================
// FLOATING SEED PARTICLES COMPONENT
// ============================================
function FloatingSeeds() {
  const [seeds, setSeeds] = useState<Array<{
    id: number
    left: string
    top: string
    delay: number
    duration: number
    size: number
  }>>([])

  useEffect(() => {
    setSeeds(Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: 6 + Math.random() * 4,
      size: 6 + Math.random() * 8,
    })))
  }, [])

  if (seeds.length === 0) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {seeds.map((seed) => (
        <motion.div
          key={seed.id}
          className="absolute rounded-full"
          style={{
            left: seed.left,
            top: seed.top,
            width: seed.size,
            height: seed.size * 1.4,
            background: `linear-gradient(135deg, #C9A227 0%, #E8743B 100%)`,
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
          }}
          animate={{
            y: [0, -40, -20, -60, 0],
            x: [0, 10, -10, 5, 0],
            rotate: [0, 90, 180, 270, 360],
            opacity: [0.4, 0.7, 0.5, 0.8, 0.4],
          }}
          transition={{
            duration: seed.duration,
            delay: seed.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

// ============================================
// ANIMATED COUNTER COMPONENT
// ============================================
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 60
      const increment = value / steps
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)
      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  )
}

// ============================================
// NAVIGATION COMPONENT
// ============================================
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-cream-field/95 backdrop-blur-md shadow-lg' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative w-14 h-14 rounded-full overflow-hidden bg-white shadow-md border-2 border-harvest-gold/30">
            <Image
              src="/images/logo.png"
              alt="Sashyashree Logo"
              fill
              className="object-contain p-1"
            />
          </div>
          <div>
            <h1 className={`font-display font-bold text-xl ${scrolled ? 'text-rich-soil' : 'text-cream-field'}`}>Sashyashree</h1>
            <p className={`text-xs font-body ${scrolled ? 'text-rich-soil/60' : 'text-cream-field/70'}`}>Since 1992</p>
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {['Home', 'Products', 'About', 'Contact'].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`font-body text-base font-medium transition-colors relative group ${
                scrolled ? 'text-rich-soil/80 hover:text-harvest-gold' : 'text-cream-field/90 hover:text-harvest-gold'
              }`}
              whileHover={{ y: -2 }}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-harvest-gold transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
        </div>

        {/* Desktop CTA */}
        <motion.a
          href="tel:+918001926461"
          className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-harvest-gold text-rich-soil font-body font-semibold text-base rounded-full hover:bg-sunset-orange transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
          Call Now
        </motion.a>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden p-2 rounded-lg transition-colors ${
            scrolled ? 'text-rich-soil hover:bg-rich-soil/10' : 'text-cream-field hover:bg-cream-field/10'
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

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={mobileMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden overflow-hidden bg-cream-field shadow-lg"
      >
        <div className="px-6 py-4 space-y-1">
          {['Home', 'Products', 'About', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 text-lg font-body font-medium text-rich-soil hover:text-harvest-gold transition-colors border-b border-harvest-gold/20"
            >
              {item}
            </a>
          ))}
          <a
            href="tel:+918001926461"
            className="flex items-center justify-center gap-2 mt-4 px-6 py-3 bg-harvest-gold text-rich-soil font-body font-semibold text-base rounded-full hover:bg-sunset-orange transition-colors"
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

// ============================================
// HERO SECTION
// ============================================
function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=80"
          alt="Golden wheat field at harvest"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-rich-soil/80 via-rich-soil/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-rich-soil/60 via-transparent to-transparent" />
      </motion.div>

      {/* Grain Overlay */}
      <div className="absolute inset-0 grain-overlay z-10" />

      {/* Floating Seeds */}
      <FloatingSeeds />

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-20 max-w-7xl mx-auto px-6 py-32 md:py-40">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-1.5 bg-harvest-gold/20 border border-harvest-gold/40 rounded-full text-harvest-gold font-body text-sm font-medium backdrop-blur-sm">
              Trusted Since 1992
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-cream-field mb-6"
          >
            <span className="block text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight">
              Good Seeds
            </span>
            <span className="block text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight">
              Only Can Make
            </span>
            <span className="block text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight golden-text">
              High Yield
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-cream-field/80 text-lg md:text-xl font-body max-w-xl mb-10 leading-relaxed"
          >
            Eastern India&apos;s leading agricultural seeds producer, serving farmers across
            West Bengal, Bihar, Jharkhand, Orissa & Assam with premium quality seeds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <motion.a
              href="#products"
              className="px-8 py-4 bg-harvest-gold text-rich-soil font-body font-bold rounded-full hover:bg-sunset-orange transition-all duration-300 flex items-center gap-2 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Products
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
            <motion.a
              href="#contact"
              className="px-8 py-4 bg-transparent border-2 border-cream-field/40 text-cream-field font-body font-bold rounded-full hover:bg-cream-field/10 hover:border-cream-field transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Partner With Us
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-cream-field/60"
        >
          <span className="text-xs font-body tracking-widest uppercase">Scroll</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}

// ============================================
// TRUST STRIP SECTION
// ============================================
function TrustStrip() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const stats = [
    { value: 32, suffix: '+', label: 'Years of Excellence' },
    { value: 5, suffix: '', label: 'States Covered' },
    { value: 15, suffix: '+', label: 'Seed Varieties' },
    { value: 1000, suffix: '+', label: 'Happy Farmers' },
  ]

  return (
    <section ref={ref} className="relative py-16 bg-deep-green overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-harvest-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-harvest-gold/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-harvest-gold mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-cream-field/70 font-body text-sm md:text-base">
                {stat.label}
              </div>
              <div className="w-12 h-0.5 bg-harvest-gold/30 mx-auto mt-4" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// STORY PREVIEW SECTION
// ============================================
function StoryPreview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-cream-field paper-texture overflow-hidden">
      {/* Golden Mesh Background */}
      <div className="absolute inset-0 bg-golden-mesh opacity-50" />

      {/* Decorative Blob */}
      <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-96 h-96 bg-harvest-gold/10 blob-shape" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          {/* Text Content - 7 columns */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="md:col-span-7"
          >
            <span className="inline-block text-harvest-gold font-body font-semibold text-sm tracking-widest uppercase mb-4">
              Our Journey
            </span>
            <h2 className="text-rich-soil mb-6">
              Welcome to{' '}
              <span className="golden-text">Sashyashree Agri</span>
            </h2>
            <p className="text-rich-soil/70 mb-6">
              We are a leading seeds producing organization since 1992 in Eastern India.
              Mr. Jagannath Das, presently MD of the Company, is the founder who started
              this journey with a noble vision to serve the farming community.
            </p>
            <p className="text-rich-soil/70 mb-8">
              From humble beginnings as Santosh Seed Centre to becoming Sashyashree Agri
              Processing Pvt. Ltd., our commitment to quality and farmer prosperity has
              never wavered.
            </p>

            {/* Founder Quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative pl-6 border-l-4 border-harvest-gold"
            >
              <p className="font-accent italic text-xl text-rich-soil/80 mb-3">
                &ldquo;Our promise is to strive hard to produce the best quality seeds
                that bring happiness and prosperity to our farming community.&rdquo;
              </p>
              <cite className="font-body text-sm text-rich-soil/60 not-italic">
                — Mr. Jagannath Das, Founder & MD
              </cite>
            </motion.blockquote>

            <motion.a
              href="#about"
              className="inline-flex items-center gap-2 mt-8 text-harvest-gold font-body font-semibold hover:text-sunset-orange transition-colors group"
              whileHover={{ x: 5 }}
            >
              Know Our Full Story
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </motion.div>

          {/* Image - 5 columns with overlap */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80"
                alt="Indian farmer working in golden rice field"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rich-soil/40 to-transparent" />
            </div>
            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-deep-green text-cream-field p-6 rounded-2xl shadow-xl"
            >
              <div className="text-3xl font-display font-bold text-harvest-gold">32+</div>
              <div className="text-sm font-body">Years of Trust</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// PRODUCT CATEGORIES SECTION
// ============================================
function ProductCategories() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const products = [
    {
      name: 'Paddy Seeds',
      description: 'Hybrid, Improved & Notified varieties including aromatic Badsha Bhog and Swarnamoti',
      image: '/images/products/jamini.png',
      isProduct: true,
      count: '10+ Varieties',
    },
    {
      name: 'Oil Seeds',
      description: 'Premium Mustard (Sohini), Sesame (Usha) & Groundnut seeds',
      image: '/images/products/sohini.png',
      isProduct: true,
      count: '5+ Varieties',
    },
    {
      name: 'Aromatic Rice',
      description: 'Badsha Bhog - Premium aromatic rice for special occasions',
      image: '/images/products/badsha-bhog.png',
      isProduct: true,
      count: '3+ Varieties',
    },
    {
      name: 'Fodder Seeds',
      description: 'SSG-106 Sudan Grass & Hybrid Bajra for livestock nutrition',
      image: '/images/products/ssg-106.png',
      isProduct: true,
      count: '4+ Varieties',
    },
    {
      name: 'Maize Seeds',
      description: 'SMS-4025 & SMS-4055 Hybrid varieties for food and feed',
      image: '/images/products/sms-4055.png',
      isProduct: true,
      count: '3+ Varieties',
    },
    {
      name: 'Sesame Seeds',
      description: 'Usha - High-yielding sesame for oil production',
      image: '/images/products/usha.png',
      isProduct: true,
      count: '2+ Varieties',
    },
  ]

  return (
    <section id="products" ref={ref} className="relative py-24 md:py-32 bg-warm-cream diagonal-top overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-harvest-gold/10 blob-shape" />
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-sunset-orange/10 blob-shape" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-harvest-gold font-body font-semibold text-sm tracking-widest uppercase mb-4">
            What We Offer
          </span>
          <h2 className="text-rich-soil mb-4">
            Products We{' '}
            <span className="golden-text">Cultivate</span>
          </h2>
          <p className="text-rich-soil/60 font-body max-w-2xl mx-auto">
            Premium quality seeds across six categories, serving farmers throughout Eastern India
            with varieties suited for every season.
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-cream-field rounded-2xl overflow-hidden card-lift"
            >
              {/* Product Packet Display */}
              <div className="relative aspect-[4/3] bg-gradient-to-br from-harvest-gold/10 via-white to-sunset-orange/10">
                {/* Product Image */}
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <motion.div
                    className="relative w-32 h-44"
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain drop-shadow-xl"
                    />
                  </motion.div>
                </div>

                {/* Bottom gradient for text */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-rich-soil/90 via-rich-soil/60 to-transparent" />

                {/* Content Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col">
                  <span className="inline-block self-start px-3 py-1 bg-harvest-gold text-rich-soil text-xs font-body font-semibold rounded-full mb-2">
                    {product.count}
                  </span>
                  <h3 className="text-cream-field text-xl md:text-2xl font-display font-bold mb-1">
                    {product.name}
                  </h3>
                  <p className="text-cream-field/80 font-body text-sm line-clamp-2">
                    {product.description}
                  </p>
                </div>

                {/* Hover Arrow */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-harvest-gold rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-4 h-4 text-rich-soil" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.a
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-deep-green text-cream-field font-body font-bold rounded-full hover:bg-rich-soil transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            View All Products
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================
// TESTIMONIALS SECTION - Horizontal Scroll
// ============================================
function Testimonials() {
  const ref = useRef(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const testimonials = [
    {
      name: 'সুনির্মল পাড়িয়া',
      nameEn: 'Sunirmal Paria',
      location: 'উচুডিহা, দাঁতন, পশ্চিম মেদিনীপুর',
      quote: 'আমি শস্যশ্রী কোম্পানির "স্বর্ণমতি" ও "বাদশাভোগ" ধানবীজ বিগত কয়েক বছর যাবৎ চাষ করে আসছি। একর প্রতি প্রায় ২০০০-২১০০ কেজি ফলন পেয়েছি।',
      quoteEn: 'I have been cultivating Swarnamoti and Badsha Bhog paddy seeds for years. Getting 2000-2100 kg yield per acre.',
      yield: '2100 kg/acre',
      image: '/images/farmers/sunirmal.jpg',
    },
    {
      name: 'সাধন মন্ডল',
      nameEn: 'Sadhan Mondal',
      location: 'বনকাঁটা, জুনবেদিয়া, বাঁকুড়া',
      quote: 'শস্যশ্রী "উষা" তিলবীজের উৎপাদন সত্যই অবিশ্বাস্য। এবছর আমি ৫ বিঘা চাষ করেছি এবং যথেষ্ট লাভ ওঠাতে পারছি।',
      quoteEn: 'The production of Sashyashree Usha sesame seeds is truly unbelievable. Very profitable.',
      yield: 'High Profit',
      image: '/images/farmers/sadhan.jpg',
    },
    {
      name: 'কালিপদ মিশ্র',
      nameEn: 'Kalipad Mishra',
      location: 'বদরা, পুঞ্চা, পুরুলিয়া',
      quote: 'বিগত কয়েক বছর আমি শস্যশ্রী কোম্পানির "মিতালি" ও "সোনালী" চাষ করে আসছি। বিঘা প্রতি ১২ কুইন্টাল করে ফলন পেয়েছি।',
      quoteEn: 'Cultivating Mitali and Sonali for years. Getting 12 quintal per bigha yield.',
      yield: '12 Q/bigha',
      image: '/images/farmers/kalipad.jpg',
    },
    {
      name: 'মলয় সিংহ',
      nameEn: 'Malay Singh',
      location: 'শ্রীরামপুর, কাঁকসা, পশ্চিম বর্ধমান',
      quote: 'আমাদের এলাকার প্রত্যেক চাষীরাই "সোহিনী" ছাড়া অন্য সরিষা বীজে আগ্রহ নেই। বিঘা প্রতি ৩৫০ কেজি করে ফলন পাই।',
      quoteEn: 'Every farmer in our area prefers Sohini mustard. Getting 350 kg per bigha.',
      yield: '350 kg/bigha',
      image: '/images/farmers/malai.jpg',
    },
    {
      name: 'চন্দন বৈদ্য',
      nameEn: 'Chandan Baidy',
      location: 'দক্ষিণ ২৪ পরগনা',
      quote: 'গত বোরো মরসুমে দিশা ধানবীজ চাষ করে ভালো ফলন পেয়েছিলাম। Sashyashree seeds transformed my harvest!',
      quoteEn: 'Got excellent yield cultivating Disha paddy last boro season.',
      yield: 'Excellent',
      image: '/images/farmers/chandan.jpg',
    },
  ]

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const container = scrollRef.current
      const cardWidth = 420 // Card width + gap
      const maxScroll = container.scrollWidth - container.clientWidth

      let newScroll = direction === 'left'
        ? container.scrollLeft - cardWidth
        : container.scrollLeft + cardWidth

      // Infinite scroll: wrap around
      if (newScroll < 0) {
        newScroll = maxScroll
      } else if (newScroll > maxScroll) {
        newScroll = 0
      }

      container.scrollTo({ left: newScroll, behavior: 'smooth' })
    }
  }

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-deep-green overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-harvest-gold rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-sunset-orange rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-harvest-gold font-body font-semibold text-sm tracking-widest uppercase mb-4">
            Farmer Voices
          </span>
          <h2 className="text-cream-field mb-4">
            What Our{' '}
            <span className="text-harvest-gold">Farmers</span>{' '}
            Say
          </h2>
          <p className="text-cream-field/60 font-body max-w-2xl mx-auto">
            Real stories from farmers across Eastern India who trust Sashyashree seeds
            for their livelihood.
          </p>
        </motion.div>

        {/* Horizontal Scroll Container */}
        <div className="relative">
          {/* Left Arrow - Fixed position, no scale animation */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 z-10 w-12 h-12 rounded-full bg-harvest-gold/30 hover:bg-harvest-gold flex items-center justify-center transition-colors duration-300 backdrop-blur-sm border border-harvest-gold/30 hover:border-harvest-gold"
            aria-label="Scroll left"
          >
            <svg className="w-6 h-6 text-cream-field" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Testimonials Scroll Container - Horizontal only, hidden scrollbar */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto overflow-y-hidden pb-4 scroll-smooth px-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.nameEn}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex-shrink-0 w-[380px] md:w-[400px]"
              >
                <div className="bg-cream-field/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-cream-field/10 h-full hover:bg-cream-field/15 transition-colors duration-300">
                  {/* Quote Icon */}
                  <div className="text-harvest-gold text-5xl font-display leading-none mb-4">&ldquo;</div>

                  {/* Bengali Quote */}
                  <p className="text-cream-field/90 font-body text-lg mb-3 leading-relaxed line-clamp-3">
                    {testimonial.quote}
                  </p>

                  {/* English Translation */}
                  <p className="text-cream-field/50 font-body text-sm italic mb-6">
                    {testimonial.quoteEn}
                  </p>

                  {/* Farmer Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-harvest-gold flex-shrink-0">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.nameEn}
                        width={56}
                        height={56}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-cream-field font-display font-semibold text-base truncate">
                        {testimonial.name}
                      </div>
                      <div className="text-cream-field/60 font-body text-sm truncate">
                        {testimonial.nameEn}
                      </div>
                      <div className="text-harvest-gold/80 font-body text-xs mt-0.5 truncate">
                        {testimonial.location}
                      </div>
                    </div>
                    <div className="px-3 py-1.5 bg-harvest-gold/20 rounded-full flex-shrink-0">
                      <span className="text-harvest-gold font-body font-bold text-xs">
                        {testimonial.yield}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Arrow - Fixed position, no scale animation */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 z-10 w-12 h-12 rounded-full bg-harvest-gold/30 hover:bg-harvest-gold flex items-center justify-center transition-colors duration-300 backdrop-blur-sm border border-harvest-gold/30 hover:border-harvest-gold"
            aria-label="Scroll right"
          >
            <svg className="w-6 h-6 text-cream-field" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Scroll Hint */}
        <div className="flex justify-center mt-6 gap-1">
          <div className="w-8 h-1 rounded-full bg-harvest-gold/40" />
          <div className="w-2 h-1 rounded-full bg-cream-field/20" />
          <div className="w-2 h-1 rounded-full bg-cream-field/20" />
        </div>
      </div>
    </section>
  )
}

// ============================================
// QUALITY PROMISE SECTION
// ============================================
function QualityPromise() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const promises = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Quality Assurance',
      description: 'High accurate physical & genetic purity in every seed batch',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      title: 'Latest Technology',
      description: 'Updated technology in seeds production for consistency',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'High Yield Seeds',
      description: 'Value-added seeds for maximum agricultural productivity',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: 'After-Sale Support',
      description: 'Complete support from sowing till harvest',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'Innovation Focus',
      description: 'Continuous R&D for variety improvement and development',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Strong Network',
      description: 'Distributors, dealers & retailers across 5 states',
    },
  ]

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-cream-field paper-texture diagonal-top overflow-hidden">
      <div className="absolute inset-0 bg-golden-mesh opacity-30" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-harvest-gold font-body font-semibold text-sm tracking-widest uppercase mb-4">
            Our Commitment
          </span>
          <h2 className="text-rich-soil mb-4">
            Why{' '}
            <span className="golden-text">Sashyashree</span>{' '}
            Seeds?
          </h2>
          <p className="text-rich-soil/60 font-body max-w-2xl mx-auto">
            When quality matters, Sashyashree is the Farmer&apos;s Best Choice.
            Here&apos;s what sets us apart.
          </p>
        </motion.div>

        {/* Promise Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
          {promises.map((promise, index) => (
            <motion.div
              key={promise.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-harvest-gold/10 hover:border-harvest-gold/30 transition-all duration-300 card-lift"
            >
              <div className="w-16 h-16 bg-deep-green/10 rounded-2xl flex items-center justify-center text-deep-green mb-6 group-hover:bg-harvest-gold/20 group-hover:text-harvest-gold transition-colors duration-300">
                {promise.icon}
              </div>
              <h3 className="text-rich-soil text-xl font-display font-semibold mb-3">
                {promise.title}
              </h3>
              <p className="text-rich-soil/60 font-body">
                {promise.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// CATALOGUE CTA SECTION
// ============================================
function CatalogueCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rich-soil via-deep-green to-rich-soil" />
      <div className="absolute inset-0 grain-overlay opacity-5" />

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-10 right-10 w-32 h-32 bg-harvest-gold/10 rounded-full blur-xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute bottom-10 left-10 w-48 h-48 bg-sunset-orange/10 rounded-full blur-xl"
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-harvest-gold font-body font-semibold text-sm tracking-widest uppercase mb-4">
              Download Now
            </span>
            <h2 className="text-cream-field mb-6">
              Get Our Latest{' '}
              <span className="text-harvest-gold">E-Catalogue</span>
            </h2>
            <p className="text-cream-field/70 font-body mb-8">
              Access detailed product information including characteristics, average yield,
              seed-to-seed duration, grain type, and farming procedures for each variety.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#"
                className="inline-flex items-center gap-2 px-8 py-4 bg-harvest-gold text-rich-soil font-body font-bold rounded-full hover:bg-sunset-orange transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PDF
              </motion.a>
              <motion.a
                href="#"
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-cream-field/30 text-cream-field font-body font-bold rounded-full hover:bg-cream-field/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                View Online
              </motion.a>
            </div>
          </motion.div>

          {/* Catalogue Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="relative max-w-sm mx-auto"
            >
              {/* Stacked Catalogue Pages */}
              <div className="relative">
                {/* Back page */}
                <div className="absolute top-4 left-4 w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-xl transform rotate-6 bg-white">
                  <Image
                    src="/images/catalogue/page3.png"
                    alt="Catalogue page 3"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Middle page */}
                <div className="absolute top-2 left-2 w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-xl transform rotate-3 bg-white">
                  <Image
                    src="/images/catalogue/page2.png"
                    alt="Catalogue page 2"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Front page */}
                <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl bg-white">
                  <Image
                    src="/images/catalogue/page1.png"
                    alt="Sashyashree E-Catalogue Cover"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// FOOTER COMPONENT
// ============================================
function Footer() {
  const quickLinks = [
    { name: 'Home', href: '#' },
    { name: 'About Us', href: '#about' },
    { name: 'Products', href: '#products' },
    { name: 'Career', href: '#' },
  ]

  const products = [
    { name: 'Paddy Seeds', href: '#' },
    { name: 'Oil Seeds', href: '#' },
    { name: 'Jute Seeds', href: '#' },
    { name: 'Vegetable Seeds', href: '#' },
  ]

  return (
    <footer id="contact" className="relative bg-rich-soil pt-20 pb-8 overflow-hidden">
      {/* Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-harvest-gold via-sunset-orange to-harvest-gold" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-white shadow-md border-2 border-harvest-gold/30">
                <Image
                  src="/images/logo.png"
                  alt="Sashyashree Logo"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-cream-field">Sashyashree</h3>
                <p className="text-cream-field/50 text-xs font-body">Since 1992</p>
              </div>
            </div>
            <p className="text-cream-field/60 font-body text-base mb-6">
              Eastern India&apos;s leading agricultural seeds producer,
              serving farmers with premium quality seeds for over 32 years.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-cream-field/10 flex items-center justify-center text-cream-field/60 hover:bg-harvest-gold hover:text-rich-soil transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-cream-field/10 flex items-center justify-center text-cream-field/60 hover:bg-harvest-gold hover:text-rich-soil transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-cream-field/10 flex items-center justify-center text-cream-field/60 hover:bg-harvest-gold hover:text-rich-soil transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-cream-field/10 flex items-center justify-center text-cream-field/60 hover:bg-harvest-gold hover:text-rich-soil transition-colors">
                <span className="sr-only">YouTube</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-harvest-gold font-display font-semibold text-lg mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-cream-field/70 font-body text-base hover:text-harvest-gold transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-harvest-gold/50 rounded-full group-hover:bg-harvest-gold transition-colors" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-harvest-gold font-display font-semibold text-lg mb-6">
              Our Products
            </h4>
            <ul className="space-y-3">
              {products.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-cream-field/70 font-body text-base hover:text-harvest-gold transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-harvest-gold/50 rounded-full group-hover:bg-harvest-gold transition-colors" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-harvest-gold font-display font-semibold text-lg mb-6">
              Contact Us
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-harvest-gold/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-harvest-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-cream-field/80 font-body text-base">
                    Kashtadahi, Arambag,<br />
                    West Bengal 712413
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-harvest-gold/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-harvest-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <a href="tel:+918001926461" className="text-cream-field/80 font-body text-base hover:text-harvest-gold transition-colors">
                  +91 8001926461
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-harvest-gold/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-harvest-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <a href="mailto:info.sashyashree@gmail.com" className="text-cream-field/80 font-body text-base hover:text-harvest-gold transition-colors">
                  info.sashyashree@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-cream-field/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-cream-field/50 font-body text-base text-center md:text-left">
              &copy; {new Date().getFullYear()} Sashyashree Agri Processing Pvt. Ltd. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-cream-field/50 font-body text-base hover:text-harvest-gold transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-cream-field/50 font-body text-base hover:text-harvest-gold transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ============================================
// WHATSAPP FLOATING BUTTON
// ============================================
function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/918001926461"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </motion.a>
  )
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================
export default function GoldenHarvestPage() {
  return (
    <main className="relative">
      <Navigation />
      <HeroSection />
      <TrustStrip />
      <StoryPreview />
      <ProductCategories />
      <Testimonials />
      <QualityPromise />
      <CatalogueCTA />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
