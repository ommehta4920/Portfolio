import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaGithub, 
  FaExternalLinkAlt, 
  FaArrowLeft, 
  FaSearch, 
  FaStar,
  FaCodeBranch,
  FaCalendarAlt,
  FaSpinner
} from 'react-icons/fa';
import './AllProjects.css';
import useNavigateToSection from '../../hooks/useNavigateToSection';


const AllProjects = () => {
  const navigate = useNavigate();
  const navigateToSection = useNavigateToSection();
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('updated');

  const GITHUB_USERNAME = 'ommehta4920';

  // Language color mapping
  const languageColors = {
    'Python': '#3572A5',
    'JavaScript': '#f1e05a',
    'TypeScript': '#3178c6',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'Java': '#b07219',
    'Jupyter Notebook': '#DA5B0B',
    'Shell': '#89e051',
    'C++': '#f34b7d',
    'C': '#555555',
    'PHP': '#4F5D95',
    'Ruby': '#701516',
    'Go': '#00ADD8',
    'Rust': '#dea584',
    'Vue': '#41b883',
    'Dart': '#00B4AB',
    'Kotlin': '#A97BFF',
    'Swift': '#F05138',
  };

  // Fetch repositories from GitHub API
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
        );
        
        if (!response.ok) {
          throw new Error(`Failed to fetch repositories: ${response.status}`);
        }
        
        const data = await response.json();
        setRepos(data);
      } catch (err) {
        console.error('Error fetching repos:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
    window.scrollTo(0, 0);
  }, []);

  // Get unique languages for filter
  const languages = ['all', ...new Set(repos.map(repo => repo.language).filter(Boolean))];

  // Filter and sort repositories
  const filteredRepos = repos
    .filter(repo => {
      const matchesLanguage = activeFilter === 'all' || repo.language === activeFilter;
      const matchesSearch = 
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesLanguage && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'stars':
          return b.stargazers_count - a.stargazers_count;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'updated':
        default:
          return new Date(b.updated_at) - new Date(a.updated_at);
      }
    });

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Format repo name for display
  const formatRepoName = (name) => {
    return name.replace(/-/g, ' ').replace(/_/g, ' ');
  };

  // Loading State
  if (loading) {
    return (
      <div className="allprojects-page">
        <div className="allprojects-loading">
          <FaSpinner className="allprojects-spinner" />
          <h3>Loading Projects...</h3>
          <p>Fetching repositories from GitHub</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="allprojects-page">
        <div className="allprojects-error">
          <div className="allprojects-error-icon">⚠️</div>
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
          <div className="allprojects-error-buttons">
            <button onClick={() => window.location.reload()}>Try Again</button>
            <button onClick={() => navigate('/')}>Back to Home</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="allprojects-page">
      {/* Header */}
      <header className="allprojects-header">
        <div className="allprojects-header-inner">
          <button className="allprojects-back" onClick={() => navigate('/')}>
            <FaArrowLeft />
            <span>Back to Home</span>
          </button>
          
          <div className="allprojects-header-content">
            <h1>My <span>GitHub Projects</span></h1>
            <p>Explore all my repositories - Python development, automation scripts, and more</p>
            
            <div className="allprojects-stats">
              <a 
                href={`https://github.com/${GITHUB_USERNAME}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="allprojects-github-link"
              >
                <FaGithub />
                <span>@{GITHUB_USERNAME}</span>
              </a>
              <div className="allprojects-stat">
                <FaCodeBranch />
                <span>{repos.length} Repos</span>
              </div>
              <div className="allprojects-stat">
                <FaStar />
                <span>{repos.reduce((acc, repo) => acc + repo.stargazers_count, 0)} Stars</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <section className="allprojects-filters">
        <div className="allprojects-filters-inner">
          <div className="allprojects-search">
            <FaSearch />
            <input
              type="text"
              placeholder="Search repositories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select 
            className="allprojects-sort"
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="updated">Recently Updated</option>
            <option value="stars">Most Stars</option>
            <option value="name">Name (A-Z)</option>
          </select>

          <div className="allprojects-filter-tabs">
            {languages.slice(0, 6).map((lang, index) => (
              <button
                key={index}
                className={activeFilter === lang ? 'active' : ''}
                onClick={() => setActiveFilter(lang)}
              >
                {lang === 'all' ? 'All' : lang}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="allprojects-content">
        <div className="allprojects-content-inner">
          {filteredRepos.length > 0 ? (
            <div className="allprojects-grid">
              {filteredRepos.map((repo) => (
                <article className="allprojects-card" key={repo.id}>
                  <div className="allprojects-card-header">
                    <div className="allprojects-card-icon">
                      <FaGithub />
                    </div>
                    <div className="allprojects-card-links">
                      <a 
                        href={repo.html_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        title="View on GitHub"
                      >
                        <FaGithub />
                      </a>
                      {repo.homepage && (
                        <a 
                          href={repo.homepage} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          title="Live Demo"
                        >
                          <FaExternalLinkAlt />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="allprojects-card-body">
                    <h3>{formatRepoName(repo.name)}</h3>
                    <p>{repo.description || 'No description available'}</p>
                  </div>

                  <div className="allprojects-card-footer">
                    {repo.language && (
                      <div className="allprojects-card-lang">
                        <span 
                          className="allprojects-lang-dot"
                          style={{ backgroundColor: languageColors[repo.language] || '#8b8b8b' }}
                        ></span>
                        <span>{repo.language}</span>
                      </div>
                    )}

                    <div className="allprojects-card-stats">
                      <span><FaStar /> {repo.stargazers_count}</span>
                      <span><FaCodeBranch /> {repo.forks_count}</span>
                    </div>

                    <div className="allprojects-card-date">
                      <FaCalendarAlt />
                      <span>{formatDate(repo.updated_at)}</span>
                    </div>
                  </div>

                  {repo.topics && repo.topics.length > 0 && (
                    <div className="allprojects-card-topics">
                      {repo.topics.slice(0, 3).map((topic, i) => (
                        <span key={i}>{topic}</span>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <div className="allprojects-empty">
              <span>📁</span>
              <h3>No repositories found</h3>
              <p>Try adjusting your search or filter</p>
              <button onClick={() => { setSearchQuery(''); setActiveFilter('all'); }}>
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="allprojects-footer">
      <div className="allprojects-footer-inner">
        <div className="allprojects-footer-text">
          <h2>Want to collaborate?</h2>
          <p>I'm always open to discussing new projects.</p>
        </div>
        <div className="allprojects-footer-buttons">
          <a 
            href={`https://github.com/${GITHUB_USERNAME}`} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <FaGithub /> Follow on GitHub
          </a>
          {/* Using custom hook */}
          <button onClick={() => navigateToSection('contact')}>
            Contact Me
          </button>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default AllProjects;