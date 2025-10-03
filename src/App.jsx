import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserPage from "./pages/UserPage";

// Routes
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicRoute><Navigate to="/login" /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

        {/* Private Route */}
        <Route path="/user/me" element={<ProtectedRoute><UserPage /></ProtectedRoute>} />

      </Routes>
    </BrowserRouter>
  );
}
