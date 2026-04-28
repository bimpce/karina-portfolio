/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronLeft, ChevronRight, Camera, ArrowUp } from "lucide-react";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";

// Shared Layout Component
function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Update Page Titles
    const titleMap: { [key: string]: string } = {
      "/": "Karina",
      "/index.html": "Karina",
      "/gallery.html": "Gallery — Karina",
      "/about.html": "About — Karina",
      "/contact.html": "Contact — Karina",
    };
    document.title = titleMap[pathname] || "Karina Photography";
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const navLinks = [
    { name: "Home", path: "/index.html" },
    { name: "Gallery", path: "/gallery.html" },
    { name: "About", path: "/about.html" },
    { name: "Contact", path: "/contact.html" },
  ];

  const isHighlighted = (path: string) => {
    if (path === "/index.html" && (pathname === "/" || pathname === "/index.html")) return true;
    return pathname === path;
  };

  return (
    <div className="min-h-screen bg-black font-dmsans text-white selection:bg-white selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-6 md:px-16 mix-blend-difference">
        <Link to="/index.html" className="text-2xl font-viaoda tracking-tighter hover:opacity-70 transition-opacity">
          KARINA
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-12">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={link.path}
                className={`text-xs uppercase tracking-[0.3em] hover:opacity-50 transition-opacity ${
                  isHighlighted(link.path) ? "border-b border-white pb-1" : ""
                }`}
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white hover:opacity-50 transition-opacity"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center space-y-8"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`text-2xl font-viaoda tracking-widest uppercase hover:text-gray-400 ${
                  isHighlighted(link.path) ? "opacity-100" : "opacity-40"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {children}

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.1, backgroundColor: "#ffffff", color: "#000000" }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-[60] w-10 h-10 rounded-full border border-white flex items-center justify-center bg-black text-white transition-colors duration-300 group"
          >
            <ArrowUp size={18} strokeWidth={1.5} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-12 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
          &copy; {new Date().getFullYear()} Karina Photography &mdash; All Rights Reserved
        </p>
      </footer>
    </div>
  );
}

// Home Page Component
function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Hero Section */}
      <section className="relative h-dvh w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero.avif" 
            alt="Wedding Background" 
            className="w-full h-full object-cover force-grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/65" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          className="relative z-10 text-center"
        >
          <h1 className="text-8xl md:text-[12rem] font-viaoda leading-none tracking-tighter mb-4">
            Karina
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="font-pinyon text-3xl md:text-5xl text-white/80 italic tracking-wide"
          >
            Capturing Love Stories
          </motion.p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.5em] text-white/40"
          >
            Scroll
          </motion.div>
        </motion.div>
      </section>

      {/* Intro & Preview Section */}
      <main className="max-w-7xl mx-auto px-6 py-24 md:py-40">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="md:col-start-4 md:col-span-6"
          >
            <p className="text-lg md:text-xl leading-relaxed text-white/90 text-center font-light tracking-wide">
              I believe in the quiet moments, the unspoken promises, and the raw beauty of human connection. Through my lens, I strive to preserve the authentic emotions and timeless elegance of your wedding day.
            </p>
          </motion.div>
        </div>

        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="aspect-[3/4] w-full md:w-1/3 overflow-hidden bg-white/5"
          >
            <img 
              src="/images/preview-1.png" 
              alt="Wedding preview"
              className="w-full h-full object-cover force-grayscale hover:scale-105 transition-transform duration-1000"
            />
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <Link 
            to="/gallery.html" 
            className="inline-block border-b border-white pb-1 text-xs uppercase tracking-[0.4em] transition-opacity hover:opacity-50"
          >
            Explore Full Gallery
          </Link>
        </motion.div>
      </main>
    </motion.div>
  );
}

// Gallery Page Component
function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const images = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    src: `/images/gallery-${i + 1}.png`,
  }));

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  // Lock scroll when lightbox is open
  useEffect(() => {
    if (selectedImage !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="max-w-7xl mx-auto px-6 py-24 md:py-40"
    >
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        className="text-center mb-24"
      >
        <h1 className="text-8xl md:text-9xl font-viaoda tracking-tighter leading-none mb-6 text-white uppercase">Gallery</h1>
        <p className="font-pinyon text-3xl md:text-5xl text-white/80 italic tracking-wide">Moments frozen in time</p>
      </motion.div>

      {/* Masonry Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
        {images.map((img, index) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: (index % 3) * 0.1, duration: 0.8 }}
            className="relative cursor-pointer group break-inside-avoid overflow-hidden"
            onClick={() => setSelectedImage(index)}
          >
            <img
              src={img.src}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-auto force-grayscale hover:opacity-80 transition-opacity duration-700"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors pointer-events-none" />
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12 mb-reverse"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button 
              className="fixed top-8 right-8 text-white hover:opacity-50 transition-opacity z-[110]"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} strokeWidth={1} />
            </button>

            {/* Navigation */}
            <button 
              className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 text-white hover:opacity-50 transition-opacity z-[110]"
              onClick={handlePrev}
            >
              <ChevronLeft size={48} strokeWidth={1} />
            </button>
            <button 
              className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 text-white hover:opacity-50 transition-opacity z-[110]"
              onClick={handleNext}
            >
              <ChevronRight size={48} strokeWidth={1} />
            </button>

            {/* Image Container */}
            <motion.div 
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative max-w-full max-h-full flex items-center justify-center"
            >
              <img
                src={images[selectedImage].src}
                alt="Enlarged gallery view"
                className="max-w-full max-h-[85dvh] object-contain force-grayscale shadow-2xl"
              />
              <div className="absolute bottom-[-40px] text-[10px] uppercase tracking-[0.4em] text-white/40">
                {selectedImage + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}

// About Page Component
function About() {
  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="max-w-5xl mx-auto px-6 py-24 md:py-40"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-center mb-32">
        {/* Headshot */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          className="md:col-span-5 flex justify-center"
        >
          <div className="w-[280px] h-[280px] rounded-full overflow-hidden border border-white/10 shadow-2xl">
            <img 
              src="/images/about.avif" 
              alt="Karina" 
              className="w-full h-full object-cover force-grayscale"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>

        {/* Bio Text */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
          className="md:col-span-7 space-y-6"
        >
          <h1 className="text-5xl md:text-7xl font-viaoda tracking-tighter mb-8 uppercase">About Karina</h1>
          <p className="text-lg leading-relaxed text-white/80 font-light tracking-wide">
            I am a storyteller at heart, dedicated to documenting the raw, unscripted beauty of love. Based in the city but drawn to the world, I've spent a decade capturing weddings with a commitment to timeless elegance and authentic emotion. My approach is minimal and intentional, allowing the true spirit of your celebration to shine through.
          </p>
          <p className="text-lg leading-relaxed text-white/80 font-light tracking-wide">
            I believe that the most powerful images are the ones that make you feel—the quiet sigh of relief after the ceremony, the frantic joy of the dance floor, and the stolen glances in between. My goal is to provide you with a visual legacy that you will cherish for a lifetime, preserved in a style that never goes out of fashion.
          </p>
        </motion.div>
      </div>

      {/* Testimonial */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="text-center pt-24 border-t border-white/5"
      >
        <blockquote className="space-y-8">
          <p className="font-pinyon text-4xl md:text-6xl text-white/90 italic leading-tight">
            "Karina has an extraordinary ability to capture the soul of a moment. Her photos are not just images; they are memories given life."
          </p>
          <footer className="text-[10px] uppercase tracking-[0.4em] text-white/50">
            &mdash; Sarah & James, Tuscany 2023
          </footer>
        </blockquote>
      </motion.section>
    </motion.main>
  );
}

// Contact Page Component
function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="max-w-2xl mx-auto px-6 py-24 md:py-40"
    >
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        className="text-center mb-16"
      >
        <h1 className="text-6xl md:text-8xl font-viaoda tracking-tighter mb-4 uppercase">Contact</h1>
        <p className="font-pinyon text-2xl md:text-3xl text-white/60 italic">Let's create something timeless</p>
      </motion.div>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <p className="text-xl font-light tracking-wide text-white/90">Thank you. I'll be in touch soon.</p>
          </motion.div>
        ) : (
          <motion.form 
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            onSubmit={handleSubmit}
            className="space-y-12"
          >
            <div className="space-y-8">
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="relative">
                <input 
                  type="text" 
                  required
                  placeholder="Your Name"
                  className="w-full bg-transparent border-b border-white/30 py-4 outline-none focus:border-white transition-colors placeholder:text-white/20 font-light tracking-wide"
                />
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="relative">
                <input 
                  type="email" 
                  required
                  placeholder="Your Email"
                  className="w-full bg-transparent border-b border-white/30 py-4 outline-none focus:border-white transition-colors placeholder:text-white/20 font-light tracking-wide"
                />
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="relative">
                <textarea 
                  required
                  rows={4}
                  placeholder="Tell me your story..."
                  className="w-full bg-transparent border-b border-white/30 py-4 outline-none focus:border-white transition-colors placeholder:text-white/20 font-light tracking-wide resize-none"
                />
              </motion.div>
            </div>

            <motion.button 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              type="submit"
              className="w-full bg-white text-black py-4 text-xs uppercase tracking-[0.4em] font-medium transition-all duration-300 hover:bg-black hover:text-white hover:border hover:border-white"
            >
              Send Message
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="mt-24 pt-12 border-t border-white/5 flex flex-col items-center space-y-6"
      >
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white hover:opacity-50 transition-opacity"
        >
          <Camera size={20} strokeWidth={1.5} />
        </a>
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
          hello@karinaphotography.com
        </p>
      </motion.div>
    </motion.main>
  );
}

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/index.html" element={<Home />} />
          <Route path="/gallery.html" element={<Gallery />} />
          <Route path="/about.html" element={<About />} />
          <Route path="/contact.html" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
}
