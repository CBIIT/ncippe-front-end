import { randomString } from '../../utils/utils'
export const IDENTITY_CONFIG = {
  authority: process.env.REACT_APP_AUTH_URL, //(string): The URL of the OIDC provider.
  client_id: process.env.REACT_APP_OAUTH_CLIENT_ID,
  redirect_uri: process.env.REACT_APP_REDIRECT_URI, 
  post_logout_redirect_uri: process.env.REACT_APP_PUBLIC_URL, // (string): The OIDC post-logout redirect URI.
  response_type: "code", //(string, default: 'code')
  disablePKCE: true,
  scope: "openid company email profile", //(string, default: 'openid'): The scope being requested from the OIDC provider.
  }

export const METADATA_OIDC = {
  jwks_uri:  "https://stsstg.nih.gov/openid/connect/jwks.json",
  authorization_endpoint: "https://stsstg.nih.gov/auth/oauth/v2/authorize",
  token_endpoint: "https://stsstg.nih.gov/auth/oauth/v2/token",
  userinfo_endpoint: "https://stsstg.nih.gov/openid/connect/v1/userinfo",
  certificates_endpoint: "https://stsstg.nih.gov/api/openid_connect/certs",
  end_session_endpoint: "https://stsstg.nih.gov/connect/session/logout",
  // check_session_iframe: process.env.REACT_APP_AUTH_URL + "/api/openid_connect/checksession",
  // revocation_endpoint: process.env.REACT_APP_AUTH_URL + "/api/openid_connect/revocation",
  // introspection_endpoint: process.env.REACT_APP_AUTH_URL + "/api/openid_connect/introspect"
}
