'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'

// Floating Seeds Animation - Using Framer Motion
function FloatingSeeds() {
  const [seeds, setSeeds] = useState<Array<{
    id: number
    x: number
    y: number
    size: number
    duration: number
    delay: number
    type: 'seed' | 'leaf' | 'dot'
  }>>([])

  useEffect(() => {
    // Generate seeds only on client side to avoid hydration mismatch
    const generatedSeeds = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 8 + Math.random() * 16,
      duration: 15 + Math.random() * 10,
      delay: Math.random() * 5,
      type: (['seed', 'leaf', 'dot'] as const)[Math.floor(Math.random() * 3)],
    }))
    setSeeds(generatedSeeds)
  }, [])

  if (seeds.length === 0) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {seeds.map((seed) => (
        <motion.div
          key={seed.id}
          className="absolute"
          style={{
            left: `${seed.x}%`,
            top: `${seed.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, -15, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: seed.duration,
            delay: seed.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {seed.type === 'seed' && (
            <svg width={seed.size} height={seed.size * 0.7} viewBox="0 0 24 16">
              <ellipse cx="12" cy="8" rx="10" ry="6" fill="#C67B5C" opacity="0.6" />
            </svg>
          )}
          {seed.type === 'leaf' && (
            <svg width={seed.size} height={seed.size} viewBox="0 0 24 24">
              <path d="M12 2C8 6 6 12 8 18c2-2 6-4 8-2-2-4-2-10-4-14z" fill="#87A878" opacity="0.5" />
            </svg>
          )}
          {seed.type === 'dot' && (
            <div
              className="rounded-full bg-sage-green"
              style={{
                width: seed.size / 2,
                height: seed.size / 2,
                opacity: 0.3,
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  )
}

// Breathing Organic Blobs
function BreathingBlobs() {
  return (
    <>
      {/* Large sage blob - top left */}
      <motion.div
        className="absolute -top-20 -left-32 w-96 h-96 rounded-full bg-sage-green/20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Terracotta blob - bottom right */}
      <motion.div
        className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-terracotta/15 blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 10,
          delay: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Small forest blob - center right */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-forest-deep/10 blur-2xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 12,
          delay: 1,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </>
  )
}

// Animated Plant Illustration
function GrowingPlant() {
  return (
    <div className="relative w-48 h-64 md:w-64 md:h-80">
      <svg viewBox="0 0 200 260" className="w-full h-full">
        {/* Ground */}
        <motion.ellipse
          cx="100"
          cy="240"
          rx="60"
          ry="12"
          fill="#5D4037"
          opacity="0.2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Main stem */}
        <motion.path
          d="M100 240 Q100 180 100 100"
          stroke="#87A878"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />

        {/* Left branch */}
        <motion.path
          d="M100 160 Q70 150 50 120"
          stroke="#87A878"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
        />

        {/* Right branch */}
        <motion.path
          d="M100 140 Q130 130 155 105"
          stroke="#87A878"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 1, ease: 'easeOut' }}
        />

        {/* Left leaf 1 */}
        <motion.path
          d="M50 120 Q30 100 40 70 Q60 90 50 120"
          fill="#87A878"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        />

        {/* Left leaf 2 */}
        <motion.path
          d="M70 150 Q45 140 35 110 Q60 125 70 150"
          fill="#2D4A3E"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.7 }}
        />

        {/* Right leaf 1 */}
        <motion.path
          d="M155 105 Q175 85 165 55 Q145 75 155 105"
          fill="#87A878"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        />

        {/* Right leaf 2 */}
        <motion.path
          d="M130 130 Q155 115 150 85 Q125 105 130 130"
          fill="#2D4A3E"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        />

        {/* Top leaves */}
        <motion.path
          d="M100 100 Q75 80 70 50 Q95 70 100 100"
          fill="#2D4A3E"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 2 }}
        />
        <motion.path
          d="M100 100 Q125 80 130 50 Q105 70 100 100"
          fill="#2D4A3E"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.1 }}
        />

        {/* Seed at base */}
        <motion.ellipse
          cx="100"
          cy="235"
          rx="15"
          ry="10"
          fill="#C67B5C"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.8 }}
        />
      </svg>

      {/* Gentle glow behind plant */}
      <motion.div
        className="absolute inset-0 -z-10 bg-sage-green/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
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
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-soft-white/95 backdrop-blur-md shadow-sm' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Real Sashyashree Brand */}
          <div className="flex items-center gap-3">
            <div className="relative w-14 h-14 rounded-full overflow-hidden bg-white shadow-md">
              <Image
                src="/images/logo.png"
                alt="Sashyashree Logo"
                fill
                className="object-contain p-1"
              />
            </div>
            <div>
              <span className={`font-display text-xl ${scrolled ? 'text-forest-deep' : 'text-soft-white'}`}>Sashyashree Agri</span>
              <span className={`block text-xs font-body ${scrolled ? 'text-sage-green' : 'text-soft-white/70'}`}>Since 1992</span>
            </div>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {['Story', 'Seeds', 'Farmers', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`font-body text-base font-medium transition-colors relative group ${
                  scrolled ? 'text-rich-earth hover:text-sage-green' : 'text-soft-white/90 hover:text-terracotta'
                }`}
              >
                {item}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 rounded-full transition-all group-hover:w-full ${
                  scrolled ? 'bg-sage-green' : 'bg-terracotta'
                }`} />
              </a>
            ))}
          </div>

          {/* CTA & Mobile Menu */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="btn-organic btn-organic-primary text-base hidden sm:inline-flex"
            >
              Get in Touch
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                scrolled ? 'text-forest-deep hover:bg-forest-deep/10' : 'text-soft-white hover:bg-soft-white/10'
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
        className="md:hidden overflow-hidden bg-soft-white/98 backdrop-blur-md"
      >
        <div className="px-6 py-4 space-y-3 border-t border-sage-green/10">
          {['Story', 'Seeds', 'Farmers', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMobileMenuOpen(false)}
              className="block font-body text-base font-medium text-forest-deep hover:text-sage-green transition-colors py-2"
            >
              {item}
            </a>
          ))}
          <a
            href="tel:+918001926461"
            className="flex items-center justify-center gap-2 mt-4 px-6 py-3 bg-sage-green text-soft-white font-body font-semibold text-base rounded-full hover:bg-terracotta transition-colors"
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

// Hero Section
function HeroSection() {
  // Staggered text animation variants
  const headlineWords = ['Growing', 'Together,']

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  }

  const wordVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Rich Organic Background - Lush Green Paddy Fields with Palm Trees */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1695150601855-f545034a070a?q=80&w=2532"
          alt="Lush green paddy rice fields with palm trees in Andhra Pradesh, India"
          fill
          className="object-cover"
          priority
        />
        {/* Deep forest gradient - earthy tones, no white */}
        <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/80 via-forest-deep/40 to-forest-deep/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-rich-earth/50 via-transparent to-transparent" />
      </div>

      {/* Animated Breathing Blobs */}
      <BreathingBlobs />

      {/* Floating Seeds */}
      <FloatingSeeds />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          {/* Handwritten tagline */}
          <motion.span
            className="handwritten text-2xl mb-4 block text-terracotta"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            From Seed to Success
          </motion.span>

          {/* Animated Headline */}
          <motion.h1
            className="mb-6 text-warm-cream drop-shadow-lg"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {headlineWords.map((word, i) => (
              <motion.span key={i} variants={wordVariants} className="inline-block mr-4">
                {word}
              </motion.span>
            ))}
            <motion.span
              variants={wordVariants}
              className="inline-block text-terracotta"
            >
              Naturally
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-lg mb-8 max-w-lg text-warm-cream/95 drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            For over three decades, we&apos;ve been nurturing the dreams of Eastern Indian
            farmers with premium quality seeds, rooted in trust and cultivated with care.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <motion.a
              href="#seeds"
              className="btn-organic btn-organic-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Our Seeds
            </motion.a>
            <motion.a
              href="#story"
              className="btn-organic btn-organic-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Our Story
            </motion.a>
          </motion.div>
        </div>

        {/* Growing Plant Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="hidden lg:flex justify-center items-center"
        >
          <GrowingPlant />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-sage-green rounded-full flex justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-1.5 h-3 bg-sage-green rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

// Philosophy Strip
function PhilosophyStrip() {
  const philosophyItems = [
    { icon: '🌱', title: 'Quality Seeds', desc: 'Carefully selected genetics' },
    { icon: '🌍', title: 'Healthy Soil', desc: 'Nurturing the earth' },
    { icon: '☀️', title: 'Natural Growth', desc: 'Sustainable practices' },
  ]

  return (
    <section className="py-20 bg-forest-deep relative overflow-hidden">
      {/* Organic shape overlay */}
      <div className="absolute top-0 left-0 w-full h-4 bg-warm-cream" style={{
        borderRadius: '0 0 50% 50%',
      }} />

      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="handwritten text-3xl text-center text-warm-cream mb-12"
        >
          &quot;Rooted in Nature, Growing with Farmers&quot;
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8">
          {philosophyItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="text-center"
            >
              <span className="text-5xl mb-4 block">{item.icon}</span>
              <h3 className="text-soft-white mb-2 font-display text-xl">{item.title}</h3>
              <p className="text-warm-cream/70 font-body text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom organic shape */}
      <div className="absolute bottom-0 left-0 w-full h-4 bg-warm-cream" style={{
        borderRadius: '50% 50% 0 0',
      }} />
    </section>
  )
}

// Our Story Section
function StorySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="story" className="py-28 watercolor-wash relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center" ref={ref}>
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-sage-green/20 rounded-3xl transform -rotate-3" />
            <div className="relative rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=800"
                alt="Farmer in field"
                width={600}
                height={450}
                className="w-full object-cover"
              />
            </div>
            {/* Badge */}
            <div className="absolute -bottom-6 -right-6 bg-soft-white rounded-2xl p-4 shadow-lg">
              <span className="font-display text-3xl text-sage-green">32+</span>
              <span className="block text-sm text-rich-earth font-body">Years of Trust</span>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="handwritten text-xl text-terracotta mb-2 block">Our Journey</span>
            <h2 className="mb-6">A Legacy of Growth</h2>

            <p className="mb-6">
              In 1992, Mr. Jagannath Das started Santosh Seed Centre in the heart of
              West Bengal with a simple belief: good seeds are the foundation of farmer prosperity.
            </p>

            <p className="mb-6">
              What began as a small mustard seed business has blossomed into Sashyashree Agri,
              serving farmers across five Eastern Indian states with premium quality seeds for
              paddy, oil crops, jute, fodder, maize, and vegetables.
            </p>

            <blockquote className="border-l-4 border-sage-green pl-6 my-8">
              <p className="handwritten text-2xl text-forest-deep italic">
                &quot;Good Seeds Only Can Make High Yield&quot;
              </p>
              <cite className="font-body text-sm text-rich-earth/70 mt-2 block">
                — Mr. Jagannath Das, Founder
              </cite>
            </blockquote>

            <div className="flex gap-8">
              <div>
                <span className="font-display text-2xl text-sage-green">5</span>
                <span className="block text-sm text-rich-earth/70">States Served</span>
              </div>
              <div>
                <span className="font-display text-2xl text-sage-green">15+</span>
                <span className="block text-sm text-rich-earth/70">Seed Varieties</span>
              </div>
              <div>
                <span className="font-display text-2xl text-sage-green">1000s</span>
                <span className="block text-sm text-rich-earth/70">Happy Farmers</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Seed Categories Section - Using Real Product Packets
function SeedCategories() {
  const categories = [
    {
      name: 'Paddy Seeds',
      varieties: 'Jamini, Badsha Bhog, Disha',
      image: '/images/products/jamini.png',
      isLocalProduct: true,
      color: 'bg-sage-green',
    },
    {
      name: 'Oil Seeds',
      varieties: 'Sohini Mustard, Usha Sesame',
      image: '/images/products/sohini.png',
      isLocalProduct: true,
      color: 'bg-terracotta',
    },
    {
      name: 'Aromatic Rice',
      varieties: 'Badsha Bhog Premium',
      image: '/images/products/badsha-bhog.png',
      isLocalProduct: true,
      color: 'bg-rich-earth',
    },
    {
      name: 'Fodder Seeds',
      varieties: 'SSG-106 Sudan Grass',
      image: '/images/products/ssg-106.png',
      isLocalProduct: true,
      color: 'bg-forest-deep',
    },
    {
      name: 'Maize Seeds',
      varieties: 'SMS-4055 Hybrid',
      image: '/images/products/sms-4055.png',
      isLocalProduct: true,
      color: 'bg-sage-green',
    },
    {
      name: 'Sesame Seeds',
      varieties: 'Usha Premium Quality',
      image: '/images/products/usha.png',
      isLocalProduct: true,
      color: 'bg-terracotta',
    },
  ]

  return (
    <section id="seeds" className="py-28 bg-soft-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="handwritten text-xl text-terracotta mb-2 block">What We Grow</span>
          <h2>Our Seed Collection</h2>
          <p className="mt-4 max-w-2xl mx-auto">
            Each seed variety is carefully selected and tested to ensure the highest
            germination rates and yields for Eastern Indian soil conditions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="soft-card overflow-hidden group cursor-pointer"
            >
              {/* Product Packet Display */}
              <div className="relative h-56 overflow-hidden bg-gradient-to-b from-warm-cream to-soft-white flex items-center justify-center p-4">
                <motion.div
                  className="relative w-36 h-48"
                  whileHover={{ scale: 1.08, rotate: 2 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-contain drop-shadow-lg"
                  />
                </motion.div>
                {/* Decorative accent */}
                <div className={`absolute top-4 right-4 w-3 h-3 rounded-full ${category.color}`} />
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-soft-white to-transparent" />
              </div>
              <div className="p-6 border-t border-sage-green/10">
                <h3 className="text-forest-deep mb-2">{category.name}</h3>
                <p className="text-sm text-rich-earth/70">{category.varieties}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Testimonials Section - Real Farmer Testimonials with Horizontal Scroll
function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const testimonials = [
    {
      name: 'Chandan Baidy',
      nameBn: 'চন্দন বৈদ্য',
      location: 'South 24 Parganas, West Bengal',
      quote: 'গত বোরো মরসুমে দিশা ধানবীজ চাষ করে ভালো ফলন পেয়েছিলাম। Sashyashree seeds transformed my harvest!',
      image: '/images/farmers/chandan.jpg',
    },
    {
      name: 'Malay Singh',
      nameBn: 'মলয় সিংহ',
      location: 'West Burdwan, West Bengal',
      quote: 'সোহিনী সরিষা বীজ চাষ করে বিঘা প্রতি ৩৫০ কেজি ফলন পাই। Best mustard seeds in the market!',
      image: '/images/farmers/malai.jpg',
    },
    {
      name: 'Sunirmal Paria',
      nameBn: 'সুনির্মল পাড়িয়া',
      location: 'West Midnapore, West Bengal',
      quote: 'স্বর্ণমতি ও বাদশাভোগ ধানবীজে একর প্রতি ২০০০ কেজি ফলন। Exceptional aromatic rice yield!',
      image: '/images/farmers/sunirmal.jpg',
    },
    {
      name: 'Sadhan Mondal',
      nameBn: 'সাধন মন্ডল',
      location: 'Bankura, West Bengal',
      quote: 'SMS-4055 মাইজ বীজ চাষ করে অসাধারণ ফলন পেয়েছি। Quality seeds make all the difference!',
      image: '/images/farmers/sadhan.jpg',
    },
    {
      name: 'Kalipad Mishra',
      nameBn: 'কালিপদ মিশ্র',
      location: 'Purulia, West Bengal',
      quote: 'উষা তিল বীজে বিঘা প্রতি ভালো ফলন। Trusted Sashyashree for years!',
      image: '/images/farmers/kalipad.jpg',
    },
  ]

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const container = scrollRef.current
      const cardWidth = 340 // Card width + gap
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
    <section id="farmers" className="py-28 watercolor-wash">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="handwritten text-xl text-terracotta mb-2 block">Farmer Voices</span>
          <h2>Growing Together</h2>
        </motion.div>

        {/* Scrollable Container with Arrows */}
        <div className="relative">
          {/* Left Arrow - Fixed position, no scale animation */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 z-10 w-11 h-11 rounded-full bg-soft-white shadow-lg border border-sage-green/20 flex items-center justify-center hover:bg-sage-green hover:border-sage-green transition-colors duration-300 group"
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5 text-forest-deep group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Testimonials Scroll Container - Horizontal only, hidden scrollbar */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto overflow-y-hidden pb-4 scroll-smooth px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="relative flex-shrink-0 w-[300px] md:w-[320px]"
              >
                {/* Card with organic shape */}
                <div className="bg-soft-white rounded-3xl p-6 shadow-md border border-sage-green/10 hover:shadow-lg hover:border-sage-green/20 transition-all duration-300">
                  {/* Quote mark */}
                  <div className="text-sage-green/30 text-4xl font-display leading-none mb-3">&ldquo;</div>

                  {/* Quote text */}
                  <p className="text-rich-earth text-sm leading-relaxed mb-6 min-h-[80px]">
                    {testimonial.quote}
                  </p>

                  {/* Farmer info */}
                  <div className="flex items-center gap-3 pt-4 border-t border-sage-green/10">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-sage-green/40 shadow-sm flex-shrink-0">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-display text-forest-deep text-sm truncate">{testimonial.nameBn}</h4>
                      <p className="text-xs text-rich-earth/50 truncate">{testimonial.name}</p>
                      <p className="text-xs text-terracotta/70 truncate">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Arrow - Fixed position, no scale animation */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 z-10 w-11 h-11 rounded-full bg-soft-white shadow-lg border border-sage-green/20 flex items-center justify-center hover:bg-sage-green hover:border-sage-green transition-colors duration-300 group"
            aria-label="Next testimonial"
          >
            <svg className="w-5 h-5 text-forest-deep group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Scroll indicator dots */}
        <div className="flex justify-center mt-8 gap-1.5">
          <div className="w-6 h-1 rounded-full bg-sage-green/50" />
          <div className="w-1.5 h-1 rounded-full bg-sage-green/20" />
          <div className="w-1.5 h-1 rounded-full bg-sage-green/20" />
        </div>
      </div>
    </section>
  )
}

// Quality Promise Section
function QualityPromise() {
  const steps = [
    { icon: '🌱', title: 'Selection', desc: 'Finest genetic varieties' },
    { icon: '🔬', title: 'Testing', desc: 'Rigorous quality checks' },
    { icon: '📦', title: 'Packaging', desc: 'Hygienic & secure' },
    { icon: '🌾', title: 'Harvest', desc: 'Abundant yields' },
  ]

  return (
    <section className="py-28 bg-soft-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="handwritten text-xl text-terracotta mb-2 block">Our Promise</span>
          <h2>From Seed to Harvest</h2>
          <p className="mt-4 max-w-2xl mx-auto">
            Every seed goes through our careful quality assurance process to ensure
            the best possible results for your farm.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-sage-green/20 -translate-y-1/2 rounded-full" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="text-center relative"
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-warm-cream rounded-full flex items-center justify-center shadow-md border-4 border-soft-white relative z-10">
                  <span className="text-3xl">{step.icon}</span>
                </div>
                <h3 className="text-forest-deep mb-1">{step.title}</h3>
                <p className="text-sm text-rich-earth/70">{step.desc}</p>
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
    <section id="contact" className="py-28 bg-forest-deep relative overflow-hidden">
      {/* Organic shapes */}
      <div className="organic-blob w-80 h-80 bg-sage-green -top-20 -right-20" />
      <div className="organic-blob w-60 h-60 bg-terracotta bottom-0 -left-20" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="handwritten text-2xl text-terracotta mb-2 block">Let&apos;s Connect</span>
            <h2 className="text-soft-white mb-6">Get in Touch</h2>

            <p className="text-warm-cream/80 mb-8">
              Whether you&apos;re a farmer looking for quality seeds or a dealer interested
              in partnership, we&apos;d love to hear from you.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-sage-green/20 flex items-center justify-center">
                  <span className="text-xl">📍</span>
                </div>
                <div>
                  <h4 className="text-soft-white font-display">Visit Us</h4>
                  <p className="text-warm-cream/70 text-sm">
                    Kashtadahi, Arambag<br />
                    West Bengal 712413
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-sage-green/20 flex items-center justify-center">
                  <span className="text-xl">📞</span>
                </div>
                <div>
                  <h4 className="text-soft-white font-display">Call Us</h4>
                  <p className="text-warm-cream/70 text-sm">+91 98XX XXX XXX</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-sage-green/20 flex items-center justify-center">
                  <span className="text-xl">✉️</span>
                </div>
                <div>
                  <h4 className="text-soft-white font-display">Email Us</h4>
                  <p className="text-warm-cream/70 text-sm">info@sashyashreeagri.in</p>
                </div>
              </div>
            </div>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/919876543210"
              className="mt-8 inline-flex items-center gap-3 bg-[#25D366] text-white px-6 py-3 rounded-full hover:bg-[#128C7E] transition-all hover:shadow-lg"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-soft-white rounded-3xl p-8 shadow-xl"
          >
            <h3 className="text-forest-deep mb-6">Send us a Message</h3>
            <form className="space-y-5">
              <div>
                <label className="block text-sm text-rich-earth mb-2 font-body">Your Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-sage-green/30 focus:border-sage-green focus:outline-none focus:ring-2 focus:ring-sage-green/20 transition-all font-body"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm text-rich-earth mb-2 font-body">Phone Number</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 rounded-xl border border-sage-green/30 focus:border-sage-green focus:outline-none focus:ring-2 focus:ring-sage-green/20 transition-all font-body"
                  placeholder="Enter your phone"
                />
              </div>
              <div>
                <label className="block text-sm text-rich-earth mb-2 font-body">I am a...</label>
                <div className="relative">
                  <select className="w-full px-4 py-3 pr-10 rounded-xl border border-sage-green/30 focus:border-sage-green focus:outline-none focus:ring-2 focus:ring-sage-green/20 transition-all font-body bg-white appearance-none cursor-pointer">
                    <option>Farmer</option>
                    <option>Dealer / Distributor</option>
                    <option>Agricultural Business</option>
                    <option>Other</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-sage-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm text-rich-earth mb-2 font-body">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-sage-green/30 focus:border-sage-green focus:outline-none focus:ring-2 focus:ring-sage-green/20 transition-all font-body resize-none"
                  placeholder="How can we help you?"
                />
              </div>
              <button type="submit" className="w-full btn-organic btn-organic-primary">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="bg-warm-cream py-16 border-t border-sage-green/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Logo & About */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white shadow-sm">
                <Image
                  src="/images/logo.png"
                  alt="Sashyashree Logo"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <span className="font-display text-xl text-forest-deep">Sashyashree Agri</span>
            </div>
            <p className="text-base text-rich-earth/70 max-w-sm mb-6">
              Nurturing Eastern India&apos;s agricultural dreams since 1992 with premium
              quality seeds and unwavering commitment to farmer prosperity.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-forest-deep/10 flex items-center justify-center text-forest-deep/60 hover:bg-sage-green hover:text-soft-white transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-forest-deep/10 flex items-center justify-center text-forest-deep/60 hover:bg-sage-green hover:text-soft-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-forest-deep/10 flex items-center justify-center text-forest-deep/60 hover:bg-sage-green hover:text-soft-white transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-forest-deep/10 flex items-center justify-center text-forest-deep/60 hover:bg-sage-green hover:text-soft-white transition-colors">
                <span className="sr-only">YouTube</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg text-forest-deep mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {['Our Story', 'Seeds', 'Quality', 'Contact'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-base text-rich-earth/70 hover:text-sage-green transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Seed Categories */}
          <div>
            <h4 className="font-display text-lg text-forest-deep mb-4">Our Seeds</h4>
            <ul className="space-y-3">
              {['Paddy', 'Mustard', 'Jute', 'Fodder', 'Maize'].map((seed) => (
                <li key={seed}>
                  <span className="text-base text-rich-earth/70">{seed} Seeds</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-sage-green/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-base text-rich-earth/50 text-center md:text-left">
            © {new Date().getFullYear()} Sashyashree Agri Processing Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-base text-rich-earth/50 hover:text-sage-green transition-colors">Privacy Policy</a>
            <a href="#" className="text-base text-rich-earth/50 hover:text-sage-green transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// WhatsApp Float Button
function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/919876543210"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat on WhatsApp"
    >
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  )
}

// Main Page
export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <PhilosophyStrip />
      <StorySection />
      <SeedCategories />
      <TestimonialsSection />
      <QualityPromise />
      <ContactSection />
      <Footer />
      <WhatsAppFloat />
    </main>
  )
}
