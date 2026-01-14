import React, { useEffect, useRef, useState } from 'react';
import { FaBriefcase, FaGraduationCap, FaCalendarAlt, FaCertificate } from 'react-icons/fa';
import './Experience.css';

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('work');
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

  const workExperience = [
    {
      title: 'Full Stack Developer & Automation Engineer',
      company: 'Amratpal A Vision',
      location: 'Ahmedabad, Gujarat',
      period: 'Oct 2024 – Present',
      description: [
        'Developed and automated backend workflows, APIs, and cross-platform integrations across GHL, custom CRM, WordPress, n8n (Railway), Gallabox, and Google/Meta APIs',
        'Streamlined lead generation and communication pipelines by automating WhatsApp & Email campaigns using Brevo, APITemplates.io, and GHL automations',
        'Reduced manual operational effort by 60% through streamlined lead workflows',
        'Managed and updated company website, dashboards, and API-driven forms; collaborated closely with marketing, sales & operations teams for workflow optimization',
      ],
    },
    {
      title: 'Python Software Developer Intern',
      company: 'BISAG-N (Bhaskaracharya Institute for Space Applications)',
      location: 'Gandhinagar, Gujarat',
      period: 'Feb 2025 – May 2025',
      description: [
        'Built the EcomVision system focused on large-scale web scraping, product comparison, and data analysis using Django, Scrapy, Selenium, and Celery',
        'Automated scraping workflows to improve data collection speed and reliability',
        'Developed visual insights using PostgreSQL and analytical charts',
        'Implemented data pipelines for efficient processing of e-commerce data',
      ],
    },
  ];

  const education = [
    {
      title: 'Master of Computer Application (MCA)',
      company: 'L.D. College of Engineering',
      location: 'Ahmedabad, Gujarat (GTU)',
      period: 'Aug 2023 – June 2025',
      description: [
        'CPI: 8.78',
        'Specialization in Software Development & Data Analytics',
        'Coursework: Advanced Python, Database Management, Machine Learning, Web Technologies',
        'Active participant in coding competitions and hackathons',
      ],
    },
    {
      title: 'Bachelor of Computer Application (BCA)',
      company: 'Narmada College of Science & Commerce',
      location: 'Bharuch, Gujarat (VNSGU)',
      period: 'Aug 2020 – May 2023',
      description: [
        'CGPA: 8.63',
        'Strong foundation in programming fundamentals',
        'Coursework: Data Structures, Algorithms, Database Systems, Web Development',
        'Developed multiple academic projects using Python and Java',
      ],
    },
  ];

  const certifications = [
    {
      title: 'IBM SkillsBuild & CSRBOX Micro-Internship on Data Analytics',
      company: 'IBM SkillsBuild',
      location: 'Online',
      period: 'Nov 2023',
      description: [
        'Completed comprehensive data analytics program',
        'Hands-on experience with data visualization tools',
        'Applied analytical techniques on real-world datasets',
        'Received certification for successful completion',
      ],
    },
    {
      title: 'Applied Cloud Computing for Software Development',
      company: 'Microsoft & EduNet Foundation',
      location: 'Online',
      period: 'Jul 2024',
      description: [
        'Cloud computing fundamentals and architecture',
        'Azure services for software development',
        'Deployment strategies and best practices',
        'Hands-on projects with cloud technologies',
      ],
    },
  ];

  const getActiveData = () => {
    switch (activeTab) {
      case 'work':
        return workExperience;
      case 'education':
        return education;
      case 'certifications':
        return certifications;
      default:
        return workExperience;
    }
  };

  return (
    <section className="experience" id="experience" ref={sectionRef}>
      <div className="experience-container">
        <div className={`section-header ${isVisible ? 'animate' : ''}`}>
          <span className="section-tag">Journey</span>
          <h2 className="section-title">
            Experience
            <span className="gradient-text"> & Education</span>
          </h2>
        </div>

        <div className={`experience-tabs ${isVisible ? 'animate' : ''}`}>
          <button 
            className={`tab-btn ${activeTab === 'work' ? 'active' : ''}`}
            onClick={() => setActiveTab('work')}
          >
            <FaBriefcase />
            Work
          </button>
          <button 
            className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`}
            onClick={() => setActiveTab('education')}
          >
            <FaGraduationCap />
            Education
          </button>
          <button 
            className={`tab-btn ${activeTab === 'certifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('certifications')}
          >
            <FaCertificate />
            Certifications
          </button>
        </div>

        <div className={`experience-timeline ${isVisible ? 'animate' : ''}`}>
          <div className="timeline-line"></div>
          {getActiveData().map((item, index) => (
            <div 
              className="timeline-item"
              key={index}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <div>
                    <h3 className="timeline-title">{item.title}</h3>
                    <p className="timeline-company">{item.company}</p>
                    <p className="timeline-location">{item.location}</p>
                  </div>
                  <div className="timeline-period">
                    <FaCalendarAlt />
                    <span>{item.period}</span>
                  </div>
                </div>
                <ul className="timeline-description">
                  {item.description.map((desc, descIndex) => (
                    <li key={descIndex}>{desc}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;