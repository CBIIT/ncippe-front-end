import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ClickInterceptor = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleClick = (event) => {
      const anchor = event.target.closest('a');

      if (
        anchor &&
        anchor.dataset.route !== undefined &&
        anchor.href &&
        anchor.origin === window.location.origin
      ) {
        event.preventDefault();
        const pathname = new URL(anchor.href).pathname;
        navigate(pathname);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [navigate]);

  return null;
};

export default ClickInterceptor;
