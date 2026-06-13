import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Process from './components/Process';
import VideoSection from './components/VideoSection';
import AiCoach from './components/AiCoach';
import Registration from './components/Registration';
import Resources from './components/Resources';
import FAQ from './components/FAQ';
import Testimonial from './components/Testimonial';
import Counselor from './components/Counselor';
import Footer from './components/Footer';
import PrestigeTicker from './components/PrestigeTicker';
import CompassHighlight from './components/CompassHighlight';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import ScrollToTop from './components/ScrollToTop';
import SocialProof from './components/SocialProof';
import ExitIntent from './components/ExitIntent';

import AdminApp from './admin/AdminApp';
import StudentApp from './student/StudentApp';

// Public website component (unchanged)
function PublicSite() {
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
        <CompassHighlight />
        <PrestigeTicker />
        <About />
        <Process />
        <VideoSection />
        <AiCoach onRegister={handleRegister} />
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin panel — all /admin/* routes */}
        <Route path="/admin/*" element={<AdminApp />} />
        {/* Student portal — all /student/* routes */}
        <Route path="/student/*" element={<StudentApp />} />
        {/* Public website — root route */}
        <Route path="/*" element={<PublicSite />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
