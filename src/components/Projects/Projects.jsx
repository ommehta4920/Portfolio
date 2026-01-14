import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGithub, FaArrowRight, FaDatabase, FaRobot } from 'react-icons/fa';
import { TbAutomation } from 'react-icons/tb';
import './Projects.css';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const featuredProjects = [
    {
      id: 1,
      title: 'EcomVision',
      subtitle: 'E-commerce Analytics Platform',
      description: 'Built a Django-based system integrating Scrapy & Selenium for large-scale scraping of e-commerce data. Automated data refresh & notifications using Celery.',
      icon: <FaDatabase />,
      technologies: ['Django', 'Scrapy', 'Selenium', 'Celery', 'PostgreSQL'],
      github: 'https://github.com/ommehta4920',
      live: '#',
      color: '#06b6d4',
      gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
    },
    {
      id: 2,
      title: 'n8n Order Automation',
      subtitle: 'Workflow Automation System',
      description: 'Created an automated end-to-end order processing pipeline integrating email, Google Sheets, payment gateway, and internal dashboards with AI-based anomaly detection.',
      icon: <TbAutomation />,
      technologies: ['n8n', 'Python', 'Google APIs', 'PostgreSQL', 'AI/ML'],
      github: 'https://github.com/ommehta4920',
      live: '#',
      color: '#14b8a6',
      gradient: 'linear-gradient(135deg, #14b8a6, #0d9488)',
    },
    {
      id: 3,
      title: 'GHL CRM Integration',
      subtitle: 'Cross-Platform Automation',
      description: 'Developed automated backend workflows, APIs, and cross-platform integrations across GoHighLevel, custom CRM, WordPress, and Google/Meta APIs.',
      icon: <FaRobot />,
      technologies: ['Python', 'GoHighLevel', 'REST APIs', 'n8n', 'Brevo'],
      github: 'https://github.com/ommehta4920',
      live: '#',
      color: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    },
  ];

  return (
    <section className="projects" id="projects" ref={sectionRef}>
      <div className="projects-container">
        <div className={`section-header ${isVisible ? 'animate' : ''}`}>
          <span className="section-tag">My Work</span>
          <h2 className="section-title">
            Featured
            <span className="gradient-text"> Projects</span>
          </h2>
          <p className="section-description">
            A selection of my recent work in Python development, automation, and data analytics
          </p>
        </div>

        {/* Featured Projects Grid */}
        <div className={`projects-grid ${isVisible ? 'animate' : ''}`}>
          {featuredProjects.map((project, index) => (
            <div 
              className={`project-card ${hoveredProject === index ? 'hovered' : ''}`}
              key={project.id}
              style={{ 
                animationDelay: `${index * 0.15}s`,
                '--project-color': project.color,
                '--project-gradient': project.gradient,
              }}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Card Background Effect */}
              <div className="card-bg-effect"></div>
              
              {/* Card Content */}
              <div className="card-content">
                {/* Icon */}
                <div className="project-icon-wrapper">
                  <div className="project-icon">
                    {project.icon}
                  </div>
                </div>

                {/* Info */}
                <div className="project-info">
                  <span className="project-subtitle">{project.subtitle}</span>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                </div>

                {/* Technologies */}
                <div className="project-tech">
                  {project.technologies.map((tech, techIndex) => (
                    <span className="tech-pill" key={techIndex}>{tech}</span>
                  ))}
                </div>

                {/* Links */}
                <div className="project-links">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <FaGithub />
                    <span>Code</span>
                  </a>
                </div>
              </div>

              {/* Hover Border Effect */}
              <div className="card-border"></div>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className={`view-all-section ${isVisible ? 'animate' : ''}`}>
          <div className="view-all-content">
            <div className="view-all-text">
              <h4>Want to see more?</h4>
              <p>Explore all my projects including automation scripts, data analytics dashboards, and API integrations.</p>
            </div>
            <button className="view-all-btn" onClick={() => navigate('/projects')}>
              View All Projects
              <FaArrowRight />
            </button>
          </div>
          <div className="project-count">
            <span className="count-number">20+</span>
            <span className="count-label">Total Projects</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;