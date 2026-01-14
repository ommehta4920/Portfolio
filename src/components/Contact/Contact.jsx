import React, { useEffect, useRef, useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaPaperPlane } from 'react-icons/fa';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: 'Email',
      value: 'ommehta4920@gmail.com',
      link: 'mailto:ommehta4920@gmail.com',
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Location',
      value: 'Ahmedabad, Gujarat, India',
      link: null,
    },
    {
      icon: <FaPhone />,
      title: 'Phone',
      value: '+91 9427546597',
      link: 'tel:+919427546597',
    },
  ];

  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/ommehta4920', label: 'GitHub' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com/in/om-mehta-b763172a2/', label: 'LinkedIn' },
    { icon: <FaInstagram />, url: 'https://www.instagram.com/om_mehta7323', label: 'Instagram' },
  ];

  return (
    <section className="contact" id="contact" ref={sectionRef}>
      <div className="contact-container">
        <div className={`section-header ${isVisible ? 'animate' : ''}`}>
          <span className="section-tag">Get In Touch</span>
          <h2 className="section-title">
            Let's Work<br />
            <span className="gradient-text">Together</span>
          </h2>
        </div>

        <div className="contact-content">
          <div className={`contact-info ${isVisible ? 'animate' : ''}`}>
            <h3>Contact Information</h3>
            <p>
              Feel free to reach out to me for project collaboration, 
              Python development opportunities, data analytics projects, 
              or automation solutions. I'm always excited to discuss new challenges!
            </p>

            <div className="info-list">
              {contactInfo.map((info, index) => (
                <div className="info-item" key={index}>
                  <div className="info-icon">{info.icon}</div>
                  <div className="info-content">
                    <span className="info-title">{info.title}</span>
                    {info.link ? (
                      <a href={info.link} className="info-value">{info.value}</a>
                    ) : (
                      <span className="info-value">{info.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="social-links">
              <h4>Connect With Me</h4>
              <div className="social-icons">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="availability-badge">
              <span className="pulse"></span>
              Available for freelance & full-time opportunities
            </div>
          </div>

          <div className={`contact-form-wrapper ${isVisible ? 'animate' : ''}`}>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Collaboration / Job Opportunity"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or opportunity..."
                  rows="5"
                  required
                ></textarea>
              </div>
              <button 
                type="submit" 
                className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="loading-spinner"></span>
                ) : (
                  <>
                    Send Message
                    <FaPaperPlane />
                  </>
                )}
              </button>
              {submitStatus === 'success' && (
                <div className="success-message">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;