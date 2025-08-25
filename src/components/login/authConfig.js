import { randomString } from '../../utils/utils'
export const IDENTITY_CONFIG = {
  authority: process.env.REACT_APP_AUTH_URL, //(string): The URL of the OIDC provider.
  client_id: process.env.REACT_APP_OAUTH_CLIENT_ID,
  redirect_uri: process.env.REACT_APP_OAUTH_REDIRECT_URI, 
  post_logout_redirect_uri: process.env.REACT_APP_OAUTH_LOGOUT_LINK, // (string): The OIDC post-logout redirect URI.
  response_type: "code", //(string, default: 'code')
  disablePKCE: true,
  scope: "openid company email profile", //(string, default: 'openid'): The scope being requested from the OIDC provider.
  }

export const METADATA_OIDC = {
  jwks_uri:  process.env.REACT_APP_OAUTH_JWKS_URI,
  authorization_endpoint: process.env.REACT_APP_OAUTH_AUTHORIZATION_ENDPOINT,
  token_endpoint: process.env.REACT_APP_OAUTH_TOKEN_ENDPOINT,
  userinfo_endpoint: process.env.REACT_APP_OAUTH_USERINFO_ENDPOINT,
  certificates_endpoint: process.env.REACT_APP_OAUTH_CERTIFICATES_ENDPOINT,
  end_session_endpoint: process.env.REACT_APP_OAUTH_END_SESSION_ENDPOINT,
  // check_session_iframe: process.env.REACT_APP_AUTH_URL + "/api/openid_connect/checksession",
  // revocation_endpoint: process.env.REACT_APP_AUTH_URL + "/api/openid_connect/revocation",
  // introspection_endpoint: process.env.REACT_APP_AUTH_URL + "/api/openid_connect/introspect"
}
