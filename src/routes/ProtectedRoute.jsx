import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // Check for token in Redux state or localStorage
  const token = useSelector((s)=>s.auth.token);
  return token ? children : <Navigate to="/" />;
}
