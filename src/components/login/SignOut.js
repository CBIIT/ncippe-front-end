import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from './authService';

export default function SignOut() {
  const navigate = useNavigate();

  useEffect(() => {
    const signout = async () => {
        try {
          await authService.signoutRedirectCallback(navigate);
        } catch (error) {
          console.error('Error during signout callback:', error);
        } finally {
          localStorage.clear();
          sessionStorage.clear();
          navigate('/', {replace: true});
        }
      };
  
      signout();
    }, [navigate]);

  return <div>Signing out...</div>;
}