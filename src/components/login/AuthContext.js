import React, { useMemo, useState, useRef, useEffect } from "react";
import authService from "./authService";
import { getTokenExpiry, isTokenExpired } from "../../utils/jwt";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, LinearProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const WARN_LEAD_MS = 60_000; // show dialog 60s before expiration

export const AuthContext = React.createContext({
    signinRedirectCallback: async () => {},
    logout: () => {},
    signoutRedirectCallback: async () => {},
    isAuthenticated: () => false,
    signinRedirect: async() => {},
    signinSilentCallback: async () => {},
    createSigninRequest: async () => ({}),
    ensureValidOrSignOut: async () => true,
    token: null 
});

export const AuthProvider = ({children}) => {
 // const authService = useMemo(() => new AuthService(), []);
 const [token, setToken] = useState(() => localStorage.getItem("access_token"));
 const [showDialog, setShowDialog] = useState(false);
 const [secondsLeft, setSecondsLeft] = useState(0);
 const navigate = useNavigate();

 const warnTimer = useRef(null);
 const tickInterval = useRef(null);

 // keep token in sync with storage (multi-tab)
 useEffect(() => {
   const onStorage = (e) => {
     if (e.key === "access_token") setToken(e.newValue);
   };
   window.addEventListener("storage", onStorage);
   return () => window.removeEventListener("storage", onStorage);
 }, []);

 // helper to fully sign out and go to login
 const doSignOut = async () => {
   try {
     await (authService.logout?.() ?? authService.signoutRedirect?.());
   } finally {
     localStorage.removeItem("access_token");
     setToken(null);
     setShowDialog(false);
     // route to login (adjust if your flow differs)
     navigate("/login", { replace: true });
   }
 };

 // schedule the warning dialog & auto-logout
 useEffect(() => {
   // clear previous timers
   if (warnTimer.current) window.clearTimeout(warnTimer.current);
   if (tickInterval.current) window.clearInterval(tickInterval.current);
   setShowDialog(false);

   if (!token) return;

   const expMs = getTokenExpiry(token);
   if (!expMs) {
     // undecodable token -> sign out now
     void doSignOut();
     return;
   }

   const now = Date.now();
   const msUntilWarn = Math.max(expMs - now - WARN_LEAD_MS, 0);

   // if already within the warn window, open immediately
   const openDialog = () => {
     setShowDialog(true);
     // start countdown to actual expiration
     const tick = () => {
       const remaining = Math.max(Math.ceil((expMs - Date.now()) / 1000), 0);
       setSecondsLeft(remaining);
       if (remaining <= 0) {
         if (tickInterval.current) window.clearInterval(tickInterval.current);
         void doSignOut();
       }
     };
     tick(); // initialize immediately
     tickInterval.current = window.setInterval(tick, 1000);
   };

   if (msUntilWarn === 0) openDialog();
   else warnTimer.current = window.setTimeout(openDialog, msUntilWarn);

   return () => {
     if (warnTimer.current) window.clearTimeout(warnTimer.current);
     if (tickInterval.current) window.clearInterval(tickInterval.current);
   };
 }, [token]);

 const value = useMemo(() => ({
   ...authService,
   token,
   isAuthenticated: () => {
     const expMs = token ? getTokenExpiry(token) : null;
     return Boolean(token && expMs && expMs > Date.now());
   },
   ensureValidOrPrompt: () => {
     const expMs = token ? getTokenExpiry(token) : null;
     if (!token || !expMs || expMs <= Date.now()) {
       setShowDialog(true);
       setSecondsLeft(0);
       return false;
     }
     // if within WARN window, ensure dialog is up
     if (expMs - Date.now() <= WARN_LEAD_MS) setShowDialog(true);
     return true;
   },
 }), [token]);

 return (
   <AuthContext.Provider value={value}>
     {children}

     <Dialog open={showDialog} onClose={doSignOut} maxWidth="xs" fullWidth>
       <DialogTitle>Session expiring</DialogTitle>
       <DialogContent>
         <DialogContentText>
           Your session is about to expire. You’ll be signed out automatically in{" "}
           <strong>{secondsLeft}</strong> second{secondsLeft === 1 ? "" : "s"}.
         </DialogContentText>
         <LinearProgress
           variant="determinate"
           // progress from 100% → 0% over the WARN window
           value={Math.max(0, Math.min(100, (secondsLeft / Math.ceil(WARN_LEAD_MS / 1000)) * 100))}
           sx={{ mt: 2 }}
         />
       </DialogContent>
       <DialogActions>
         {/* If you add silent refresh later, this button could attempt it. */}
         <Button onClick={doSignOut} variant="contained" color="primary">
           Sign in again
         </Button>
       </DialogActions>
     </Dialog>
   </AuthContext.Provider>
 );
};

export const AuthConsumer = AuthContext.Consumer;