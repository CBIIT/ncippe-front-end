// jwt.ts
export function decodeJwtPayload(token) {
    const [, payload] = token.split('.');
    if (!payload) throw new Error('Invalid JWT');
    const b64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = b64 + '='.repeat((4 - (b64.length % 4)) % 4);
    const json = decodeURIComponent(
      atob(padded).split('').map(c => '%' + c.charCodeAt(0).toString(16).padStart(2,'0')).join('')
    );
    return JSON.parse(json);
  }
  
  export function getTokenExpiry(token) {
    try {
      const { exp } = decodeJwtPayload(token);
      return typeof exp === 'number' ? exp * 1000 : null; // ms
    } catch {
      return null;
    }
  }
  
  export function isTokenExpired(token, skewSeconds = 60) {
    const expMs = getTokenExpiry(token);
    if (!expMs) return true;
    return Date.now() >= expMs - skewSeconds * 1000;
  }
  