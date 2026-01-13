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
        scrolled ? 'bg-charcoal/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-electric-lime flex items-center justify-center">
              <span className="text-charcoal font-bold text-xl" style={{ fontFamily: 'var(--font-syne)' }}>S</span>
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
                className="text-off-white/70 hover:text-electric-lime transition-colors text-sm font-medium"
                style={{ fontFamily: 'var(--font-outfit)' }}
              >
                {item}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a href="#connect" className="pill-btn pill-btn-primary text-sm">
            Get Started
          </a>
        </div>
      </div>
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
    { name: 'Paddy Seeds', icon: '🌾', varieties: 6, featured: true, image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&h=400&fit=crop' },
    { name: 'Oil Seeds', icon: '🌻', varieties: 3, image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=300&fit=crop' },
    { name: 'Jute Seeds', icon: '🌿', varieties: 2, image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=400&h=300&fit=crop' },
    { name: 'Maize Seeds', icon: '🌽', varieties: 2, image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=300&fit=crop' },
    { name: 'Fodder Seeds', icon: '🌱', varieties: 2, image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop' },
    { name: 'Vegetable Seeds', icon: '🥬', varieties: 4, image: 'https://images.unsplash.com/photo-1592921870789-04563d55041c?w=400&h=300&fit=crop' },
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
              <div className={`relative ${product.featured ? 'h-80 md:h-full' : 'h-60'}`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />

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
      name: 'Ramesh Kumar',
      location: 'West Bengal',
      quote: 'Sashyashree seeds have transformed my yields. 20% more produce every season!',
      avatar: '👨‍🌾',
    },
    {
      name: 'Anil Prasad',
      location: 'Bihar',
      quote: 'The quality is unmatched. I recommend them to every farmer I know.',
      avatar: '👨‍🌾',
    },
    {
      name: 'Debashish Mandal',
      location: 'Jharkhand',
      quote: 'Reliable seeds, honest pricing, excellent support. What more can you ask?',
      avatar: '👨‍🌾',
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
              <div className="text-6xl mb-6">{t.avatar}</div>
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
              <select className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-off-white focus:outline-none focus:border-electric-lime transition-colors">
                <option value="" className="bg-charcoal">I am a...</option>
                <option value="farmer" className="bg-charcoal">Farmer</option>
                <option value="dealer" className="bg-charcoal">Dealer / Retailer</option>
                <option value="other" className="bg-charcoal">Other</option>
              </select>
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
              <div className="w-12 h-12 rounded-xl bg-electric-lime flex items-center justify-center">
                <span className="text-charcoal font-bold text-2xl" style={{ fontFamily: 'var(--font-syne)' }}>S</span>
              </div>
              <div>
                <span className="text-off-white font-bold text-xl block" style={{ fontFamily: 'var(--font-syne)' }}>
                  Sashyashree Agri
                </span>
                <span className="text-off-white/60 text-xs">Processing Pvt. Ltd.</span>
              </div>
            </div>
            <p className="max-w-sm mb-6">
              Premium quality agricultural seeds since 1992. Powering the future of
              farming across Eastern India.
            </p>
            <div className="flex gap-4">
              {['Facebook', 'Instagram', 'YouTube'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-electric-lime hover:text-charcoal transition-colors text-off-white"
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <div className="text-electric-lime font-semibold mb-4" style={{ fontFamily: 'var(--font-outfit)' }}>
              Quick Links
            </div>
            <ul className="space-y-3">
              {['Products', 'About Us', 'Quality', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-off-white/60 hover:text-electric-lime transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="text-electric-lime font-semibold mb-4" style={{ fontFamily: 'var(--font-outfit)' }}>
              Contact
            </div>
            <ul className="space-y-3 text-sm text-off-white/60">
              <li>+91 98765 43210</li>
              <li>info@sashyashreeagri.in</li>
              <li>Kashtadahi, Arambag<br />West Bengal 712413</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-off-white/40 text-sm">
            © 2024 Sashyashree Agri Processing Pvt. Ltd.
          </div>
          <div className="flex gap-6 text-sm text-off-white/40">
            <a href="#" className="hover:text-electric-lime transition-colors">Privacy</a>
            <a href="#" className="hover:text-electric-lime transition-colors">Terms</a>
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
