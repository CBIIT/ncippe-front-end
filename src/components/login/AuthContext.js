import React from "react";
import AuthService from "./authService";

export const AuthContext = React.createContext({
    signinRedirectCallback: () => ({}),
    logout: () => ({}),
    signoutRedirectCallback: () => ({}),
    isAuthenticated: () => ({}),
    signinRedirect: () => ({}),
    signinSilentCallback: () => ({}),
    createSigninRequest: () => ({})
});

export const AuthProvider = (props) => {
  const authService = new AuthService()
  return (
    <AuthContext.Provider value={authService}>
      {props.children}
    </AuthContext.Provider>
  )
}

export const AuthConsumer = AuthContext.Consumer;