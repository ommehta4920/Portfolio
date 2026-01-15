import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaDownload } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Navbar background on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
    return () => (document.body.style.overflow = 'auto');
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', to: 'hero' },
    { name: 'About', to: 'about' },
    { name: 'Skills', to: 'skills' },
    { name: 'Projects', to: 'projects' },
    { name: 'Experience', to: 'experience' },
    { name: 'Contact', to: 'contact' },
  ];

  const handleNavClick = (to) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(to)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const resumeUrl = '/resume.pdf';

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">

        {/* LOGO */}
        <ScrollLink
          to="hero"
          smooth
          duration={500}
          className="navbar-logo"
          onClick={() => {
            setIsMobileMenuOpen(false);
            if (location.pathname !== '/') navigate('/');
          }}
        >
          <span className="logo-text">OM</span>
          <span className="logo-dot">.</span>
        </ScrollLink>

        {/* NAV LINKS */}
        <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          {navLinks.map((link, index) => (
            <li key={index}>
              {location.pathname === '/' ? (
                <ScrollLink
                  to={link.to}
                  smooth
                  duration={500}
                  offset={-70}
                  spy
                  activeClass="active"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </ScrollLink>
              ) : (
                <span
                  className="nav-link-span"
                  onClick={() => handleNavClick(link.to)}
                >
                  {link.name}
                </span>
              )}
            </li>
          ))}

          {/* MOBILE RESUME */}
          <li className="mobile-resume-link">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaDownload />
              <span>Resume</span>
            </a>
          </li>
        </ul>

        {/* DESKTOP RESUME */}
        <a
          href={resumeUrl}
          className="resume-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaDownload className="resume-icon" />
          <span>Resume</span>
        </a>

        {/* MOBILE MENU BUTTON */}
        <div
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
