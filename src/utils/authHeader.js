// Utility to get token from localStorage
export function getToken() {
  console.log("getToken called");

  try {
    // Step 1: Parse the root persisted object
    const persistRootRaw = localStorage.getItem("persist:root");
    const persistRoot = JSON.parse(persistRootRaw);
    console.log("Parsed persist:root:", persistRoot);

    // Step 2: Parse the auth string inside it
    const authRaw = persistRoot.auth;
    const authData = JSON.parse(authRaw);
    console.log("Parsed auth:", authData);

    // Step 3: Extract the token
    const token = authData.token;
    console.log("Token from auth data:", token);

    return token || null;
  } catch (e) {
    console.error("Error retrieving token:", e);
    return null;
  }
}


// Utility to get auth header with token
export function authHeader(isProtected = true) {
  if(!isProtected) return {};

  const token = getToken();

  console.log("authHeader called, token:", token);   
  if (!token) {
    console.warn("No token found for auth header");
    return {};
  }
  return { Authorization: `Bearer ${token}` };

}
