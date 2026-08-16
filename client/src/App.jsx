import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LeadIntakeModal from './components/LeadIntakeModal';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import EstimatorPage from './pages/EstimatorPage';
import ChatWidget from './components/ChatWidget';
import BookingModal from './components/BookingModal';

// Scroll to top on route navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent = () => {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen bg-[#080a0f] text-slate-100 font-sans">
      <ScrollToTop />

      {/* Hide public navbar on admin pages */}
      {!isAdminRoute && <Navbar onOpenLeadModal={() => setIsLeadModalOpen(true)} onOpenBooking={() => setIsBookingModalOpen(true)} />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage onOpenLeadModal={() => setIsLeadModalOpen(true)} onOpenBooking={() => setIsBookingModalOpen(true)} />} />
          <Route path="/services" element={<ServicesPage onOpenLeadModal={() => setIsLeadModalOpen(true)} onOpenBooking={() => setIsBookingModalOpen(true)} />} />
          <Route path="/projects" element={<ProjectsPage onOpenLeadModal={() => setIsLeadModalOpen(true)} onOpenBooking={() => setIsBookingModalOpen(true)} />} />
          <Route path="/about" element={<AboutPage onOpenLeadModal={() => setIsLeadModalOpen(true)} onOpenBooking={() => setIsBookingModalOpen(true)} />} />
          <Route path="/contact" element={<ContactPage onOpenBooking={() => setIsBookingModalOpen(true)} />} />
          <Route path="/estimator" element={<EstimatorPage onOpenLeadModal={() => setIsLeadModalOpen(true)} onOpenBooking={() => setIsBookingModalOpen(true)} />} />
          
          {/* Admin CRM Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        </Routes>
      </main>

      {/* Hide public footer on admin pages */}
      {!isAdminRoute && <Footer onOpenLeadModal={() => setIsLeadModalOpen(true)} onOpenBooking={() => setIsBookingModalOpen(true)} />}

      {/* Global Lead Intake Modal */}
      <LeadIntakeModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
      />

      {/* Global Floating AI Chat Widget (hidden on admin pages) */}
      {!isAdminRoute && (
        <ChatWidget onOpenLeadModal={() => setIsLeadModalOpen(true)} onOpenBooking={() => setIsBookingModalOpen(true)} />
      )}

      {/* Global Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
