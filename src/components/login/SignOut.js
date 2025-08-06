import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import authService from './authService';

export default function SignOut() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const signout = async () => {
        const query = new URLSearchParams(location.search);
        const isPostLogout = query.get('post_logout')
        if(!isPostLogout){
       
            console.log('Signing out...');
            try {
                await authService?.removeUser?.();
                await authService?.clearStaleState?.();
            } catch (error) {
                console.error('Error during final cleanup:', error);
            } finally {
                localStorage.clear();
                sessionStorage.clear();
                window.location.href = '/'
                //navigate('/', { replace: true });
            }
        }else{
            try {
                await authService.signoutRedirect({
                  post_logout_redirect_uri: `${window.location.origin}/signout?post_logout=true`,
                });
              } catch (error) {
                console.error('Error during signout redirect:', error);
                // If redirect fails, do local cleanup and navigate.
                localStorage.clear();
                sessionStorage.clear();
                window.location.href = '/'
                //navigate('/', { replace: true });
              }
            }
          };
  
      signout();
    }, [navigate]);

  return <div>Signing out...</div>;
}