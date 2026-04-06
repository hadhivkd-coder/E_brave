import React, { useEffect, useState } from 'react';
import SplashScreen from './components/SplashScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Process from './components/Process';
import VideoSection from './components/VideoSection';

import Registration from './components/Registration';
import Resources from './components/Resources';
import FAQ from './components/FAQ';
import Testimonial from './components/Testimonial';
import Counselor from './components/Counselor';
import Footer from './components/Footer';
import PrestigeTicker from './components/PrestigeTicker';

import FloatingWhatsApp from './components/FloatingWhatsApp';
import ScrollToTop from './components/ScrollToTop';
import SocialProof from './components/SocialProof';
import ExitIntent from './components/ExitIntent';

function App() {
  const [registrationsList, setRegistrationsList] = useState([]);

  useEffect(() => {
    const observerOptions = { threshold: 0.08, rootMargin: '0px 0px -60px 0px' };
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-child');
    elements.forEach(el => revealObserver.observe(el));
    return () => elements.forEach(el => revealObserver.unobserve(el));
  }, []);

  const handleRegister = (newRegistration) => {
    setRegistrationsList((prev) => [...prev, newRegistration]);
  };

  return (
    <>
      <SplashScreen />
      <Navbar registrationsList={registrationsList} />
      <main id="main-content">
        <Hero />
        <PrestigeTicker />
        <About />
        <Process />
        <VideoSection />
        <Counselor />
        <Testimonial />

        <Registration onRegister={handleRegister} />
        <Resources />
        <FAQ />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />
      <SocialProof />
      <ExitIntent />
    </>
  );
}

export default App;
