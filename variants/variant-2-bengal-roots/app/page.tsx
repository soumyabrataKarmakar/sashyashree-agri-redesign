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
        scrolled ? 'bg-soft-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-sage-green flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-soft-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8 6 4 10 4 14c0 4.4 3.6 8 8 8s8-3.6 8-8c0-4-4-8-8-12zm0 18c-3.3 0-6-2.7-6-6 0-2.5 2-5 6-9 4 4 6 6.5 6 9 0 3.3-2.7 6-6 6z"/>
                <circle cx="12" cy="14" r="3" />
              </svg>
            </div>
            <div>
              <span className="font-display text-xl text-forest-deep">Sashyashree Agri</span>
              <span className="block text-xs font-body text-sage-green">Since 1992</span>
            </div>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {['Story', 'Seeds', 'Farmers', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-body text-sm text-rich-earth hover:text-sage-green transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sage-green rounded-full transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#contact"
            className="btn-organic btn-organic-primary text-sm hidden sm:inline-flex"
          >
            Get in Touch
          </a>
        </div>
      </div>
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
      {/* Rich Organic Background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2532"
          alt="Lush green field at sunrise"
          fill
          className="object-cover"
          priority
        />
        {/* Multi-layered organic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-forest-deep/70 via-sage-green/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-warm-cream/85 via-warm-cream/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-rich-earth/20 via-transparent to-sage-green/10" />
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
            className="mb-6"
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
              className="inline-block text-sage-green"
            >
              Naturally
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-lg mb-8 max-w-lg opacity-90"
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

// Seed Categories Section
function SeedCategories() {
  const categories = [
    {
      name: 'Paddy Seeds',
      varieties: 'Jamini, Badsha Bhog, Swarnamoti',
      image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?q=80&w=600',
      color: 'bg-sage-green',
    },
    {
      name: 'Oil Seeds',
      varieties: 'Sohini Mustard, Usha Sesame',
      image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=600',
      color: 'bg-terracotta',
    },
    {
      name: 'Jute Seeds',
      varieties: 'Premium Quality Imports',
      image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=600',
      color: 'bg-rich-earth',
    },
    {
      name: 'Fodder Seeds',
      varieties: 'SSG-106 Sudan Grass, Hybrid Bajra',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600',
      color: 'bg-forest-deep',
    },
    {
      name: 'Maize Seeds',
      varieties: 'SMS-4025, SMS-4055 Hybrids',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=600',
      color: 'bg-sage-green',
    },
    {
      name: 'Vegetable Seeds',
      varieties: 'Leafy Vegetables & More',
      image: 'https://images.unsplash.com/photo-1592921870789-04563d55041c?q=80&w=600',
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
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 to-transparent" />
                <div className={`absolute top-4 right-4 w-3 h-3 rounded-full ${category.color}`} />
              </div>
              <div className="p-6">
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

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Ramesh Mandal',
      location: 'Hooghly, West Bengal',
      quote: 'Sashyashree paddy seeds have transformed my yield. The Jamini variety is exceptional!',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200',
    },
    {
      name: 'Subhas Das',
      location: 'Burdwan, West Bengal',
      quote: 'Been buying mustard seeds from them since 1995. Trust and quality that never fails.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200',
    },
    {
      name: 'Pranab Roy',
      location: 'Malda, West Bengal',
      quote: 'The fodder seeds are excellent for my cattle. Healthy animals, happy farmer!',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200',
    },
  ]

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

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative"
            >
              <div className="speech-bubble mb-8">
                <p className="text-rich-earth italic">&quot;{testimonial.quote}&quot;</p>
              </div>
              <div className="flex items-center gap-4 ml-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border-3 border-sage-green">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={56}
                    height={56}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h4 className="font-display text-forest-deep">{testimonial.name}</h4>
                  <p className="text-sm text-rich-earth/60">{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
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
                <select className="w-full px-4 py-3 rounded-xl border border-sage-green/30 focus:border-sage-green focus:outline-none focus:ring-2 focus:ring-sage-green/20 transition-all font-body bg-white">
                  <option>Farmer</option>
                  <option>Dealer / Distributor</option>
                  <option>Agricultural Business</option>
                  <option>Other</option>
                </select>
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
              <div className="w-10 h-10 rounded-full bg-sage-green flex items-center justify-center">
                <svg className="w-5 h-5 text-soft-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8 6 4 10 4 14c0 4.4 3.6 8 8 8s8-3.6 8-8c0-4-4-8-8-12zm0 18c-3.3 0-6-2.7-6-6 0-2.5 2-5 6-9 4 4 6 6.5 6 9 0 3.3-2.7 6-6 6z"/>
                </svg>
              </div>
              <span className="font-display text-lg text-forest-deep">Sashyashree Agri</span>
            </div>
            <p className="text-sm text-rich-earth/70 max-w-sm">
              Nurturing Eastern India&apos;s agricultural dreams since 1992 with premium
              quality seeds and unwavering commitment to farmer prosperity.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-forest-deep mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Our Story', 'Seeds', 'Quality', 'Contact'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-sm text-rich-earth/70 hover:text-sage-green transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Seed Categories */}
          <div>
            <h4 className="font-display text-forest-deep mb-4">Our Seeds</h4>
            <ul className="space-y-2">
              {['Paddy', 'Mustard', 'Jute', 'Fodder', 'Maize'].map((seed) => (
                <li key={seed}>
                  <span className="text-sm text-rich-earth/70">{seed} Seeds</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-sage-green/10 text-center">
          <p className="text-sm text-rich-earth/50">
            © {new Date().getFullYear()} Sashyashree Agri Processing Pvt. Ltd. All rights reserved.
          </p>
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
