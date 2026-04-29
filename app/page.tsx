'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  ChefHat, 
  Leaf, 
  Utensils, 
  Zap, 
  Heart, 
  BookOpen, 
  MapPin, 
  Instagram, 
  Mail, 
  Phone, 
  ArrowRight, 
  CheckCheck, 
  Loader2, 
  ImageOff, 
  Menu, 
  X 
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: layered
// Divider Style: D-QUOTE
// Typography Personality: refined

const brand = {
  name: "Somy’s Cuisine",
  tagline: "The Art of Gourmet Grazing",
  description: "Where Lagos soul meets atelier precision. We craft freshly made local delicacies, luxury food trays, and bespoke event catering for the gourmet lifestyle.",
  industry: "food",
  region: "Nigeria",
  currency: "₦"
};

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1547132717-0cd6145a2e6b?q=80&w=2000",
  products: [
    "https://images.unsplash.com/photo-1629567971562-a5242697c783?q=80&w=1000",
    "https://images.unsplash.com/photo-1629567971554-0cc0883dd57b?q=80&w=1000",
    "https://images.unsplash.com/photo-1625108958889-05b6e220ea25?q=80&w=1000",
    "https://images.unsplash.com/photo-1641424013712-c5c8e4f56be2?q=80&w=1000"
  ],
  gallery: [
    "https://images.unsplash.com/photo-1685270066037-db1f16d02e06?q=80&w=800",
    "https://images.unsplash.com/photo-1686752164889-c2123d4776ab?q=80&w=800",
    "https://images.unsplash.com/photo-1612974443138-a2c494d78dfb?q=80&w=800",
    "https://images.unsplash.com/photo-1740597205032-c6439723d5bf?q=80&w=800",
    "https://images.unsplash.com/photo-1772985206892-7a922fc5f6a3?q=80&w=800",
    "https://images.unsplash.com/photo-1739323981235-83bb0815df58?q=80&w=800"
  ]
};

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

function SafeImage({ src, alt, fill, width, height, className, priority }: any) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-zinc-100 ${className}`}>
        <ImageOff size={24} className="text-zinc-300" />
      </div>
    );
  }
  return (
    <Image 
      src={src} 
      alt={alt} 
      fill={fill} 
      width={!fill ? (width ?? 800) : undefined} 
      height={!fill ? (height ?? 600) : undefined} 
      className={className} 
      priority={priority} 
      onError={() => setError(true)} 
    />
  );
}

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main className="relative">
      {/* HEADER */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 md:px-12 py-5 flex items-center justify-between ${scrolled ? 'bg-primary/90 backdrop-blur-xl shadow-sm' : 'bg-transparent'}`}>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-secondary flex items-center justify-center text-primary font-heading font-bold text-xl">S</div>
          <span className={`font-heading text-xl font-bold tracking-tight ${scrolled ? 'text-secondary' : 'text-white'}`}>SOMY’S</span>
        </div>
        
        <div className="hidden md:flex items-center gap-10">
          {['Atelier', 'Collections', 'Gallery', 'Inquiry'].map((link, i) => (
            <a key={i} href={`#${link.toLowerCase()}`} className={`text-sm font-medium tracking-widest uppercase transition-colors hover:text-accent ${scrolled ? 'text-secondary/70' : 'text-white/80'}`}>
              {link}
            </a>
          ))}
          <a href="#contact" className="bg-accent text-white px-6 py-2.5 text-sm font-bold tracking-wide uppercase hover:brightness-110 transition-all">
            Order Now
          </a>
        </div>

        <button className="md:hidden text-accent" onClick={() => setMobileNavOpen(true)}>
          <Menu size={28} />
        </button>
      </nav>

      {/* MOBILE NAV */}
      <div className={`fixed inset-0 z-[100] bg-secondary transition-transform duration-500 ${mobileNavOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button className="absolute top-6 right-6 text-primary" onClick={() => setMobileNavOpen(false)}>
          <X size={32} />
        </button>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {['Atelier', 'Collections', 'Gallery', 'Inquiry'].map((link, i) => (
            <a key={i} href={`#${link.toLowerCase()}`} onClick={() => setMobileNavOpen(false)} className="font-heading text-4xl text-primary font-bold">
              {link}
            </a>
          ))}
          <a href="#contact" onClick={() => setMobileNavOpen(false)} className="mt-8 bg-accent text-white px-10 py-4 font-bold text-xl uppercase">
            Order Now
          </a>
        </div>
      </div>

      {/* HERO - Pattern HR-B */}
      <section id="atelier" className="min-h-screen relative flex items-end pb-32 px-6 md:px-20 overflow-hidden">
        <SafeImage src={IMAGES.hero} alt={brand.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/50 to-transparent" />
        
        <div className="relative z-10 max-w-4xl animate-slideUp">
          <h1 className="font-heading text-7xl md:text-[8rem] font-bold text-white leading-[0.85] tracking-tighter">
            A Grazing Atelier
          </h1>
          <p className="text-white/70 mt-8 text-xl max-w-xl leading-relaxed font-light">
            {brand.description}
          </p>
          <div className="flex flex-wrap gap-6 mt-12">
            <a href="#collections" className="bg-accent text-white px-10 py-5 font-bold text-lg hover:bg-white hover:text-secondary transition-all duration-300">
              Explore the Collection
            </a>
            <a href="#inquiry" className="border border-white/30 text-white px-10 py-5 font-medium text-lg hover:bg-white/10 transition-all duration-300">
              Our Process
            </a>
          </div>
        </div>
      </section>

      {/* DIVIDER - D-QUOTE */}
      <div className="py-32 px-8 text-center bg-secondary/5 border-y border-secondary/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--accent)/5,transparent_70%)]" />
        <p className="relative font-heading text-4xl md:text-6xl font-medium text-secondary max-w-4xl mx-auto leading-tight italic">
          &ldquo;We don’t just serve food; we curate edible masterpieces for the gourmet lifestyle.&rdquo;
        </p>
        <p className="relative text-secondary/40 mt-8 text-sm tracking-[0.4em] uppercase font-bold">The Somy Mandate</p>
      </div>

      {/* FEATURES - Pattern F-BENTO */}
      <Features />

      {/* ABOUT - Pattern V3 (Split) */}
      <AboutSection />

      {/* PRODUCTS - Pattern P-EDITORIAL */}
      <Collections />

      {/* GALLERY - Masonry */}
      <GallerySection />

      {/* TESTIMONIALS - T-SLIDER */}
      <Testimonials />

      {/* CONTACT - C3 */}
      <ContactSection />

      {/* FOOTER */}
      <footer className="bg-secondary text-primary py-20 px-6 md:px-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-12 h-12 bg-accent flex items-center justify-center text-white font-heading font-bold text-2xl">S</div>
              <span className="font-heading text-3xl font-bold tracking-tight">SOMY’S CUISINE</span>
            </div>
            <p className="text-primary/60 max-w-md leading-relaxed text-lg">
              Crafting premium culinary experiences across Lagos. Our atelier approach ensures every detail of your grazing experience is meticulously handled.
            </p>
            <div className="mt-10 flex gap-6">
              <a href="https://wa.me/message/FXHJQ5VUEFEJJ1" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-accent transition-all">
                <Phone size={20} />
              </a>
              <a href="https://instagram.com/@somy_cuisine" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-accent transition-all">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-heading text-xl font-bold mb-8 uppercase tracking-widest text-accent">Atelier</h4>
            <ul className="space-y-4 text-primary/70">
              <li><a href="#atelier" className="hover:text-white transition">The Studio</a></li>
              <li><a href="#collections" className="hover:text-white transition">Menu Collections</a></li>
              <li><a href="#gallery" className="hover:text-white transition">Visual Feast</a></li>
              <li><a href="#contact" className="hover:text-white transition">Book Experience</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-xl font-bold mb-8 uppercase tracking-widest text-accent">Studio Info</h4>
            <div className="space-y-4 text-primary/70 text-sm">
              <p className="flex items-start gap-3">
                <MapPin size={18} className="shrink-0 text-accent" />
                Lagos, Nigeria
              </p>
              <p className="flex items-center gap-3">
                <Instagram size={18} className="shrink-0 text-accent" />
                @somy_cuisine
              </p>
              <p className="mt-10 pt-10 border-t border-white/10 italic">
                Sharp delivery, nationwide.
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-primary/40 text-xs tracking-widest uppercase font-bold">
          <p>© {new Date().getFullYear()} Somy’s Cuisine. All rights reserved.</p>
          <p>The Gourmet Lifestyle</p>
        </div>
      </footer>
    </main>
  );
}

function Features() {
  const { ref, isVisible } = useScrollReveal();
  const features = [
    { title: "Chef-Led Curation", description: "Every meal is treated as a bespoke project in our culinary atelier.", icon: <ChefHat size={32} /> },
    { title: "Freshly Sourced", description: "We prioritize organic, local ingredients for that authentic Lagos flavor profile.", icon: <Leaf size={32} /> },
    { title: "Gourmet Logistics", description: "Punctual delivery in temperature-controlled packaging to maintain freshness.", icon: <Zap size={32} /> },
    { title: "Custom Menus", description: "Tailored meal packs and tray varieties to suit your specific dietary desires.", icon: <Utensils size={32} /> }
  ];

  return (
    <section ref={ref} className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-secondary rounded-3xl p-12 text-primary flex flex-col justify-between group transition-all duration-700 min-h-[400px]">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mb-10 text-white">
                {features[0].icon}
              </div>
              <h3 className="font-heading text-5xl font-bold leading-tight max-w-md">{features[0].title}</h3>
            </div>
            <p className="text-primary/60 text-xl max-w-sm mt-8">{features[0].description}</p>
          </div>

          <div className="space-y-6">
            {features.slice(1).map((f, i) => (
              <div key={i} className="bg-primary border border-secondary/5 rounded-3xl p-8 hover:border-accent/30 transition-all duration-300 group h-full">
                <div className="text-accent mb-6 group-hover:scale-110 transition-transform">{f.icon}</div>
                <h3 className="font-heading text-2xl font-bold text-secondary mb-3">{f.title}</h3>
                <p className="text-secondary/50 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const { ref, isVisible } = useScrollReveal();
  const stats = [
    { number: "3.9k", label: "Gourmet Followers" },
    { number: "50+", label: "Menu Varieties" },
    { number: "12", label: "Lagos Districts" }
  ];

  return (
    <section id="inquiry" ref={ref} className="py-32 px-6 bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
        <div className={`w-full md:w-1/2 relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
          <div className="aspect-square relative rounded-[4rem] overflow-hidden shadow-2xl">
            <SafeImage src={IMAGES.gallery[0]} alt="Atelier Story" fill className="object-cover" />
          </div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-10" />
        </div>
        
        <div className={`w-full md:w-1/2 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
          <p className="text-accent font-bold tracking-[0.3em] uppercase text-xs mb-6">The Atelier Story</p>
          <h2 className="font-heading text-6xl font-bold text-secondary mb-8 leading-[1.1]">The Art of <br/> Gourmet Living</h2>
          <p className="text-secondary/70 text-xl leading-relaxed mb-12">
            At Somy’s Cuisine, we believe food is more than sustenance; it is a lifestyle. Our Grazing Atelier approach ensures that every bowl, pack, and tray is a masterpiece of flavor and presentation.
          </p>
          
          <div className="grid grid-cols-3 gap-8 pt-10 border-t border-secondary/10">
            {stats.map((s, i) => (
              <div key={i} className={`transition-all duration-1000`} style={{ transitionDelay: `${i * 200}ms` }}>
                <p className="font-heading text-4xl font-bold text-accent">{s.number}</p>
                <p className="text-secondary/40 text-xs uppercase tracking-widest font-bold mt-2">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Collections() {
  const products = [
    { name: "The Signature Atelier Bowl", description: "A curated individual serving of our most requested local delicacies.", price: "₦25,000", img: IMAGES.products[0] },
    { name: "Executive Lunch Pack", description: "Bulk office catering designed for high-performance teams.", price: "₦65,000", img: IMAGES.products[1] },
    { name: "Celebration Grazing Tray", description: "An opulent variety of finger foods, local proteins, and sides.", price: "₦120,000", img: IMAGES.products[2] },
    { name: "Atelier Grand Buffet", description: "Premium event catering for luxury gatherings and boutique celebrations.", price: "₦195,000", img: IMAGES.products[3] }
  ];

  return (
    <section id="collections" className="py-32 px-6 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div>
            <h2 className="font-heading text-6xl text-primary font-bold mb-6">Our Culinary <br/> Collections</h2>
            <p className="text-primary/40 text-lg max-w-md">Signature masterpieces from our studio, designed for the discerning palate.</p>
          </div>
          <a href="#contact" className="text-accent font-bold tracking-widest uppercase border-b-2 border-accent pb-2 hover:text-white hover:border-white transition-all">
            Custom Commissions →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((p, i) => (
            <div key={i} className="group relative h-[450px] rounded-[3rem] overflow-hidden">
              <SafeImage src={p.img} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000 opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-10 z-10">
                <h3 className="text-4xl font-heading font-bold text-white mb-4">{p.name}</h3>
                <div className="max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-500">
                  <p className="text-white/60 text-sm mb-6 max-w-xs">{p.description}</p>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <span className="text-accent font-bold text-2xl">{p.price}</span>
                  <a href="#contact" className="bg-white text-secondary px-8 py-3 rounded-full font-bold text-sm hover:bg-accent hover:text-white transition-all">
                    Order
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section id="gallery" className="py-32 px-6 bg-primary">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center font-heading text-6xl font-bold text-secondary mb-20">The Visual Feast</h2>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {IMAGES.gallery.map((src, i) => (
            <div key={i} className="break-inside-avoid relative rounded-3xl overflow-hidden group">
              <SafeImage src={src} alt={`Gallery ${i}`} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/40 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    { name: "Chidinma O.", text: "The Grazing Tray was the highlight of my housewarming. The flavors are so authentic yet refined.", role: "Lekki Resident" },
    { name: "Tunde A.", text: "Somy's Lunch Packs have changed our office culture. Everyone looks forward to lunch now.", role: "Corporate Manager" },
    { name: "Amara E.", text: "Best jollof tray in Lagos. Period. The presentation is truly 'gourmet lifestyle'.", role: "Event Planner" }
  ];

  return (
    <section className="py-32 bg-secondary overflow-hidden">
      <div className="w-full overflow-hidden">
        <div className="flex w-[200%] gap-8 animate-slide-left hover:[animation-play-state:paused]">
          {[...items, ...items].map((t, i) => (
            <div key={i} className="w-[450px] shrink-0 bg-white/5 border border-white/10 rounded-[3rem] p-12">
              <div className="flex gap-1.5 mb-10">
                {[1, 2, 3, 4, 5].map(n => <div key={n} className="w-2.5 h-2.5 rounded-full bg-accent" />)}
              </div>
              <p className="text-white/80 text-2xl font-heading italic leading-relaxed mb-10">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-5 pt-8 border-t border-white/5">
                <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center text-white font-bold text-xl">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-white text-lg">{t.name}</p>
                  <p className="text-white/30 text-xs uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <section id="contact" className="py-32 px-6 bg-primary">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-accent font-bold tracking-[0.4em] uppercase text-xs mb-6">Experience Somy</p>
        <h2 className="font-heading text-6xl font-bold text-secondary mb-8">Book Your Atelier Experience</h2>
        <p className="text-secondary/50 mb-16 text-xl max-w-xl mx-auto">From intimate dinners to corporate lunches, let us curate your next milestone.</p>
        
        {sent ? (
          <div className="bg-secondary rounded-[3rem] p-20 text-center animate-scaleIn">
            <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center mx-auto mb-10 text-white">
              <CheckCheck size={48} />
            </div>
            <h3 className="font-heading text-4xl font-bold text-white mb-4">Message Sent</h3>
            <p className="text-white/60 text-lg">Thank you for your interest. We will contact you shortly to finalize your bespoke menu.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="text-left space-y-6 bg-white p-12 rounded-[3rem] shadow-xl border border-secondary/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input 
                type="text" 
                placeholder="Name" 
                required 
                className="w-full bg-primary border-none rounded-2xl px-6 py-5 text-secondary placeholder-secondary/30 focus:ring-2 focus:ring-accent outline-none transition-all"
                onChange={e => setForm({...form, name: e.target.value})}
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                required 
                className="w-full bg-primary border-none rounded-2xl px-6 py-5 text-secondary placeholder-secondary/30 focus:ring-2 focus:ring-accent outline-none transition-all"
                onChange={e => setForm({...form, email: e.target.value})}
              />
            </div>
            <input 
              type="text" 
              placeholder="WhatsApp Number" 
              required 
              className="w-full bg-primary border-none rounded-2xl px-6 py-5 text-secondary placeholder-secondary/30 focus:ring-2 focus:ring-accent outline-none transition-all"
              onChange={e => setForm({...form, phone: e.target.value})}
            />
            <textarea 
              rows={5} 
              placeholder="Tell us about your event / desired platter..." 
              required 
              className="w-full bg-primary border-none rounded-2xl px-6 py-5 text-secondary placeholder-secondary/30 focus:ring-2 focus:ring-accent outline-none transition-all"
              onChange={e => setForm({...form, message: e.target.value})}
            />
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-secondary text-primary py-5 rounded-2xl font-bold text-xl hover:bg-accent transition-all duration-300 disabled:opacity-50 flex justify-center items-center gap-3"
            >
              {loading ? <Loader2 className="animate-spin" /> : <>Request a Quote <ArrowRight /></>}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}