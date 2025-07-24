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
    // this.UserManager.events.addSilentRenewError(e => {
    //   console.log("silent renew error", e.message);
    // });

      //allow setting up a callback when token is expired
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
    localStorage.setItem("user", data);
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

  logout = () => {
    this.UserManager.clearStaleState();
    sessionStorage.clear();
    this.UserManager.signoutRedirect({
      id_token_hint: localStorage.getItem("id_token")|| undefined
    });
    this.UserManager.clearStaleState();
  };

  signoutRedirectCallback = async (navigate, state) => {

    this.UserManager.clearStaleState();
    await this.UserManager.signoutRedirectCallback().then(() => {
      localStorage.clear()
      // window.location.replace(process.env.REACT_APP_PUBLIC_URL);
      navigate('/',{state:{...state}})
    });
  };
}

const authService = new AuthService();
export default authService;