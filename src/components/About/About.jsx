import React, { useEffect, useRef, useState } from 'react';
import { FaPython, FaServer, FaDatabase, FaChartBar } from 'react-icons/fa';
import './About.css';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  const services = [
    {
      icon: <FaPython />,
      title: 'Python Development',
      description: 'Building robust backend systems and automation scripts using Python, Django, and Flask frameworks.',
    },
    {
      icon: <FaServer />,
      title: 'API Development',
      description: 'Creating scalable REST APIs, integrating third-party services, and building microservices architecture.',
    },
    {
      icon: <FaDatabase />,
      title: 'Data Engineering',
      description: 'Designing data pipelines, web scraping solutions, and database optimization with PostgreSQL & MongoDB.',
    },
    {
      icon: <FaChartBar />,
      title: 'Data Analytics',
      description: 'Developing data-driven dashboards, visual insights, and analytical reports using Pandas & Seaborn.',
    },
  ];

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="about-container">
        <div className={`section-header ${isVisible ? 'animate' : ''}`}>
          <span className="section-tag">About Me</span>
          <h2 className="section-title">
            Python Developer <span className="gradient-text">& Data Analyst</span>
          </h2>
        </div>

        <div className="about-content">
          <div className={`about-text ${isVisible ? 'animate' : ''}`}>
            <p>
              Hi! I'm Om Kartikkumar Mehta, a Python Developer based in Ahmedabad, Gujarat, 
              specializing in backend systems, automation, and workflow integrations. I have 
              hands-on experience building scalable APIs and automating business processes 
              using tools like n8n, GoHighLevel, and custom CRM solutions.
            </p>
            <p>
              I hold an MCA from L.D. College of Engineering and have worked on projects 
              ranging from large-scale web scraping systems to end-to-end order processing 
              automation. My expertise includes Django, Flask, data pipelines, and cloud 
              deployment with a strong focus on performance and reliability.
            </p>
            <p>
              I'm passionate about solving complex problems through code and data. Whether 
              it's building EcomVision for e-commerce analytics or automating WhatsApp & 
              Email campaigns, I strive to deliver solutions that make a real business impact.
            </p>

            <div className="about-stats">
              <div className="stat-item">
                <span className="stat-number">1</span>
                <span className="stat-label">Year Experience</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">20+</span>
                <span className="stat-label">Projects Completed</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">60%</span>
                <span className="stat-label">Workflow Optimization</span>
              </div>
            </div>
          </div>

          <div className={`about-services ${isVisible ? 'animate' : ''}`}>
            <h3>What I Do</h3>
            <div className="services-grid">
              {services.map((service, index) => (
                <div 
                  className="service-card" 
                  key={index}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="service-icon">{service.icon}</div>
                  <h4>{service.title}</h4>
                  <p>{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;