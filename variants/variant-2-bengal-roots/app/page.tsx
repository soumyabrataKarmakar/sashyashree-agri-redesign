'use client'

import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'

// ============================================
// NAVIGATION
// ============================================
function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-paper-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <span className="text-bengal-terracotta font-display font-black text-2xl">শস্যশ্রী</span>
          <span className="hidden md:block text-xs text-ink-black/50 font-body border-l border-ink-black/20 pl-3">
            Est. 1992
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {['Story', 'Products', 'Farmers', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="font-body text-sm text-ink-black/70 hover:text-bengal-terracotta transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <a
          href="tel:+918001926461"
          className="px-5 py-2.5 bg-bengal-terracotta text-paper-white font-body font-medium text-sm rounded hover:bg-bengal-terracotta/90 transition-colors"
        >
          Contact
        </a>
      </div>
    </motion.nav>
  )
}

// ============================================
// HERO SECTION - Editorial Style
// ============================================
function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      {/* Ken Burns Background Image */}
      <motion.div style={{ scale }} className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=80"
          alt="Bengal rice fields"
          fill
          className="object-cover ken-burns"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-black/60 via-ink-black/30 to-paper-white" />
      </motion.div>

      {/* Halftone Overlay */}
      <div className="absolute inset-0 halftone-overlay" />

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 min-h-screen flex flex-col justify-end pb-20 md:pb-32">
        <div className="max-w-6xl mx-auto px-6 w-full">
          {/* Issue Number Style */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 bg-bengal-terracotta text-paper-white font-body text-xs tracking-widest uppercase">
              Est. 1992 — Arambag, West Bengal
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-paper-white mb-6"
          >
            <span className="block text-5xl md:text-7xl lg:text-8xl font-display font-black leading-none">
              From Seed
            </span>
            <span className="block text-5xl md:text-7xl lg:text-8xl font-display font-black leading-none text-bengal-terracotta">
              to Harvest
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="text-paper-white/80 font-body text-xl md:text-2xl max-w-xl italic"
          >
            Three decades of nurturing Bengal&apos;s agricultural heritage,
            one seed at a time.
          </motion.p>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-12"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center gap-3 text-paper-white/60"
            >
              <span className="w-8 h-[1px] bg-paper-white/60" />
              <span className="font-body text-xs tracking-widest uppercase">Scroll to explore</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

// ============================================
// TIMELINE SECTION - Horizontal Scroll
// ============================================
function TimelineSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const milestones = [
    { year: '1992', title: 'The Beginning', desc: 'Started as Santosh Seed Centre with mustard seeds', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=80' },
    { year: '2000', title: 'Expansion', desc: 'Added paddy seeds to serve Bengal farmers', image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&q=80' },
    { year: '2010', title: 'Growth', desc: 'Extended to Bihar, Jharkhand, Orissa & Assam', image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&q=80' },
    { year: '2018', title: 'New Era', desc: 'Became Sashyashree Agri Processing Pvt. Ltd.', image: 'https://images.unsplash.com/photo-1589923188651-268a9765e432?w=600&q=80' },
    { year: 'Today', title: 'Leading', desc: 'Eastern India\'s trusted seed producer', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80' },
  ]

  return (
    <section id="story" ref={ref} className="py-24 md:py-32 bg-jute-beige/30 paper-texture">
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <div className="grid md:grid-cols-12 gap-8 items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="md:col-span-8"
          >
            <span className="section-number">01</span>
            <h2 className="text-ink-black -mt-8">
              Our <span className="text-bengal-terracotta">Journey</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="md:col-span-4"
          >
            <p className="text-ink-black/60 font-body text-sm">
              From a small seed centre in Arambag to Eastern India&apos;s leading agricultural partner.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Horizontal Timeline */}
      <div className="timeline-scroll pb-6">
        <div className="flex gap-8 px-6 min-w-max">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.15 }}
              className="w-[350px] flex-shrink-0"
            >
              {/* Year Badge */}
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl font-display font-black text-bengal-terracotta">
                  {milestone.year}
                </span>
                <span className="flex-1 h-[2px] bg-bengal-terracotta/30" />
              </div>

              {/* Image */}
              <div className="relative aspect-[4/3] mb-4 overflow-hidden">
                <Image
                  src={milestone.image}
                  alt={milestone.title}
                  fill
                  className="object-cover sepia-tone"
                />
                <div className="absolute inset-0 bg-bengal-terracotta/10" />
              </div>

              {/* Content */}
              <h3 className="text-ink-black text-xl font-display font-bold mb-2">
                {milestone.title}
              </h3>
              <p className="text-ink-black/60 font-body text-sm">
                {milestone.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-8">
        <span className="text-ink-black/40 font-body text-sm">
          ← Drag to explore our journey →
        </span>
      </div>
    </section>
  )
}

// ============================================
// PRODUCTS SECTION - Magazine Feature Style
// ============================================
function ProductsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const products = [
    { name: 'Paddy Seeds', bengali: 'ধানবীজ', varieties: ['Jamini', 'Badsha Bhog', 'Swarnamoti', 'Disha'], image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=800&q=80' },
    { name: 'Oil Seeds', bengali: 'তৈলবীজ', varieties: ['Sohini (Mustard)', 'Usha (Sesame)', 'Groundnut'], image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&q=80' },
    { name: 'Jute Seeds', bengali: 'পাটবীজ', varieties: ['Premium Quality', 'High Fiber Yield'], image: 'https://images.unsplash.com/photo-1595841696677-6589f0e26c3e?w=800&q=80' },
  ]

  return (
    <section id="products" ref={ref} className="py-24 md:py-32 bg-paper-white editorial-grid">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="grid md:grid-cols-12 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="md:col-span-4"
          >
            <span className="section-number">02</span>
            <h2 className="text-ink-black -mt-8">
              Our <span className="text-paddy-green">Harvest</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="md:col-span-6 md:col-start-7"
          >
            <p className="text-ink-black/70 font-body text-lg leading-relaxed">
              Each seed carries our promise of quality—carefully selected, rigorously tested,
              and grown to bring prosperity to Bengal&apos;s farming families.
            </p>
          </motion.div>
        </div>

        {/* Product Features */}
        <div className="space-y-20">
          {products.map((product, index) => (
            <motion.article
              key={product.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2 }}
              className={`grid md:grid-cols-12 gap-8 items-center ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div className={`md:col-span-6 ${index % 2 === 1 ? 'md:col-start-7' : ''}`}>
                <div className="relative aspect-[4/3] overflow-hidden decorative-border">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-ink-black/80 to-transparent">
                    <span className="text-paper-white font-bengali text-2xl">{product.bengali}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={`md:col-span-5 ${index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}`}>
                <span className="text-bengal-terracotta font-body text-sm tracking-widest uppercase mb-2 block">
                  Featured Product
                </span>
                <h3 className="text-ink-black text-3xl md:text-4xl font-display font-bold mb-4">
                  {product.name}
                </h3>
                <div className="space-y-2 mb-6">
                  {product.varieties.map((variety) => (
                    <div key={variety} className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-bengal-terracotta rounded-full" />
                      <span className="font-body text-ink-black/70">{variety}</span>
                    </div>
                  ))}
                </div>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-bengal-terracotta font-body font-medium hover:underline"
                >
                  Explore varieties
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// FARMER TESTIMONIALS - Bengali Voices
// ============================================
function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const testimonials = [
    {
      bengali: 'আমি শস্যশ্রী কোম্পানির "স্বর্ণমতি" ও "বাদশাভোগ" ধানবীজ বিগত কয়েক বছর যাবৎ চাষ করে আসছি। একর প্রতি প্রায় ২০০০-২১০০ কেজি ফলন পেয়েছি।',
      english: 'I have been cultivating Swarnamoti and Badsha Bhog for years. Getting 2000-2100 kg yield per acre.',
      name: 'সুনির্মল পাড়িয়া',
      nameEn: 'Sunirmal Pariya',
      location: 'উচুডিহা, দাঁতন',
      district: 'West Medinipur',
    },
    {
      bengali: 'শস্যশ্রী "উষা" তিলবীজের উৎপাদন সত্যই অবিশ্বাস্য। আমি ৫ বিঘা চাষ করেছি এবং যথেষ্ট লাভ ওঠাতে পারছি।',
      english: 'The production of Usha sesame seeds is truly incredible. I cultivated 5 bigha and made great profit.',
      name: 'সাধন মন্ডল',
      nameEn: 'Sadhan Mondal',
      location: 'বনকাঁটা, জুনবেদিয়া',
      district: 'Bankura',
    },
  ]

  return (
    <section id="farmers" ref={ref} className="py-24 md:py-32 bg-river-blue text-paper-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="grid md:grid-cols-12 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="md:col-span-6"
          >
            <span className="section-number !text-paper-white/20 !-webkit-text-stroke-paper-white">03</span>
            <h2 className="-mt-8">
              Voices from the <span className="text-jute-beige">Fields</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="md:col-span-5 md:col-start-8"
          >
            <p className="text-paper-white/70 font-body">
              Real stories from the farmers who trust us with their livelihood.
            </p>
          </motion.div>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-12">
          {testimonials.map((testimonial, index) => (
            <motion.blockquote
              key={testimonial.nameEn}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              {/* Quote Mark */}
              <span className="absolute -top-8 -left-4 text-8xl font-display text-jute-beige/20 leading-none">
                &ldquo;
              </span>

              {/* Bengali Quote */}
              <p className="font-bengali text-xl md:text-2xl text-paper-white mb-4 leading-relaxed relative z-10">
                {testimonial.bengali}
              </p>

              {/* English Translation */}
              <p className="font-body text-sm text-paper-white/60 italic mb-6">
                {testimonial.english}
              </p>

              {/* Attribution */}
              <footer className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-jute-beige flex items-center justify-center">
                  <span className="font-display font-bold text-river-blue">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <cite className="not-italic">
                    <span className="font-bengali text-lg text-paper-white block">{testimonial.name}</span>
                    <span className="font-body text-sm text-paper-white/60">{testimonial.location}, {testimonial.district}</span>
                  </cite>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// VISION BLOCK - Founder Quote
// ============================================
function VisionBlock() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-24 md:py-32 bg-jute-beige/20 paper-texture">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Large Quote */}
          <blockquote className="relative">
            <span className="block text-bengal-terracotta/20 text-[12rem] font-display leading-none absolute -top-20 left-1/2 -translate-x-1/2">
              &ldquo;
            </span>
            <p className="font-display text-2xl md:text-4xl lg:text-5xl text-ink-black font-medium leading-snug relative z-10 mb-8">
              Our promise is to strive hard to produce the best quality seeds
              that bring happiness and prosperity to our farming community.
            </p>
            <footer>
              <div className="w-20 h-[2px] bg-bengal-terracotta mx-auto mb-4" />
              <cite className="not-italic">
                <span className="font-display text-xl text-ink-black font-semibold block">Mr. Jagannath Das</span>
                <span className="font-body text-ink-black/60">Founder & Managing Director</span>
              </cite>
            </footer>
          </blockquote>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================
// CONTACT CTA - Split Screen
// ============================================
function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="contact" ref={ref} className="bg-paper-white">
      <div className="grid md:grid-cols-2">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          className="bg-ink-black text-paper-white p-12 md:p-16 lg:p-20"
        >
          <span className="text-bengal-terracotta font-body text-sm tracking-widest uppercase mb-4 block">
            Get in Touch
          </span>
          <h2 className="text-paper-white mb-8">
            Let&apos;s <span className="text-jute-beige">Connect</span>
          </h2>

          <div className="space-y-6">
            <div>
              <h4 className="font-body text-sm text-paper-white/50 uppercase tracking-wider mb-2">Address</h4>
              <p className="font-body text-paper-white">
                Kashtadahi, Arambag<br />
                West Bengal 712413
              </p>
            </div>
            <div>
              <h4 className="font-body text-sm text-paper-white/50 uppercase tracking-wider mb-2">Phone</h4>
              <a href="tel:+918001926461" className="font-body text-paper-white hover:text-bengal-terracotta transition-colors">
                +91 8001926461
              </a>
            </div>
            <div>
              <h4 className="font-body text-sm text-paper-white/50 uppercase tracking-wider mb-2">Email</h4>
              <a href="mailto:info.sashyashree@gmail.com" className="font-body text-paper-white hover:text-bengal-terracotta transition-colors">
                info.sashyashree@gmail.com
              </a>
            </div>
          </div>
        </motion.div>

        {/* Dealer Inquiry */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          className="bg-bengal-terracotta text-paper-white p-12 md:p-16 lg:p-20"
        >
          <span className="text-paper-white/70 font-body text-sm tracking-widest uppercase mb-4 block">
            For Dealers
          </span>
          <h2 className="text-paper-white mb-6">
            Partner <span className="text-jute-beige">With Us</span>
          </h2>

          <p className="font-body text-paper-white/80 mb-8">
            Join our network of distributors and dealers across Eastern India.
            Together, we can serve more farmers.
          </p>

          <a
            href="mailto:info.sashyashree@gmail.com?subject=Dealer%20Inquiry"
            className="inline-flex items-center gap-2 px-6 py-3 bg-paper-white text-bengal-terracotta font-body font-semibold rounded hover:bg-jute-beige transition-colors"
          >
            Become a Partner
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================
// FOOTER - Editorial Style
// ============================================
function Footer() {
  return (
    <footer className="bg-ink-black text-paper-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="font-display font-black text-xl">শস্যশ্রী</span>
            <span className="text-paper-white/30">|</span>
            <span className="font-body text-sm text-paper-white/50">Sashyashree Agri Processing Pvt. Ltd.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="font-body text-sm text-paper-white/50 hover:text-paper-white transition-colors">Privacy</a>
            <a href="#" className="font-body text-sm text-paper-white/50 hover:text-paper-white transition-colors">Terms</a>
          </div>

          <p className="font-body text-sm text-paper-white/30">
            &copy; {new Date().getFullYear()} All rights reserved
          </p>
        </div>
      </div>
    </footer>
  )
}

// ============================================
// WHATSAPP BUTTON
// ============================================
function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/918001926461"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-btn w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 2 }}
    >
      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </motion.a>
  )
}

// ============================================
// MAIN PAGE
// ============================================
export default function BengalRootsPage() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <TimelineSection />
      <ProductsSection />
      <TestimonialsSection />
      <VisionBlock />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
