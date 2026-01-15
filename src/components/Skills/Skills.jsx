import React, { useEffect, useRef, useState } from 'react';
import { 
  FaPython, FaJava, FaReact, FaGitAlt, FaDatabase
} from 'react-icons/fa';
import { 
  SiDjango, SiFlask, SiPostgresql, SiMongodb, 
  SiPandas, SiNumpy, SiSelenium, SiCelery,
  SiPostman, SiJira, SiMysql, SiGooglechrome
} from 'react-icons/si';
import { TbApi, TbAutomation } from 'react-icons/tb';
import { BsGraphUp, BsGearFill } from 'react-icons/bs';
import { MdOutlineAutoGraph } from 'react-icons/md';
import './Skills.css';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const sectionRef = useRef(null);

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

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'languages', name: 'Languages' },
    { id: 'frameworks', name: 'Frameworks' },
    { id: 'data', name: 'Data & Analytics' },
    { id: 'databases', name: 'Databases' },
    { id: 'scraping', name: 'Web Scraping' },
    { id: 'tools', name: 'Tools' },
  ];

  const allSkills = [
    // Languages
    { name: 'Python', icon: <FaPython />, color: '#3776AB', category: 'languages' },
    { name: 'Java', icon: <FaJava />, color: '#ED8B00', category: 'languages' },
    { name: 'SQL', icon: <FaDatabase />, color: '#336791', category: 'languages' },
    
    // Frameworks - FIXED COLORS
    { name: 'Django', icon: <SiDjango />, color: '#44B78B', category: 'frameworks' }, // Changed from #092E20
    { name: 'Flask', icon: <SiFlask />, color: '#ffffff', category: 'frameworks' },
    { name: 'React.js', icon: <FaReact />, color: '#61DAFB', category: 'frameworks' },
    { name: 'Celery', icon: <SiCelery />, color: '#9DCE5A', category: 'frameworks' }, // Brighter green
    { name: 'REST APIs', icon: <TbApi />, color: '#06b6d4', category: 'frameworks' },
    
    // Data & Analytics - FIXED COLORS
    { name: 'Pandas', icon: <SiPandas />, color: '#E70488', category: 'data' }, // Changed from #150458 to pink (official alternate)
    { name: 'NumPy', icon: <SiNumpy />, color: '#4DABCF', category: 'data' }, // Changed from #013243 to light blue (official alternate)
    { name: 'Seaborn', icon: <BsGraphUp />, color: '#76B7B2', category: 'data' }, // Softer teal
    { name: 'Data Pipelines', icon: <MdOutlineAutoGraph />, color: '#06b6d4', category: 'data' },
    { name: 'Data Analysis', icon: <BsGraphUp />, color: '#14b8a6', category: 'data' },
    
    // Databases
    { name: 'PostgreSQL', icon: <SiPostgresql />, color: '#699ECA', category: 'databases' }, // Lighter blue
    { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248', category: 'databases' },
    { name: 'MySQL', icon: <SiMysql />, color: '#00758F', category: 'databases' },
    
    // Web Scraping
    { name: 'Scrapy', icon: <FaPython />, color: '#60A839', category: 'scraping' },
    { name: 'Selenium', icon: <SiSelenium />, color: '#43B02A', category: 'scraping' },
    { name: 'BeautifulSoup', icon: <SiGooglechrome />, color: '#FFD43B', category: 'scraping' }, // Yellow for visibility
    
    // Tools & Automation
    { name: 'n8n', icon: <TbAutomation />, color: '#EA4B71', category: 'tools' },
    { name: 'GoHighLevel', icon: <BsGearFill />, color: '#FF6B35', category: 'tools' },
    { name: 'Git', icon: <FaGitAlt />, color: '#F05032', category: 'tools' },
    { name: 'Postman', icon: <SiPostman />, color: '#FF6C37', category: 'tools' },
    { name: 'Jira', icon: <SiJira />, color: '#0052CC', category: 'tools' },
    { name: 'Brevo', icon: <TbAutomation />, color: '#0B996E', category: 'tools' },
    { name: 'Gallabox', icon: <TbAutomation />, color: '#25D366', category: 'tools' },
  ];

  const filteredSkills = activeCategory === 'all' 
    ? allSkills 
    : allSkills.filter(skill => skill.category === activeCategory);

  return (
    <section className="skills" id="skills" ref={sectionRef}>
      <div className="skills-container">
        {/* Header */}
        <div className={`section-header ${isVisible ? 'animate' : ''}`}>
          <span className="section-tag">My Skills</span>
          <h2 className="section-title">
            Technologies 
            <span className="gradient-text"> I Work With</span>
          </h2>
          <p className="section-description">
            Specialized in Python development, data analytics, and workflow automation
          </p>
        </div>

        {/* Category Filter */}
        <div className={`skills-filter ${isVisible ? 'animate' : ''}`}>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              <span className="filter-name">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className={`skills-grid ${isVisible ? 'animate' : ''}`}>
          {filteredSkills.map((skill, index) => (
            <div 
              className="skill-tile"
              key={`${skill.name}-${index}`}
              style={{ 
                animationDelay: `${index * 0.05}s`,
                '--skill-color': skill.color 
              }}
            >
              <div className="tile-glow"></div>
              <div className="tile-content">
                <div className="skill-icon" style={{ color: skill.color }}>
                  {skill.icon}
                </div>
                <span className="skill-name">{skill.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;