import React, { useMemo } from "react";
import authService from "./authService";

export const AuthContext = React.createContext({
    signinRedirectCallback: () => ({}),
    logout: () => ({}),
    signoutRedirectCallback: () => ({}),
    isAuthenticated: () => ({}),
    signinRedirect: () => ({}),
    signinSilentCallback: () => ({}),
    createSigninRequest: () => ({})
});

export const AuthProvider = ({children}) => {
 // const authService = useMemo(() => new AuthService(), []);
  return (
    <AuthContext.Provider value={authService}>
      {children}
    </AuthContext.Provider>
  )
}

export const AuthConsumer = AuthContext.Consumer;