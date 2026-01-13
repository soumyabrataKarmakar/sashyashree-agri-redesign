# Sashyashree Agri - Homepage Redesign Variants

## Overview

**Tech Stack:** Next.js 14+ (App Router), Tailwind CSS, Framer Motion
**Target Audience:** Farmers + Dealers (Eastern India)
**Scope:** Homepage redesign only (no e-commerce)

---

## Variant Comparison Matrix

| Aspect | Golden Harvest | Bengal Roots | Trust Mark | Future Farm |
|--------|---------------|--------------|------------|-------------|
| **Theme** | Warm Maximalist | Editorial Storytelling | Premium Institutional | Bold Contemporary |
| **Tone** | Celebratory, Abundant | Heritage, Cultural | Authoritative, Premium | Innovative, Energetic |
| **Primary Audience** | Both equally | Farmers first | Dealers first | Young farmers |
| **Display Font** | Bodoni Moda | Fraunces | Reforma | Clash Display |
| **Primary Color** | Harvest Gold #C9A227 | Bengal Terracotta #C1512D | Institution Green #0F4C35 | Electric Lime #BFFF00 |
| **Key Texture** | Grain overlay | Halftone dots | Linen paper | Gradient mesh |
| **Hero Style** | Full-bleed parallax | Editorial photo | Centered seal | Interactive particles |
| **Motion Level** | High | Medium | Low-Medium | Very High |

---

## VARIANT 1: "Golden Harvest"
### Warm Maximalist

#### Aesthetic Direction
Luxurious agricultural abundance. Harvest festival meets premium brand. Rich, warm, celebratory. Standing in a prosperous field at golden hour.

#### The Memorable Element
Full-bleed hero with animated golden wheat stalks swaying, floating seed particles, transitioning into product reveals.

#### Typography System
```css
/* Display - Dramatic serifs, luxury feel */
--font-display: 'Bodoni Moda', serif;

/* Body - Warm, readable */
--font-body: 'Libre Franklin', sans-serif;

/* Accent - Quotes, testimonials */
--font-accent: 'Instrument Serif', serif;
```

#### Color Palette
```css
:root {
  --harvest-gold: #C9A227;
  --rich-soil: #2C1810;
  --cream-field: #F7F3E3;
  --sunset-orange: #E8743B;
  --deep-green: #1D3C28;

  /* Semantic */
  --bg-primary: var(--cream-field);
  --bg-dark: var(--rich-soil);
  --text-primary: var(--rich-soil);
  --text-light: var(--cream-field);
  --accent: var(--harvest-gold);
}
```

#### Visual Textures
- Grain overlay on hero (8% opacity, multiply blend)
- Subtle paper texture on content sections
- Golden gradient mesh backgrounds (radial gradients)
- Organic blob shapes behind product cards (SVG)

#### Motion Design Specs
| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Hero wheat | Parallax + sway | Continuous | ease-out |
| Seed particles | Float upward | 3-5s loop | ease-in-out |
| Stats counter | Count up | 2s | ease-out |
| Product cards | Staggered fade-in | 100ms delay each | spring |
| Testimonials | Horizontal scroll | Momentum-based | lerp |

#### Layout Specifications
- Hero: Asymmetric 60/40 split, overlapping elements
- Section gaps: 80-120px
- Container max-width: 1400px
- Product grid: 3x2 with featured card breaking grid
- Section dividers: Diagonal (5deg angle)

#### Sections Breakdown

**1. Hero**
- Full-viewport height
- Background: Wheat field image with parallax
- Floating seed particle effect (Canvas/Three.js)
- Split layout: Large headline left, CTA buttons right
- Scroll indicator at bottom

**2. Trust Strip**
- Background: Deep green
- Three animated counters:
  - "32+ Years" (with counting animation)
  - "5 States"
  - "15+ Products"
- Gold accent underlines

**3. Story Preview**
- Asymmetric: Text 55%, Founder image 45% (overlapping)
- Large pull quote
- "Know Our Journey" CTA

**4. Product Categories**
- 3x2 grid
- Hover: Card lifts, reveals product count
- First card larger (featured - Paddy Seeds)
- Golden blob shapes behind

**5. Testimonials**
- Horizontal scroll carousel
- Large farmer photos with quotes
- Bengali text + English translation
- Auto-scroll with momentum

**6. Quality Promise**
- Icon grid (2x3)
- Staggered reveal on scroll
- Each icon: SVG animation on hover

**7. Catalogue CTA**
- Full-width banner
- Floating catalogue image
- Download button with hover effect

**8. Footer**
- Multi-column layout
- Golden accent borders
- Newsletter signup
- Social links

---

## VARIANT 2: "Bengal Roots"
### Editorial Storytelling

#### Aesthetic Direction
Magazine editorial meets cultural heritage. Sophisticated storytelling with strong Bengali visual identity. Photography-forward, archival aesthetic.

#### The Memorable Element
Horizontal-scrolling timeline telling the 30-year journey from Santosh Seed Centre to Sashyashree Agri with archival-style photography.

#### Typography System
```css
/* Display - Quirky serifs, Indian-inspired */
--font-display: 'Fraunces', serif;

/* Body - Editorial readability */
--font-body: 'Newsreader', serif;

/* Bengali - Native script */
--font-bengali: 'Noto Sans Bengali', sans-serif;

/* Numbers - Oldstyle figures */
--font-numbers: 'Newsreader', serif;
font-feature-settings: "onum" 1;
```

#### Color Palette
```css
:root {
  --bengal-terracotta: #C1512D;
  --paddy-green: #4A6741;
  --river-blue: #2E5668;
  --jute-beige: #D4C5A9;
  --ink-black: #1A1A1A;
  --paper-white: #FAFAF7;

  /* Semantic */
  --bg-primary: var(--paper-white);
  --bg-accent: var(--jute-beige);
  --text-primary: var(--ink-black);
  --accent-warm: var(--bengal-terracotta);
  --accent-cool: var(--river-blue);
}
```

#### Visual Textures
- Halftone dot pattern overlays (SVG filter)
- Newspaper-style column layouts with rule lines
- Hand-drawn border illustrations (rice stalks, jute fibers)
- Duotone image treatment (terracotta + black)

#### Motion Design Specs
| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Hero photo | Ken Burns zoom | 20s loop | linear |
| Timeline | Horizontal scroll | Scroll-linked | lerp |
| Text | Word fade-in | 50ms per word | ease-out |
| Images | Parallax layers | Scroll-linked | ease |
| Section numbers | Slide in | 0.5s | spring |

#### Layout Specifications
- Editorial grid: 12-column with visible rule lines
- Pull quotes: Break into left margin (negative margin)
- Image bleeds: Extend 50px beyond container
- Section numbering: Large numerals (120px)
- Typography scale: 1.333 (Perfect Fourth)

#### Sections Breakdown

**1. Hero**
- Large editorial photo (farmer in field)
- Overlaid headline with mix-blend-mode
- Scroll indicator arrow
- Issue number style: "Est. 1992"

**2. The Beginning**
- Horizontal scroll timeline
- Sepia-toned archival images
- Year markers: 1992, 2000, 2010, 2018, Present
- Scroll-linked progress bar

**3. Product Story**
- Each category as magazine "feature spread"
- Large product photography
- Sidebar with specs
- Pull quotes from farmers

**4. Farmer Voices**
- Bengali testimonials in native script
- English translations below
- Large portrait photos
- Quote marks as decorative elements

**5. Regional Map**
- Illustrated map of Eastern India
- State coverage highlighted
- Animated path showing distribution

**6. Vision Block**
- Full-width quote from founder
- Large decorative quotation marks
- Signature graphic

**7. Connect CTA**
- Split screen: Contact form | Dealer inquiry
- Column layout with rule lines

**8. Footer**
- Minimal editorial style
- Colophon format
- Credits and contact

---

## VARIANT 3: "Trust Mark"
### Premium Institutional

#### Aesthetic Direction
Bank-level trust meets agricultural authority. Clean, prestigious, certificate-worthy. For dealers and serious farmers who value credentials.

#### The Memorable Element
Quality seal that animates on page load - morphing from seed to certified stamp, establishing instant credibility.

#### Typography System
```css
/* Display - Geometric, authoritative */
--font-display: 'Reforma', sans-serif;
/* Fallback: 'DM Sans' if Reforma unavailable */

/* Body - Book-quality reading */
--font-body: 'Charter', serif;
/* Fallback: 'Libre Baskerville' */

/* Mono - Specs, data */
--font-mono: 'JetBrains Mono', monospace;

/* Accent - Certifications */
--font-accent: 'Bitter', serif;
```

#### Color Palette
```css
:root {
  --institution-green: #0F4C35;
  --certificate-gold: #B8963E;
  --document-cream: #F5F2EB;
  --seal-red: #8B2942;
  --steel-gray: #4A4A4A;
  --pure-white: #FFFFFF;

  /* Semantic */
  --bg-primary: var(--pure-white);
  --bg-document: var(--document-cream);
  --text-primary: var(--steel-gray);
  --accent-primary: var(--institution-green);
  --accent-secondary: var(--certificate-gold);
}
```

#### Visual Textures
- Subtle linen paper texture (background-image)
- Embossed-style logos (box-shadow technique)
- Fine line borders (1px solid)
- Certificate-style corners on cards (border-image or SVG)

#### Motion Design Specs
| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Seal | Morph + stamp | 1.5s | ease-out |
| Stats | Counter with decimals | 2s | ease-out |
| Cards | Lift on hover | 0.3s | ease |
| Scroll reveal | Opacity fade | 0.5s | ease |
| Accordion | Height expand | 0.3s | ease-in-out |

#### Layout Specifications
- Centered, symmetrical compositions
- Container max-width: 1200px
- Card padding: 32px consistent
- Section gaps: 96px
- Grid: Clean 12-column, no bleeds

#### Sections Breakdown

**1. Hero**
- Centered layout
- Animated quality seal (SVG animation)
- "Since 1992" badge
- Tagline in elegant typography
- Dual CTAs: Products | Partner With Us

**2. Credentials Bar**
- Horizontal strip
- Certification logos
- Years badge
- Quality marks
- Subtle animation on scroll

**3. About Excerpt**
- Formal introduction
- MD photo with title
- Key statistics sidebar
- "Read Full Story" link

**4. Product Grid**
- Clean 3x2 card grid
- Consistent card design
- Spec preview on hover
- Category labels

**5. Quality Standards**
- Accordion component
- Detailed parameters per category
- Expandable specifications
- Monospace data display

**6. Testimonials**
- Formal card layout
- Verification badges
- Location + yield data
- Photo + name

**7. Partnership**
- Dealer benefits list
- Structured layout
- Application CTA
- Contact for bulk orders

**8. Footer**
- Comprehensive links
- Legal information
- Certifications repeated
- Address block

---

## VARIANT 4: "Future Farm"
### Bold Contemporary

#### Aesthetic Direction
Agricultural innovation meets startup energy. Bright, confident, forward-looking. Appeals to younger farmers and modern dealers who embrace technology.

#### The Memorable Element
Interactive seed selector in hero - click a crop type and watch seeds animate into a product showcase. Gamified discovery experience.

#### Typography System
```css
/* Display - Bold geometric, statement-making */
--font-display: 'Clash Display', sans-serif;

/* Body - Modern, friendly */
--font-body: 'General Sans', sans-serif;

/* Accent - UI elements */
--font-accent: 'Cabinet Grotesk', sans-serif;
```

#### Color Palette
```css
:root {
  --electric-lime: #BFFF00;
  --deep-forest: #0D2818;
  --sky-blue: #00A3FF;
  --hot-coral: #FF6B6B;
  --charcoal: #1C1C1C;
  --off-white: #F8F8F6;

  /* Semantic */
  --bg-dark: var(--charcoal);
  --bg-light: var(--off-white);
  --text-dark: var(--charcoal);
  --text-light: var(--off-white);
  --accent-primary: var(--electric-lime);
  --accent-secondary: var(--sky-blue);
}
```

#### Visual Textures
- Gradient mesh backgrounds (lime to blue, animated)
- Geometric patterns (hexagons, molecular structure)
- Glassmorphism cards (backdrop-filter: blur)
- Noise grain on dark sections (8% opacity)

#### Motion Design Specs
| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Seed particles | Interactive system | User-controlled | spring |
| Navigation | Magnetic hover | 0.3s | elastic |
| Cards | 3D tilt | Hover-linked | ease |
| Scroll | Locomotive smooth | Continuous | lerp |
| Page load | Staggered reveal | 100ms delays | spring |

#### Layout Specifications
- Bento grid (varied card sizes)
- Overlapping z-layers
- Full-bleed color blocks
- Asymmetric balance
- Container: Full-width with padding

#### Sections Breakdown

**1. Hero**
- Dark background
- Interactive crop selector buttons
- Seed particle system (Canvas/particles.js)
- Bold headline with gradient text
- Animated scroll prompt

**2. Impact Numbers**
- Large typography stats
- Live counting animation
- Lime accent highlights
- Glassmorphism containers

**3. Categories**
- Bento grid layout
- Varied card sizes
- 3D tilt on hover
- Quick preview on click

**4. Innovation**
- Tech approach showcase
- Quality testing process
- Icon animations
- Modern imagery

**5. Success Stories**
- Video testimonials
- Carousel with thumbnails
- Play button animations
- Quote overlays

**6. Knowledge Hub**
- Blog preview cards
- Farming tips
- Seasonal guides
- "View All" CTA

**7. Connect**
- Split design
- WhatsApp quick connect (floating)
- Contact form
- Social proof badges

**8. Footer**
- Modern minimal
- Icon-based navigation
- Social links prominent
- Newsletter with gradient input

---

## Live Deployments

All 4 variants are deployed to AWS Amplify with automatic CI/CD from GitHub branches.

| Variant | Branch | Live URL |
|---------|--------|----------|
| Golden Harvest | `variant-1` | https://variant-1.d2mwc8xx75txzh.amplifyapp.com |
| Bengal Roots | `variant-2` | https://variant-2.d2mwc8xx75txzh.amplifyapp.com |
| Trust Mark | `variant-3` | https://variant-3.d2mwc8xx75txzh.amplifyapp.com |
| Future Farm | `variant-4` | https://variant-4.d2mwc8xx75txzh.amplifyapp.com |

**Deployment Details:**
- **AWS Region:** ap-south-1 (Mumbai)
- **App ID:** d2mwc8xx75txzh
- **Auto-deploy:** Enabled (push to branch triggers rebuild)

---

## Implementation Notes

### Shared Dependencies
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "framer-motion": "^10.0.0",
    "tailwindcss": "^3.4.0",
    "@tailwindcss/typography": "^0.5.0"
  }
}
```

### Font Loading Strategy
Use `next/font` for optimal loading:
```tsx
import { Bodoni_Moda, Libre_Franklin } from 'next/font/google'
```

### Image Sources
- Hero backgrounds: Unsplash (agriculture, farming, harvest)
- Product images: Placeholder or actual product photos
- Farmer portraits: Unsplash (Indian farmers)

### Responsive Breakpoints
```css
/* Mobile First */
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Accessibility Requirements
- Minimum contrast ratio: 4.5:1
- Focus indicators on all interactive elements
- Reduced motion support: `prefers-reduced-motion`
- Semantic HTML structure
- ARIA labels where needed
