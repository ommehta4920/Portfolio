import React, { useEffect, useRef } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin, FaInstagram, FaArrowDown, FaPython, FaCode, FaChartPie, FaTable } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import { Link } from 'react-scroll';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      
      if (heroRef.current) {
        heroRef.current.style.setProperty('--mouse-x', `${x}px`);
        heroRef.current.style.setProperty('--mouse-y', `${y}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/ommehta4920', label: 'GitHub' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com/in/om-mehta-b763172a2/', label: 'LinkedIn' },
    { icon: <FaInstagram />, url: 'https://www.instagram.com/om_mehta7323', label: 'Instagram' },
    { icon: <HiMail />, url: 'mailto:ommehta4920@gmail.com', label: 'Email' },
  ];

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className="hero-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-name animate-fade-in-delay-1">
            Hi, I'm <span className="gradient-text"> Om Mehta</span>
          </h1>

          <div className="hero-title animate-fade-in-delay-2">
            <span>I'm a </span>
            <TypeAnimation
              sequence={[
                'Python Developer',
                2000,
                'Backend Engineer',
                2000,
                'Data Analyst',
                2000,
                'Automation Specialist',
                2000,
                'API Developer',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="typing-text"
            />
          </div>

          <p className="hero-description animate-fade-in-delay-3">
            Python Developer specializing in backend systems, automation, and workflow integrations. 
            Experienced in building scalable APIs, automating business processes, and developing 
            data-driven dashboards with a focus on performance and reliability.
          </p>

          <div className="hero-cta animate-fade-in-delay-4">
            <Link to="projects" smooth={true} duration={500} offset={-70} className="cta-primary">
              View My Projects
              <span className="btn-glow"></span>
            </Link>
            <Link to="contact" smooth={true} duration={500} offset={-70} className="cta-secondary">
              Get In Touch
            </Link>
          </div>

          <div className="hero-social animate-fade-in-delay-5">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="hero-visual animate-fade-in-delay-2">
          <div className="hero-image-container">
            <div className="hero-image-wrapper">
              <div className="hero-image-placeholder">
                <span>OM</span>
              </div>
              <div className="hero-image-ring"></div>
              <div className="hero-image-ring ring-2"></div>
            </div>
            <div className="floating-elements">
              <div className="floating-element el-1"><FaPython /></div>
              <div className="floating-element el-2"><FaChartPie /></div>
              <div className="floating-element el-3"><FaCode /></div>
              <div className="floating-element el-4"><FaTable /></div>
            </div>
          </div>
        </div>
      </div>

      <Link to="about" smooth={true} duration={500} offset={-70} className="scroll-indicator">
        <span>Scroll Down</span>
        <FaArrowDown className="scroll-arrow" />
      </Link>
    </section>
  );
};

export default Hero;