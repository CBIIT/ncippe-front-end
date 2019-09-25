import { IDENTITY_CONFIG, METADATA_OIDC } from "./auth";
import { UserManager, WebStorageStateStore, Log } from "oidc-client";
import { navigate } from "@reach/router"

import { randomString } from '../../utils/utils'

export default class AuthService {
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

    console.log("IDENTITY_CONFIG",IDENTITY_CONFIG)
    console.log("METADATA_OIDC",METADATA_OIDC)
    console.log("UserManager", this.UserManager)

    this.UserManager.events.addUserLoaded(user => {
      this.accessToken = user.access_token;
      localStorage.setItem("access_token", user.access_token);
      localStorage.setItem("id_token", user.id_token);
      localStorage.setItem("user_data", JSON.stringify({...user.profile}));
      if (window.location.href.indexOf("signin-oidc") !== -1) {
        this.navigateToScreen();
      }
    });
    this.UserManager.events.addSilentRenewError(e => {
      console.log("silent renew error", e.message);
    });

    this.UserManager.events.addAccessTokenExpired(() => {
      console.log("token expired");
      this.signinSilent();
    });
  }

  signinRedirectCallback = () => {
    this.UserManager.signinRedirectCallback().then(() => {
      console.log("sign-in successful. Time to redirect to dashboard")
      console.log("TODO: catch errors!")
      navigate('/dashboard')

    })
  };

  getUser = async () => {
    const user = await this.UserManager.getUser();
    if (!user) {
      return await this.UserManager.signinRedirectCallback();
    }
    return user;
  };

  parseJwt = token => {
    const base64Url = token.split(".")[1];
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

  signinRedirect = () => {
    localStorage.setItem("redirectUri", window.location.pathname);
    this.UserManager.signinRedirect({});
  };

  setUser = data => {
    localStorage.setItem("user", data);
  };

  navigateToScreen = () => {
    const redirectUri = !!localStorage.getItem("redirectUri")
      ? localStorage.getItem("redirectUri")
      : "/en/dashboard";
    const language = "/" + redirectUri.split("/")[1];

    window.location.replace(language + "/dashboard");
  };

  setSessionInfo(authResult) {
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
  }

  isAuthenticated = () => {
    const access_token = localStorage.getItem("access_token");
    return !!access_token;
  };

  signinSilent = () => {
    this.UserManager.signinSilent()
      .then(user => {
        console.log("signed in", user);
      })
      .catch(err => {
        console.log(err);
      });
  };
  signinSilentCallback = () => {
    this.UserManager.signinSilentCallback();
  };

  createSigninRequest = () => {
    return this.UserManager.createSigninRequest();
  };

  logout = () => {
    this.UserManager.signoutRedirect({
      id_token_hint: localStorage.getItem("id_token"),
      state: randomString(32)
    });
    this.UserManager.clearStaleState();
  };

  signoutRedirectCallback = () => {
    this.UserManager.signoutRedirectCallback().then(() => {
      localStorage.clear();
      window.location.replace(process.env.REACT_APP_PUBLIC_URL);
    });
    this.UserManager.clearStaleState();
  };
}