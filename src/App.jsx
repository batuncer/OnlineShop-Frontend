import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserPage from "./pages/UserPage";
import MainPage from "./pages/MainPage";
import Product from "./pages/Product";
import CheckOutPage from "./pages/CheckOutPage";

// Routes
import ProtectedRoute from "./routes/ProtectedRoute";

//Organisms
import Navbar from "./ui/organism/Navbar";
import Footer from "./ui/organism/Footer";


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/checkout" element={<CheckOutPage />} />

        {/* Private Route */}
        <Route path="/user/me" element={<ProtectedRoute><UserPage /></ProtectedRoute>} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
