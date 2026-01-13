'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'

// Animated Counter
function Counter({ end, suffix = '' }: { end: number; suffix?: string }) {
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

  return <span ref={ref}>{count}{suffix}</span>
}

// Floating Particles
function FloatingParticles() {
  const [particles, setParticles] = useState<Array<{
    id: number
    size: number
    x: number
    y: number
    duration: number
    delay: number
    xOffset: number
  }>>([])

  useEffect(() => {
    setParticles(Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 6 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
      xOffset: Math.random() * 50 - 25,
    })))
  }, [])

  if (particles.length === 0) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-electric-lime opacity-30"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, p.xOffset, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
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
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-charcoal/90 backdrop-blur-md' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-white border border-white/20">
              <Image
                src="/images/logo.png"
                alt="Sashyashree Logo"
                fill
                className="object-contain p-0.5"
              />
            </div>
            <span className="text-off-white font-bold text-xl" style={{ fontFamily: 'var(--font-syne)' }}>
              Sashyashree
            </span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {['Products', 'Innovation', 'Impact', 'Connect'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-off-white/80 hover:text-electric-lime transition-colors text-base font-medium"
                style={{ fontFamily: 'var(--font-outfit)' }}
              >
                {item}
              </a>
            ))}
          </div>

          {/* CTA & Mobile Menu */}
          <div className="flex items-center gap-3">
            <a href="#connect" className="pill-btn pill-btn-primary text-base hidden sm:inline-flex">
              Get Started
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-off-white hover:bg-off-white/10 transition-colors"
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
        className="md:hidden overflow-hidden bg-charcoal/95 backdrop-blur-md"
      >
        <div className="px-6 py-4 space-y-3 border-t border-off-white/10">
          {['Products', 'Innovation', 'Impact', 'Connect'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-off-white/80 hover:text-electric-lime transition-colors text-base font-medium py-2"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              {item}
            </a>
          ))}
          <a
            href="tel:+918001926461"
            className="flex items-center justify-center gap-2 mt-4 px-6 py-3 bg-electric-lime text-charcoal font-semibold text-base rounded-full hover:bg-electric-lime/90 transition-colors"
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

// Hero Section with Crop Selector
function HeroSection() {
  const crops = [
    { name: 'Paddy', icon: '🌾', color: '#C9A227' },
    { name: 'Mustard', icon: '🌻', color: '#FFD700' },
    { name: 'Maize', icon: '🌽', color: '#F4A460' },
    { name: 'Jute', icon: '🌿', color: '#228B22' },
  ]
  const [selectedCrop, setSelectedCrop] = useState(0)

  return (
    <section className="min-h-screen relative gradient-mesh hex-pattern overflow-hidden">
      <FloatingParticles />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-electric-lime animate-pulse" />
              <span className="text-sm text-off-white/80" style={{ fontFamily: 'var(--font-outfit)' }}>
                Pioneering Agricultural Excellence Since 1992
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-off-white mb-6"
            >
              The Future of
              <br />
              <span className="text-electric-lime">Farming</span> Starts
              <br />
              With Better Seeds
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl mb-10 max-w-lg"
            >
              Premium quality seeds engineered for maximum yield.
              Trusted by thousands of farmers across Eastern India.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <a href="#products" className="pill-btn pill-btn-primary">
                Explore Seeds
              </a>
              <a href="#connect" className="pill-btn pill-btn-secondary">
                Partner With Us
              </a>
            </motion.div>
          </div>

          {/* Right - Crop Selector */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* Central Display */}
            <div className="glass-card rounded-3xl p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 noise-overlay" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCrop}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10"
                >
                  <div className="text-8xl mb-4">{crops[selectedCrop].icon}</div>
                  <h3 className="text-off-white text-2xl mb-2">{crops[selectedCrop].name} Seeds</h3>
                  <p className="text-off-white/60 text-sm">Premium quality, high germination rate</p>
                </motion.div>
              </AnimatePresence>

              {/* Selector Buttons */}
              <div className="flex justify-center gap-3 mt-8 relative z-10">
                {crops.map((crop, index) => (
                  <button
                    key={crop.name}
                    onClick={() => setSelectedCrop(index)}
                    className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-all ${
                      selectedCrop === index
                        ? 'bg-electric-lime scale-110'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    {crop.icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Floating Stats */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 glass-card rounded-2xl p-4"
            >
              <div className="stat-number text-3xl">95%+</div>
              <div className="text-off-white/60 text-xs">Germination</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-4 -left-4 glass-card rounded-2xl p-4"
            >
              <div className="stat-number text-3xl">32+</div>
              <div className="text-off-white/60 text-xs">Years Experience</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-electric-lime rounded-full flex justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 bg-electric-lime rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}

// Impact Numbers Section
function ImpactSection() {
  const stats = [
    { value: 32, suffix: '+', label: 'Years of Excellence' },
    { value: 5, suffix: '', label: 'States Served' },
    { value: 15, suffix: '+', label: 'Seed Varieties' },
    { value: 10, suffix: 'K+', label: 'Happy Farmers' },
  ]

  return (
    <section id="impact" className="py-24 bg-deep-forest relative overflow-hidden">
      <div className="absolute inset-0 hex-pattern" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
          >
            <span className="text-sm text-off-white/80" style={{ fontFamily: 'var(--font-outfit)' }}>
              Our Impact
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-off-white"
          >
            Numbers That Speak
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="stat-number text-6xl md:text-7xl lg:text-8xl mb-4">
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-off-white/60" style={{ fontFamily: 'var(--font-outfit)' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Products Bento Grid
function ProductsSection() {
  const products = [
    { name: 'Paddy Seeds', icon: '🌾', varieties: 6, featured: true, image: '/images/products/jamini.png', isProduct: true },
    { name: 'Mustard Seeds', icon: '🌻', varieties: 3, image: '/images/products/sohini.png', isProduct: true },
    { name: 'Aromatic Rice', icon: '🍚', varieties: 2, image: '/images/products/badsha-bhog.png', isProduct: true },
    { name: 'Maize Seeds', icon: '🌽', varieties: 2, image: '/images/products/sms-4055.png', isProduct: true },
    { name: 'Fodder Seeds', icon: '🌱', varieties: 2, image: '/images/products/ssg-106.png', isProduct: true },
    { name: 'Sesame Seeds', icon: '🫘', varieties: 4, image: '/images/products/usha.png', isProduct: true },
  ]

  return (
    <section id="products" className="py-24 bg-charcoal relative">
      <div className="absolute inset-0 noise-overlay" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
            >
              <span className="text-sm text-off-white/80" style={{ fontFamily: 'var(--font-outfit)' }}>
                Product Range
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-off-white"
            >
              Premium Seed Collection
            </motion.h2>
          </div>
          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            href="#"
            className="pill-btn pill-btn-secondary text-sm"
          >
            View All Products
          </motion.a>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`glass-card rounded-2xl overflow-hidden group cursor-pointer tilt-card ${
                product.featured ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <div className={`relative ${product.featured ? 'h-80 md:h-full' : 'h-60'} bg-gradient-to-br from-charcoal via-deep-forest/50 to-charcoal`}>
                {/* Product Packet Display */}
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <motion.div
                    className={`relative ${product.featured ? 'w-40 h-56' : 'w-24 h-36'}`}
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain drop-shadow-2xl"
                    />
                  </motion.div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{product.icon}</span>
                    <h3 className="text-off-white">{product.name}</h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-off-white/60 text-sm">{product.varieties} varieties</span>
                    <span className="text-electric-lime text-sm group-hover:translate-x-2 transition-transform" style={{ fontFamily: 'var(--font-outfit)' }}>
                      Explore →
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Innovation Section
function InnovationSection() {
  const features = [
    { icon: '🔬', title: 'Quality Testing', desc: 'Every batch tested for purity and germination' },
    { icon: '🌡️', title: 'Climate Adapted', desc: 'Seeds optimized for Eastern Indian conditions' },
    { icon: '📊', title: 'Data-Driven', desc: 'Continuous improvement based on field results' },
    { icon: '🤝', title: 'Farmer Support', desc: 'Technical guidance from seed to harvest' },
  ]

  return (
    <section id="innovation" className="py-24 gradient-mesh relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
            >
              <span className="text-sm text-off-white/80" style={{ fontFamily: 'var(--font-outfit)' }}>
                Our Approach
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-off-white mb-6"
            >
              Innovation Meets
              <br />
              <span className="text-electric-lime">Tradition</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              We combine decades of agricultural expertise with modern quality control
              to deliver seeds that consistently outperform. Our commitment to
              innovation ensures you get the best results, season after season.
            </motion.p>

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              href="#"
              className="pill-btn pill-btn-primary inline-block"
            >
              Learn More
            </motion.a>
          </div>

          {/* Right - Feature Grid */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-off-white text-lg mb-2">{feature.title}</h3>
                <p className="text-sm">{feature.desc}</p>
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
      location: 'West Midnapore',
      quote: 'Sashyashree seeds have transformed my yields. 2100 kg per acre with Badsha Bhog!',
      image: '/images/farmers/sunirmal.jpg',
    },
    {
      name: 'Sadhan Mondal',
      location: 'Bankura',
      quote: 'The Usha sesame quality is unmatched. Highly profitable harvest every season.',
      image: '/images/farmers/sadhan.jpg',
    },
    {
      name: 'Malay Singh',
      location: 'West Burdwan',
      quote: 'Sohini mustard - 350 kg per bigha! Every farmer in our area trusts Sashyashree.',
      image: '/images/farmers/malai.jpg',
    },
  ]

  return (
    <section className="py-24 bg-deep-forest relative">
      <div className="absolute inset-0 hex-pattern" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
          >
            <span className="text-sm text-off-white/80" style={{ fontFamily: 'var(--font-outfit)' }}>
              Success Stories
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-off-white"
          >
            Farmers Love Us
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="glass-card rounded-2xl p-8"
            >
              <div className="relative w-16 h-16 rounded-full overflow-hidden mb-6 border-2 border-electric-lime">
                <Image
                  src={t.image}
                  alt={t.name}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-off-white mb-6 text-lg italic">"{t.quote}"</p>
              <div>
                <div className="text-electric-lime font-semibold" style={{ fontFamily: 'var(--font-outfit)' }}>
                  {t.name}
                </div>
                <div className="text-off-white/60 text-sm">{t.location}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Connect Section
function ConnectSection() {
  return (
    <section id="connect" className="py-24 bg-charcoal relative">
      <div className="absolute inset-0 noise-overlay" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left - CTA */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
            >
              <span className="text-sm text-off-white/80" style={{ fontFamily: 'var(--font-outfit)' }}>
                Get Connected
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-off-white mb-6"
            >
              Ready to Grow
              <br />
              <span className="text-electric-lime">Together?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              Whether you're a farmer looking for premium seeds or a dealer wanting
              to partner with us, we're here to help you succeed.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 glass-card rounded-xl p-4 hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-off-white font-semibold">Chat on WhatsApp</div>
                  <div className="text-off-white/60 text-sm">Quick response guaranteed</div>
                </div>
              </a>

              <div className="glass-card rounded-xl p-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-electric-lime flex items-center justify-center">
                    <svg className="w-6 h-6 text-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-off-white font-semibold">Visit Us</div>
                    <div className="text-off-white/60 text-sm">
                      Kashtadahi, Arambag<br />
                      Hooghly, West Bengal 712413
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8"
          >
            <h3 className="text-off-white text-xl mb-6">Send us a message</h3>
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-off-white placeholder:text-off-white/40 focus:outline-none focus:border-electric-lime transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-off-white placeholder:text-off-white/40 focus:outline-none focus:border-electric-lime transition-colors"
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-off-white placeholder:text-off-white/40 focus:outline-none focus:border-electric-lime transition-colors"
              />
              <div className="relative">
                <select className="w-full px-4 py-3 pr-10 rounded-xl bg-white/5 border border-white/10 text-off-white focus:outline-none focus:border-electric-lime transition-colors appearance-none cursor-pointer">
                  <option value="" className="bg-charcoal">I am a...</option>
                  <option value="farmer" className="bg-charcoal">Farmer</option>
                  <option value="dealer" className="bg-charcoal">Dealer / Retailer</option>
                  <option value="other" className="bg-charcoal">Other</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-off-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <textarea
                rows={4}
                placeholder="Your Message"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-off-white placeholder:text-off-white/40 focus:outline-none focus:border-electric-lime transition-colors resize-none"
              />
              <button type="submit" className="w-full pill-btn pill-btn-primary">
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
    <footer className="py-16 bg-deep-forest border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-white border border-white/20">
                <Image
                  src="/images/logo.png"
                  alt="Sashyashree Logo"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div>
                <span className="text-off-white font-bold text-xl block" style={{ fontFamily: 'var(--font-syne)' }}>
                  Sashyashree Agri
                </span>
                <span className="text-off-white/60 text-xs">Processing Pvt. Ltd.</span>
              </div>
            </div>
            <p className="max-w-sm mb-6 text-base text-off-white/70">
              Premium quality agricultural seeds since 1992. Powering the future of
              farming across Eastern India.
            </p>
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-electric-lime hover:text-charcoal transition-colors text-off-white">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-electric-lime hover:text-charcoal transition-colors text-off-white">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-electric-lime hover:text-charcoal transition-colors text-off-white">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-electric-lime hover:text-charcoal transition-colors text-off-white">
                <span className="sr-only">YouTube</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <div className="text-electric-lime font-semibold text-lg mb-4" style={{ fontFamily: 'var(--font-outfit)' }}>
              Quick Links
            </div>
            <ul className="space-y-3">
              {['Products', 'About Us', 'Quality', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-off-white/70 hover:text-electric-lime transition-colors text-base">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="text-electric-lime font-semibold text-lg mb-4" style={{ fontFamily: 'var(--font-outfit)' }}>
              Contact
            </div>
            <ul className="space-y-3 text-base text-off-white/70">
              <li>+91 8001926461</li>
              <li>info.sashyashree@gmail.com</li>
              <li>Kashtadahi, Arambag<br />West Bengal 712413</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-off-white/50 text-base">
            © {new Date().getFullYear()} Sashyashree Agri Processing Pvt. Ltd.
          </div>
          <div className="flex gap-6 text-base text-off-white/50">
            <a href="#" className="hover:text-electric-lime transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-electric-lime transition-colors">Terms of Service</a>
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
    <main className="min-h-screen bg-charcoal">
      <Navigation />
      <HeroSection />
      <ImpactSection />
      <ProductsSection />
      <InnovationSection />
      <TestimonialsSection />
      <ConnectSection />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
