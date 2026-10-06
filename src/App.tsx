/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId, ServiceItem, BlogPost } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FreeAssessmentModal } from './components/FreeAssessmentModal';
import { BookSessionModal } from './components/BookSessionModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { SearchModal } from './components/SearchModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { HomeCarePage } from './pages/HomeCarePage';
import { OdpWaiverPage } from './pages/OdpWaiverPage';
import { BlogPage } from './pages/BlogPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { AdminPage } from './pages/AdminPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { GetStartedPage } from './pages/GetStartedPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { CareersPage } from './pages/CareersPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsConditionsPage } from './pages/TermsConditionsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { trackEvent } from './utils/analytics';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingServiceTitle, setBookingServiceTitle] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [preselectedServiceTitle, setPreselectedServiceTitle] = useState<string>('');

  // Synchronize document title and canonical tag for SEO on route change
  useEffect(() => {
    switch (currentPage) {
      case 'home':
        document.title = 'Kenah Wellness Services | Home Care & Pennsylvania ODP Waiver Services';
        break;
      case 'about':
        document.title = 'About Us | Kenah Wellness Services | Mission & ODP Waiver Standards';
        break;
      case 'home-care':
        document.title = 'Home Care Services | Personal Care, Senior Care, Dementia Support in PA';
        break;
      case 'odp-waiver':
        document.title = 'ODP Waiver Services | In-Home & Out-of-Home Respite, HAB, CPS in Pennsylvania';
        break;
      case 'blog':
        document.title = 'Care Blog & Family Resources | Kenah Wellness Services PA';
        break;
      case 'blog-detail':
        document.title = selectedBlogPost
          ? `${selectedBlogPost.title} | Kenah Wellness Care Blog`
          : 'Care Blog Article | Kenah Wellness Services';
        break;
      case 'admin':
        document.title = 'Administrative Management Portal | Kenah Wellness Services';
        break;
      case 'service-detail':
        document.title = selectedService
          ? `${selectedService.title} | Kenah Wellness Services PA`
          : 'Service Guide | Kenah Wellness Services';
        break;
      case 'get-started':
      case 'free-assessment':
        document.title = 'Free Assessment & Care Intake | Kenah Wellness Services PA';
        break;
      case 'contact':
        document.title = 'Contact Kenah Wellness | Canonsburg PA & Pittsburgh Service Area';
        break;
      case 'faq':
        document.title = 'FAQs | Pennsylvania ODP Waiver & Home Care Questions Answered';
        break;
      case 'careers':
        document.title = 'Careers & Caregiver Jobs | Kenah Wellness Services PA';
        break;
      case 'testimonials':
        document.title = 'Family Stories & Client Reviews | Kenah Wellness Services';
        break;
      case 'privacy':
        document.title = 'Privacy Policy & Confidentiality Practices | Kenah Wellness Services PA';
        break;
      case 'terms':
        document.title = 'Terms of Use & Service Agreement | Kenah Wellness Services PA';
        break;
      case 'not-found':
        document.title = 'Page Not Found (404) | Kenah Wellness Services PA';
        break;
      default:
        document.title = 'Kenah Wellness Services | Caring Beyond the Call';
    }

    // Dynamic canonical URL update
    const canonicalLink = document.querySelector("link[rel='canonical']");
    const canonicalPath = currentPage === 'home' ? '' : currentPage;
    if (canonicalLink) {
      canonicalLink.setAttribute('href', `https://kenahwellness.com/${canonicalPath}`);
    }

    // Privacy-respecting page view analytics
    trackEvent('page_view', { page: currentPage });
  }, [currentPage, selectedService, selectedBlogPost]);

  const [isCookieModalOpen, setIsCookieModalOpen] = useState(false);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAssessment = (serviceTitle?: string) => {
    if (serviceTitle) {
      setPreselectedServiceTitle(serviceTitle);
    }
    setCurrentPage('free-assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectService = (service: ServiceItem) => {
    setSelectedService(service);
    setCurrentPage('service-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectBlog = (post: BlogPost) => {
    setSelectedBlogPost(post);
    setCurrentPage('blog-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (serviceTitle?: string) => {
    setBookingServiceTitle(serviceTitle || '');
    setIsBookingOpen(true);
  };

  const handleGetStartedWithService = (serviceTitle: string) => {
    setPreselectedServiceTitle(serviceTitle);
    setCurrentPage('free-assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-[#F2D701] selection:text-slate-950">
      {/* Top Sticky Navigation with Official Header Image & Free Assessment CTA */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenAssessment={() => handleOpenAssessment()}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenAssessment={() => handleOpenAssessment()}
            onOpenBooking={handleOpenBooking}
            onSelectService={handleSelectService}
            onSelectBlog={handleSelectBlog}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenAssessment={() => handleOpenAssessment()}
          />
        )}

        {currentPage === 'home-care' && (
          <HomeCarePage
            onNavigate={handleNavigate}
            onOpenAssessment={() => handleOpenAssessment()}
            onOpenBooking={handleOpenBooking}
            onSelectService={handleSelectService}
          />
        )}

        {currentPage === 'odp-waiver' && (
          <OdpWaiverPage
            onNavigate={handleNavigate}
            onOpenAssessment={() => handleOpenAssessment()}
            onOpenBooking={handleOpenBooking}
            onSelectService={handleSelectService}
          />
        )}

        {currentPage === 'blog' && (
          <BlogPage
            onNavigate={handleNavigate}
            onOpenAssessment={() => handleOpenAssessment()}
            onSelectBlog={handleSelectBlog}
          />
        )}

        {currentPage === 'blog-detail' && (
          <BlogDetailPage
            post={selectedBlogPost}
            onNavigate={handleNavigate}
            onSelectBlog={handleSelectBlog}
            onOpenAssessment={() => handleOpenAssessment()}
          />
        )}

        {currentPage === 'admin' && (
          <AdminPage
            onNavigate={handleNavigate}
            onSelectBlog={handleSelectBlog}
            onSelectService={handleSelectService}
          />
        )}

        {currentPage === 'service-detail' && (
          <ServiceDetailPage
            service={selectedService}
            onNavigate={handleNavigate}
            onSelectService={handleSelectService}
            onOpenAssessment={() => handleOpenAssessment()}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {(currentPage === 'get-started' || currentPage === 'free-assessment') && (
          <GetStartedPage
            onNavigate={handleNavigate}
            preselectedService={bookingServiceTitle || preselectedServiceTitle}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            onNavigate={handleNavigate}
            onOpenAssessment={() => handleOpenAssessment()}
          />
        )}

        {currentPage === 'faq' && (
          <FaqPage
            onNavigate={handleNavigate}
            onOpenAssessment={() => handleOpenAssessment()}
          />
        )}

        {currentPage === 'testimonials' && (
          <TestimonialsPage
            onNavigate={handleNavigate}
            onOpenAssessment={() => handleOpenAssessment()}
          />
        )}

        {currentPage === 'careers' && (
          <CareersPage
            onNavigate={handleNavigate}
            onOpenAssessment={() => handleOpenAssessment()}
          />
        )}

        {currentPage === 'privacy' && (
          <PrivacyPolicyPage
            onNavigate={handleNavigate}
            onOpenAssessment={() => handleOpenAssessment()}
          />
        )}

        {currentPage === 'terms' && (
          <TermsConditionsPage
            onNavigate={handleNavigate}
            onOpenAssessment={() => handleOpenAssessment()}
          />
        )}

        {currentPage === 'not-found' && (
          <NotFoundPage
            onNavigate={handleNavigate}
            onOpenAssessment={() => handleOpenAssessment()}
          />
        )}
      </main>

      {/* Global Brand Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAssessment={() => handleOpenAssessment()}
        onOpenBooking={() => handleOpenBooking()}
        onOpenCookieSettings={() => setIsCookieModalOpen(true)}
      />

      {/* Interactive Modals */}
      <BookSessionModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        defaultService={bookingServiceTitle}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectService={(s) => handleSelectService(s)}
        onNavigate={handleNavigate}
      />

      {/* Cookie Consent Banner & Preferences Modal */}
      <CookieConsentBanner
        onNavigate={handleNavigate}
        forceOpenModal={isCookieModalOpen}
        onCloseModal={() => setIsCookieModalOpen(false)}
      />
    </div>
  );
}
