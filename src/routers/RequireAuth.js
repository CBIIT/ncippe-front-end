// RequireAuth.js
import React, { useContext, useEffect, useState } from 'react';
import { Navigate,  useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { LoginContext } from '../components/login/Login.context';

import { useTranslation } from 'react-i18next';

const RequireAuth = ({ children }) => {
  const [state, dispatch] = useContext(LoginContext);
  const [loading, setLoading] = useState(!state.auth);
  const { i18n, t } = useTranslation('a_common');
  const location = useLocation();

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: '3rem' }}>
        <p>{t('components.signin.loading', 'Loading User Data...')}</p>
      </Box>
    )
  }

  return state.auth ? <>{children} </> : <Navigate to="/" replace state={{ from: location.pathname }} />
}
export default RequireAuth