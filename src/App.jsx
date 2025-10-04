import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserPage from "./pages/UserPage";
import MainPage from "./pages/MainPage";

// Routes
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

//Organisms
import Navbar from "./components/organism/Navbar";


export default function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicRoute><MainPage /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

        {/* Private Route */}
        <Route path="/user/me" element={<ProtectedRoute><UserPage /></ProtectedRoute>} />

      </Routes>
    </BrowserRouter>
  );
}
