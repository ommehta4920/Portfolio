import React from 'react';
import { Link } from 'react-scroll';
import { FaGithub, FaLinkedin, FaInstagram, FaHeart, FaArrowUp, FaPython, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: 'Home', to: 'hero' },
    { name: 'About', to: 'about' },
    { name: 'Skills', to: 'skills' },
    { name: 'Projects', to: 'projects' },
    { name: 'Experience', to: 'experience' },
    { name: 'Contact', to: 'contact' },
  ];

  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/ommehta4920', label: 'GitHub' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com/in/om-mehta-b763172a2/', label: 'LinkedIn' },
    { icon: <FaInstagram />, url: 'https://www.instagram.com/om_mehta7323', label: 'Instagram' },
    { icon: <FaEnvelope />, url: 'mailto:ommehta4920@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="hero" smooth={true} duration={500} className="footer-logo">
              <span className="logo-text">OM</span>
              <span className="logo-dot">.</span>
            </Link>
            <p>
              Python Developer & Data Analyst passionate about building 
              scalable backend systems and automation solutions.
            </p>
            <div className="footer-tech">
              <FaPython className="tech-icon" />
              <span>Python Developer</span>
            </div>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.to} smooth={true} duration={500} offset={-70}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-social">
            <h4>Connect</h4>
            <div className="social-icons">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target={social.label === 'Email' ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`social-icon-link ${social.label.toLowerCase()}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <div className="footer-contact-info">
              <a href="mailto:ommehta4920@gmail.com" className="footer-email">
                <FaEnvelope />
                <span>ommehta4920@gmail.com</span>
              </a>
              <a href="https://www.instagram.com/om_mehta7323" target="_blank" rel="noopener noreferrer" className="footer-instagram">
                <FaInstagram />
                <span>@om_mehta7323</span>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p>
            © {currentYear} Om Mehta. Made with <FaHeart className="heart-icon" /> using React
          </p>
          <Link to="hero" smooth={true} duration={500} className="back-to-top">
            <FaArrowUp />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;