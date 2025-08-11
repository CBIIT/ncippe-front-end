import { IDENTITY_CONFIG, METADATA_OIDC } from "./authConfig"
import { UserManager, WebStorageStateStore, Log } from "oidc-client-ts"
export  class AuthService {
  UserManager;
  accessToken;

  constructor() {
    this.UserManager = new UserManager({
      ...IDENTITY_CONFIG,
      userStore: new WebStorageStateStore({ store: window.localStorage }),
      metadata: {
        ...METADATA_OIDC
      },
      extraQueryParams: {
        prompt: 'login'
      }
    });
    // Logger
    Log.logger = console;
    Log.level = Log.DEBUG;

    //Load user from local storage if available
    this.UserManager.events.addUserLoaded(user => {
      this.accessToken = user.access_token;
      localStorage.setItem("access_token", user.access_token);
      localStorage.setItem("id_token", user.id_token);
    });

    this.UserManager.events.addAccessTokenExpiring(() => {
      console.warn("Access token is expiring soon");
       // You can show a modal, banner, or trigger a UI warning
      window.dispatchEvent(new CustomEvent("tokenExpiring"));
    });
   
    }
  
    setTokenExpiredHandler(navigate) {
      this.UserManager.events.addAccessTokenExpired(() => {
        console.log("token expired");
  
        this.UserManager.clearStaleState();
        this.UserManager.signoutRedirectCallback().then(() => {
          localStorage.clear()
          navigate('/error',{
            state: {
              error: {
                status: 'info',
                name: 'Session expired',
                message: "Your session has expired. Please log in again."
              }
            }
          });
        });
        // this.signinSilent();
      });
    }
  
  getUser = async () => {
    const user = await this.UserManager.getUser();
    if (!user) {
      console.log("No user found, redirecting to login");
      try {
        return await this.UserManager.signinRedirectCallback();
      } catch (error) {
        console.error("Error during login redirect:", error);
        return null;
      }
    }
    return user;
  };

  signinRedirect =({state}={}) => {
    localStorage.setItem("redirectUri", window.location.pathname);
    console.log("Redirecting to login in AuthService");
    return this.UserManager.signinRedirect({state}).catch((err) => {
    console.error("Signin redirect failed:", err);
    });
  };

  signinRedirectCallback = async (state) => {
    if(state && state.mockUserLogin) {
      return Promise.resolve(state)
    } else {
      return this.UserManager.signinRedirectCallback()
    }
  };

  signinSilent = () => {
    return this.UserManager.signinSilent()
      .then(user => {
        console.log("signed in silently", user);
        this.setUserInfo(user);
        return user;
      })
      .catch(err => {
        console.log("silent signin error", err);
        // If silent signin fails, redirect to login
        this.signinRedirect();
        return null;
      });
  };

  signinSilentCallback = () => {
    this.UserManager.signinSilentCallback();
  };

  parseJwt = token => {
    const base64Url = token.split(".")[1];
    console.log("base64Url + token ");
    if(base64Url) {
      const base64 = base64Url.replace("-", "+").replace("_", "/");
      return JSON.parse(window.atob(base64));
    } else {
      try {
        const parsedToken = JSON.parse(window.atob(token))
        return parsedToken
      }
      catch(error) {
        console.log(error.message)
        return token
      }
    }
  };

  setUserInfo = authResult => {
    // const data = this.parseJwt(this.accessToken);
    const data = this.parseJwt(authResult.idToken);

    this.setSessionInfo(authResult);
    this.setUser(data);
  };

  setUser = data => {
    localStorage.setItem("user", JSON.stringify(data));
  };

  setSessionInfo(authResult) {
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
  }

  isAuthenticated = () => {
    const access_token = localStorage.getItem("access_token");
    return !!access_token;
  };

  createSigninRequest = () => {
    return this.UserManager.createSigninRequest();
  };

  logout = async () => {
    console.log("Logging out");
    const id_token = localStorage.getItem("id_token");
    const access_token = localStorage.getItem("access_token");

    try {
      const response = await fetch('/api/logout-sts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`
        },
        body: JSON.stringify({ id_token }),
      });
      
      if (response.redirected) {
        window.location.href = response.url;  // This will redirect to post_logout_redirect_uri (e.g. /signout)
      } else {
        console.error('Logout proxy did not redirect:', await response.text());
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = '/';
      }
    } catch (err) {
      console.error('Error during logout proxy call:', err);
       // Fallback for failed backend call
        // Clear local user info
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = '/';
    }

  };

  signoutRedirectCallback = async (navigate, state) => {
    try {
      await this.UserManager.signoutRedirectCallback();
    } catch (e) {
      console.error('Signout callback failed:', e);
    } finally {
      localStorage.clear();
      sessionStorage.clear();
      navigate('/', { state: { ...state } }); // or just window.location.href = '/'
    }
  };

  getStoredUser() {
    try {
      const access_token = localStorage.getItem('access_token');
      const id_token = localStorage.getItem('id_token');
      const userStr = localStorage.getItem('user');

      if (!access_token || !id_token || !userStr){
        console.log('line 215: Invalid user data in local storage');
        return null;
      }
      const parsedUser = JSON.parse(userStr);

      return {
        access_token,
        id_token,
        auth: true,
        ...parsedUser
      };
    } catch (e) {
      console.error('Error reading user from storage', e);
      return null;
    }
  }
}

const authService = new AuthService();
export default authService;