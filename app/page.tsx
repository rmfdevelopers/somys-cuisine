'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Leaf, 
  Package, 
  ChefHat, 
  Users, 
  Utensils, 
  Flame, 
  Instagram, 
  Mail, 
  MapPin, 
  Phone, 
  Menu, 
  X, 
  ArrowRight, 
  CheckCheck, 
  Loader2, 
  ImageOff 
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: layered
// Divider Style: D-STAT
// Typography Personality: refined

const brand = {
  name: "Somy’s Cuisine",
  tagline: "Deluxe & Tasty Nigerian Meals",
  description: "Authentic, freshly made local delicacies crafted for the discerning palate, from intimate dinners to grand event catering in the heart of Lagos.",
  industry: "food",
  region: "nigeria",
  currency: "₦"
};

const IMAGES = {
  hero: "https://picsum.photos/seed/food0/1920/1080",
  products: [
    "https://picsum.photos/seed/food2/800/1000",
    "https://picsum.photos/seed/food3/800/1000",
    "https://picsum.photos/seed/food4/800/1000",
    "https://picsum.photos/seed/food5/800/1000"
  ],
  gallery: [
    "https://picsum.photos/seed/food6/600/800",
    "https://picsum.photos/seed/food7/600/600",
    "https://picsum.photos/seed/food8/800/600",
    "https://picsum.photos/seed/food9/600/800",
    "https://picsum.photos/seed/food10/600/600",
    "https://picsum.photos/seed/food11/800/600"
  ]
};

const products = [
  { name: "The Deluxe Party Tray", description: "A lavish spread of Jollof rice, fried plantains, and assorted proteins for group celebrations.", price: "₦85,000" },
  { name: "Family Size Soup Bowl", description: "Authentic Nigerian soups prepared with premium proteins and fresh local herbs.", price: "₦45,000" },
  { name: "Executive Lunch Pack", description: "Portioned perfection for the busy professional, featuring our signature local sides.", price: "₦22,500" },
  { name: "Ultimate Event Spread", description: "Comprehensive catering for weddings and corporate gatherings with a full menu variety.", price: "₦195,000" }
];

const features = [
  { title: "Freshly Prepared", description: "Every meal is cooked to order using the finest market-fresh ingredients.", icon: Leaf },
  { title: "Bulk Food Packs", description: "Convenient meal prepping made easy with our specialized bowl and tray options.", icon: Package },
  { title: "Event Excellence", description: "Elevate your celebrations with our premium catering and professional service.", icon: ChefHat }
];

const testimonials = [
  { name: "Adeola Balogun", text: "The Jollof tray was the highlight of our party. Every guest asked for the caterer's contact!", role: "Event Planner" },
  { name: "Chiamaka Okafor", text: "The convenience of the bulk food packs has changed my work week. Delicious and healthy.", role: "Corporate Professional" }
];

const stats = [
  { number: "3.9k", label: "Instagram Community", icon: Users },
  { number: "50+", label: "Recipe Varieties", icon: Utensils },
  { number: "100%", label: "Natural Spices", icon: Flame }
];

// --- Hooks & Components ---

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

function SafeImage({ src, alt, fill, width, height, className, priority }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-zinc-900 ${className}`}>
        <ImageOff size={24} className="text-white/20" />
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
  const [mobileMenu, setMobileMenu] = useState(false);
  
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Section Refs
  const revealFeatures = useScrollReveal();
  const revealProducts = useScrollReveal();
  const revealAbout = useScrollReveal();
  const revealTestimonials = useScrollReveal();
  const revealContact = useScrollReveal();
  const revealGallery = useScrollReveal();

  return (
    <main className="relative">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 py-4 ${
        scrolled ? 'bg-[var(--primary)]/95 backdrop-blur-xl shadow-2xl py-3' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[var(--accent)] rounded-lg flex items-center justify-center font-heading font-black text-black text-xl">
              SC
            </div>
            <span className="font-heading text-2xl font-bold tracking-tight text-white">Somy’s</span>
          </a>

          <div className="hidden md:flex items-center gap-10">
            {['Home', 'The Menu', 'Gallery'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-sm font-medium text-white/70 hover:text-[var(--accent)] transition-colors">
                {item}
              </a>
            ))}
            <a href="#contact" className="bg-[var(--accent)] text-black px-6 py-2.5 rounded-full font-bold text-sm hover:brightness-110 transition-all shadow-lg shadow-[var(--accent)]/20">
              Order Now
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenu(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[200] bg-[var(--primary)] transition-transform duration-500 transform ${mobileMenu ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8">
          <div className="flex justify-between items-center mb-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[var(--accent)] rounded-lg flex items-center justify-center font-heading font-black text-black text-xl">SC</div>
              <span className="font-heading text-2xl font-bold text-white">Somy’s</span>
            </div>
            <button onClick={() => setMobileMenu(false)} className="text-white"><X size={32} /></button>
          </div>
          <div className="flex flex-col gap-8">
            {['Home', 'The Menu', 'Gallery', 'Order Now'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(' ', '-')}`} 
                onClick={() => setMobileMenu(false)}
                className="text-4xl font-heading font-bold text-white hover:text-[var(--accent)] transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section (HR-B) */}
      <section id="home" className="min-h-screen relative flex items-end pb-32 px-6 md:px-16 overflow-hidden">
        <SafeImage src={IMAGES.hero} alt={brand.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)] via-[var(--primary)]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/60 via-transparent to-transparent" />
        
        <div className="relative z-10 max-w-4xl animate-slideUp">
          <h1 className="font-heading text-6xl md:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-8">
            Experience the <br/>Art of Gastronomy
          </h1>
          <p className="text-white/70 text-xl md:text-2xl max-w-2xl leading-relaxed mb-12">
            Freshly made local meals and deluxe food trays delivered across Lagos. Where luxury meets local flavor.
          </p>
          <div className="flex flex-wrap gap-6">
            <a href="#products" className="bg-[var(--accent)] text-black px-10 py-5 rounded-full font-black text-lg hover:scale-105 transition-all shadow-xl shadow-[var(--accent)]/30">
              Explore the Menu
            </a>
            <a href="#about" className="backdrop-blur-md bg-white/10 border border-white/20 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-black transition-all">
              Our Story
            </a>
          </div>
        </div>
      </section>

      {/* Features Section (F-NUMBERED) */}
      <section id="features" ref={revealFeatures.ref} className="py-28 px-6 bg-[var(--primary)]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-20">
            <h2 className="font-heading text-5xl md:text-7xl font-black text-white mb-6">Why Choose Somy’s</h2>
            <p className="text-[var(--accent)] font-mono text-sm tracking-[0.3em] uppercase">Sharp delivery across Lagos</p>
          </div>
          <div className="divide-y divide-white/10">
            {features.map((f, i) => (
              <div key={i} className={`py-14 flex flex-col md:flex-row items-start gap-12 transition-all duration-1000 ${
                revealFeatures.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`} style={{ transitionDelay: `${i * 200}ms` }}>
                <span className="font-mono text-[var(--accent)] text-5xl font-black tracking-tighter shrink-0 w-20">
                  0{i + 1}
                </span>
                <div className="flex-1">
                  <h3 className="font-heading text-3xl font-bold text-white mb-4">{f.title}</h3>
                  <p className="text-white/50 text-xl leading-relaxed max-w-2xl">{f.description}</p>
                </div>
                <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center shrink-0 text-[var(--accent)]">
                  <f.icon size={32} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider (D-STAT) */}
      <div className="bg-[var(--accent)] py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/10 text-center">
          {stats.map((s, i) => (
            <div key={i} className="px-8 py-8 md:py-4">
              <p className="text-5xl font-black text-black tracking-tight mb-2">{s.number}</p>
              <p className="text-black/60 text-sm font-bold uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Products Section (P-STAGGER) */}
      <section id="the-menu" ref={revealProducts.ref} className="py-32 px-6 bg-[var(--secondary)] overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="font-heading text-6xl md:text-8xl font-black text-[var(--primary)] leading-none mb-6">Our Signature Menus</h2>
            <p className="text-[var(--primary)]/60 text-xl max-w-2xl mx-auto italic">From daily lunch packs to celebration trays, we serve excellence on every plate.</p>
          </div>
          
          <div className="space-y-32">
            {products.map((p, i) => (
              <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16 md:gap-24 transition-all duration-1000 ${
                revealProducts.isVisible ? 'opacity-100 translate-x-0' : i % 2 === 0 ? 'opacity-0 -translate-x-20' : 'opacity-0 translate-x-20'
              }`}>
                <div className="w-full md:w-1/2 relative group">
                  <div className="aspect-[4/5] relative rounded-[2rem] overflow-hidden shadow-2xl">
                    <SafeImage src={IMAGES.products[i]} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                  </div>
                  <div className={`absolute -bottom-10 ${i % 2 === 0 ? '-right-10' : '-left-10'} w-2/3 h-2/3 bg-[var(--primary)]/5 rounded-full blur-3xl -z-10`} />
                </div>
                <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
                  <span className="font-mono text-[var(--accent)] text-xs font-bold tracking-[0.4em] uppercase mb-6 block">Premium Selection 0{i + 1}</span>
                  <h3 className="font-heading text-5xl font-bold text-[var(--primary)] mb-6 leading-tight">{p.name}</h3>
                  <p className="text-[var(--primary)]/70 text-lg leading-relaxed mb-10 max-w-lg mx-auto md:mx-0">{p.description}</p>
                  <div className={`flex flex-col gap-8 ${i % 2 === 0 ? 'items-start' : 'items-start md:items-end'}`}>
                    <span className="text-4xl font-black text-[var(--primary)]">{p.price}</span>
                    <a href="#contact" className="bg-[var(--primary)] text-white px-12 py-4 rounded-full font-bold hover:bg-[var(--accent)] hover:text-black transition-all">
                      Place Order
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section (Masonry) */}
      <section id="gallery" ref={revealGallery.ref} className="py-28 px-6 bg-[var(--primary)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <h2 className="font-heading text-5xl md:text-7xl font-black text-white">The Variety Gallery</h2>
              <p className="text-white/50 text-xl mt-4">A visual feast of our recent culinary creations</p>
            </div>
            <a href="https://instagram.com/somy_cuisine" target="_blank" className="flex items-center gap-3 text-[var(--accent)] font-bold text-lg hover:translate-x-2 transition-transform">
              View Instagram <Instagram size={24} />
            </a>
          </div>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {IMAGES.gallery.map((src, i) => (
              <div key={i} className={`break-inside-avoid group relative rounded-3xl overflow-hidden shadow-xl transition-all duration-700 ${
                revealGallery.isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
              }`} style={{ transitionDelay: `${i * 100}ms` }}>
                <SafeImage src={src} alt={`Gallery ${i + 1}`} width={600} height={800} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={revealAbout.ref} className="py-32 px-6 bg-[var(--secondary)] overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${revealAbout.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <h2 className="font-heading text-6xl font-black text-[var(--primary)] mb-8">Our Culinary Journey</h2>
            <div className="space-y-6 text-xl text-[var(--primary)]/70 leading-relaxed">
              <p>At Somy’s Cuisine, we believe that Nigerian meals deserve a premium stage. We combine traditional recipes with modern presentation to provide an unmatched dining experience for families and corporations alike.</p>
              <p>Based in the heart of Lagos, we are dedicated to sourcing the freshest local ingredients to ensure that every bowl and tray we deliver is a testament to the richness of our heritage.</p>
            </div>
            <div className="mt-12 flex flex-wrap gap-8">
              {stats.map((s, i) => (
                <div key={i} className={`transition-all duration-1000 ${revealAbout.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${i * 150}ms` }}>
                  <p className="font-heading text-4xl font-black text-[var(--accent)]">{s.number}</p>
                  <p className="text-[var(--primary)]/60 text-xs font-bold uppercase tracking-widest mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={`relative transition-all duration-1000 delay-300 ${revealAbout.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <div className="aspect-square relative rounded-[3rem] overflow-hidden shadow-2xl z-10">
              <SafeImage src="https://picsum.photos/seed/catering/800/800" alt="About Somys Cuisine" fill className="object-cover" />
            </div>
            <div className="absolute -top-10 -right-10 w-64 h-64 border-2 border-[var(--accent)] rounded-[3rem] -z-0" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[var(--accent)]/10 rounded-[2rem] -z-0" />
          </div>
        </div>
      </section>

      {/* Testimonials (T-SPOTLIGHT) */}
      <section ref={revealTestimonials.ref} className="py-32 px-6 bg-[var(--primary)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-5xl md:text-7xl font-black text-white mb-20">What Our Clients Say</h2>
          <div className="space-y-12">
            {testimonials.map((t, i) => (
              <div key={i} className={`relative py-14 px-10 rounded-[2.5rem] border border-white/5 bg-white/5 hover:border-[var(--accent)]/20 transition-all duration-700 ${
                revealTestimonials.isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-6 blur-sm'
              }`} style={{ transitionDelay: `${i * 200}ms` }}>
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[var(--accent)] flex items-center justify-center shadow-xl">
                  <span className="text-black text-4xl font-black leading-none mt-4">&ldquo;</span>
                </div>
                <p className="text-white/80 text-2xl md:text-3xl font-heading italic leading-relaxed mb-10">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center justify-center gap-5">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-[var(--accent)] font-black text-2xl border border-white/10">
                    {t.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-white text-lg">{t.name}</p>
                    <p className="text-[var(--accent)] text-sm font-mono tracking-widest uppercase">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section (C3 Minimal Centered) */}
      <section id="contact" ref={revealContact.ref} className="py-32 px-6 bg-[var(--secondary)]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[var(--accent)] font-mono text-sm font-bold tracking-[0.5em] uppercase mb-6">Reservation</p>
          <h2 className="font-heading text-6xl md:text-8xl font-black text-[var(--primary)] mb-8">Place Your Order</h2>
          <p className="text-[var(--primary)]/60 text-xl leading-relaxed mb-16">
            Ready for a deluxe taste of Nigeria? Fill out the form below or reach out directly to coordinate your delivery or event catering.
          </p>
          
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--primary)] pt-24 pb-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[var(--accent)] rounded-lg flex items-center justify-center font-heading font-black text-black text-xl">SC</div>
              <span className="font-heading text-2xl font-bold text-white">Somy’s Cuisine</span>
            </a>
            <p className="text-white/50 leading-relaxed mb-8">Deluxe Nigerian Gastronomy for the discerning palate.</p>
            <div className="flex gap-4">
              <a href="https://instagram.com/somy_cuisine" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-[var(--accent)] hover:text-black transition-all">
                <Instagram size={20} />
              </a>
              <a href="mailto:somyscuisine@gmail.com" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-[var(--accent)] hover:text-black transition-all">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-heading text-xl font-bold text-white mb-8">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'The Menu', 'Gallery', 'Order Now'].map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-white/50 hover:text-[var(--accent)] transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-xl font-bold text-white mb-8">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-white/50">
                <MapPin size={18} className="text-[var(--accent)]" /> Lagos, Nigeria
              </li>
              <li className="flex items-center gap-3 text-white/50">
                <Phone size={18} className="text-[var(--accent)]" /> {brand.region === 'nigeria' ? '+234 ' : ''}wa.me/message/FXHJQ5VUEFEJJ1
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-xl font-bold text-white mb-8">Operating Hours</h4>
            <ul className="space-y-2 text-white/50">
              <li>Mon - Fri: 9:00 AM - 7:00 PM</li>
              <li>Sat: 10:00 AM - 4:00 PM</li>
              <li>Sun: Events Only</li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-white/30 text-sm">
          <p>© {new Date().getFullYear()} Somy’s Cuisine. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center animate-scaleIn bg-white rounded-3xl border border-[var(--primary)]/5 shadow-2xl relative overflow-hidden">
        <div className="w-20 h-20 rounded-full bg-[var(--accent)]/20 flex items-center justify-center mb-6 border border-[var(--accent)]/40 relative z-10">
          <CheckCheck size={32} className="text-[var(--accent)]" />
        </div>
        <h3 className="font-heading text-3xl font-black text-[var(--primary)] mb-3 relative z-10">Order Inquiry Received</h3>
        <p className="text-[var(--primary)]/60 max-w-sm text-lg relative z-10">Your message has been sent. Our team will review your order details and contact you shortly.</p>
        <button onClick={() => setSent(false)} className="mt-8 text-[var(--primary)] font-bold underline">Send another message</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-left">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[var(--primary)] font-bold text-sm uppercase tracking-widest ml-1">Full Name</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
            className="w-full bg-white border border-[var(--primary)]/10 rounded-2xl px-6 py-4 text-[var(--primary)] placeholder-black/20 outline-none focus:border-[var(--accent)] transition-all"
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[var(--primary)] font-bold text-sm uppercase tracking-widest ml-1">WhatsApp/Phone</label>
          <input
            type="text"
            required
            value={form.phone}
            onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
            className="w-full bg-white border border-[var(--primary)]/10 rounded-2xl px-6 py-4 text-[var(--primary)] placeholder-black/20 outline-none focus:border-[var(--accent)] transition-all"
            placeholder="+234..."
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-[var(--primary)] font-bold text-sm uppercase tracking-widest ml-1">Your Order / Inquiry</label>
        <textarea
          rows={5}
          required
          value={form.message}
          onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
          className="w-full bg-white border border-[var(--primary)]/10 rounded-2xl px-6 py-4 text-[var(--primary)] placeholder-black/20 outline-none focus:border-[var(--accent)] transition-all resize-none"
          placeholder="I would like to order the Deluxe Party Tray for Saturday..."
        />
      </div>
      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-[var(--primary)] text-white py-5 rounded-2xl font-black text-xl hover:bg-[var(--accent)] hover:text-black transition-all flex justify-center items-center gap-3 disabled:opacity-50"
      >
        {loading ? <Loader2 className="animate-spin" /> : <>Send Inquiry <ArrowRight size={20} /></>}
      </button>
    </form>
  );
}