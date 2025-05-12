import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ClickInterceptor = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleClick = (event) => {
      if (event.target.dataset?.route && event.target.pathname) {
        event.preventDefault();
        navigate(event.target.pathname);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [navigate]);

  return null;
};

export default ClickInterceptor;
