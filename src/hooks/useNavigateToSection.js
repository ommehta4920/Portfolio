import { useNavigate } from 'react-router-dom';

const useNavigateToSection = () => {
  const navigate = useNavigate();

  const navigateToSection = (sectionId, path = '/') => {
    navigate(path);
    
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80; // Navbar height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 150);
  };

  return navigateToSection;
};

export default useNavigateToSection;