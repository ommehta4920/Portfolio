import React, { useState, useEffect, useCallback } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaDownload } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle body scroll lock - FIXED
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Store current scroll position
      const scrollY = window.scrollY;
      document.body.classList.add('menu-open');
      document.body.style.top = `-${scrollY}px`;
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.classList.remove('menu-open');
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      document.body.classList.remove('menu-open');
      document.body.style.top = '';
    };
  }, [isMobileMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  // Close menu on window resize (if switching to desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', to: 'hero' },
    { name: 'About', to: 'about' },
    { name: 'Skills', to: 'skills' },
    { name: 'Projects', to: 'projects' },
    { name: 'Experience', to: 'experience' },
    { name: 'Contact', to: 'contact' },
  ];

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const handleNavClick = useCallback((to) => {
    closeMobileMenu();
    
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation then scroll
      setTimeout(() => {
        const element = document.getElementById(to);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    }
  }, [location.pathname, navigate, closeMobileMenu]);

  const handleLogoClick = useCallback(() => {
    closeMobileMenu();
    if (location.pathname !== '/') {
      navigate('/');
    }
  }, [location.pathname, navigate, closeMobileMenu]);

  // Resume URL
  const resumeUrl = '/resume.pdf';

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Logo */}
          <ScrollLink 
            to="hero" 
            smooth={true} 
            duration={500} 
            className="navbar-logo"
            onClick={handleLogoClick}
          >
            <span className="logo-text">OM</span>
            <span className="logo-dot">.</span>
          </ScrollLink>

          {/* Nav Links */}
          <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
            {navLinks.map((link, index) => (
              <li key={index}>
                {location.pathname === '/' ? (
                  <ScrollLink
                    to={link.to}
                    smooth={true}
                    duration={500}
                    offset={-70}
                    spy={true}
                    activeClass="active"
                    onClick={closeMobileMenu}
                  >
                    {link.name}
                  </ScrollLink>
                ) : (
                  <span 
                    onClick={() => handleNavClick(link.to)}
                    className="nav-link-span"
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => e.key === 'Enter' && handleNavClick(link.to)}
                  >
                    {link.name}
                  </span>
                )}
              </li>
            ))}
            
            {/* Mobile Resume Button */}
            <li className="mobile-resume-link">
              <a 
                href={resumeUrl}
                target="_blank" 
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
              >
                <FaDownload />
                <span>Resume</span>
              </a>
            </li>
          </ul>

          {/* Desktop Resume Button */}
          <a 
            href={resumeUrl}
            className="resume-btn" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <FaDownload className="resume-icon" />
            <span>Resume</span>
          </a>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn" 
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile Overlay - Click to close */}
      <div 
        className={`mobile-overlay ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />
    </>
  );
};

export default Navbar;