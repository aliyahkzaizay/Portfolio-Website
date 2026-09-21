import { useEffect, useRef } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Footer from './components/Footer';
import { pop, scrollToSection } from './motion';

export default function App() {
  const root = useRef(null);
  useEffect(() => {
    const element = root.current;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          pop(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });
    element.querySelectorAll('[data-pop]').forEach(el => observer.observe(el));
    const legacy = { home: 'az-journal', top: 'az-journal', about: 'az-desktop', work: 'az-music', contact: 'az-contact' };
    const frame = requestAnimationFrame(() => {
      const id = location.hash.slice(1);
      if (id) scrollToSection(legacy[id] || id);
    });
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      element.getAnimations({ subtree: true }).forEach(animation => animation.cancel());
    };
  }, []);

  function navigate(event) {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.hash.slice(1);
    if (document.getElementById(id)) {
      event.preventDefault();
      scrollToSection(id);
    }
  }
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <div id="az-worlds" ref={root} onClick={navigate} aria-label="Aliyah portfolio: journal, desktop, and project playlists">
      <Navigation />
      <main id="main-content"><Hero /><About /><Projects /></main>
      <Footer />
    </div>
  </>;
}
