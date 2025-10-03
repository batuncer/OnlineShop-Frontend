import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // Check for token in Redux state or localStorage
  const token = useSelector((s)=>s.auth.token) || localStorage.getItem("token");

  // If no token, redirect to login
  if (!token) return <Navigate to="/login" replace />;
  return children;
}
