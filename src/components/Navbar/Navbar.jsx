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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', to: 'hero' },
    { name: 'About', to: 'about' },
    { name: 'Skills', to: 'skills' },
    { name: 'Projects', to: 'projects' },
    { name: 'Experience', to: 'experience' },
    { name: 'Contact', to: 'contact' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (to) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(to);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    setIsMobileMenuOpen(false);
  };

  // Resume URL - Change this to your actual resume link
  const resumeUrl = '/resume.pdf'; // Local file in public folder
  // OR use Google Drive:
  // const resumeUrl = 'https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing';

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <ScrollLink 
          to="hero" 
          smooth={true} 
          duration={500} 
          className="navbar-logo"
          onClick={() => location.pathname !== '/' && navigate('/')}
        >
          <span className="logo-text">OM</span>
          <span className="logo-dot">.</span>
        </ScrollLink>

        <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          {navLinks.map((link, index) => (
            <li key={index} style={{ animationDelay: `${index * 0.1}s` }}>
              {location.pathname === '/' ? (
                <ScrollLink
                  to={link.to}
                  smooth={true}
                  duration={500}
                  offset={-70}
                  spy={true}
                  activeClass="active"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </ScrollLink>
              ) : (
                <span 
                  onClick={() => handleNavClick(link.to)}
                  className="nav-link-span"
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
              onClick={() => setIsMobileMenuOpen(false)}
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

        <div className="mobile-menu-btn" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;