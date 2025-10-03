// Utility to get auth header with token
export function authHeader() {
  // Get token from localStorage
    const token = localStorage.getItem("token");

  // Return Authorization header if token exists
    return token ? { Authorization: `Bearer ${token}` } : {};
  }