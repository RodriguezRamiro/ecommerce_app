// frontend/src/App.jsx
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/UserContext";
import { checkHealth } from "./utils/api";

// Pages
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import Confirmation from "./pages/Confirmation";
import StoreLocator from "./pages/StoreLocator";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import NotFound from "./pages/NotFound";



function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [serverStatus, setServerStatus] = useState("checking")

  // HealthCheck logic
  useEffect(() => {
    async function pingServer() {
      const res = await checkHealth();
      console.log("Health check response:", res);
      setServerStatus(res.status?.toLowerCase() === "ok" ? "online" : "offline");
    }

    pingServer();
    // recheck every 60 seconds
    const interval = setInterval(pingServer, 60000);
    return () => clearInterval(interval)
  }, []);

  return (
    <UserProvider>
    <CartProvider>
      <Router>
        <div className={`app-container ${darkMode ? "dark-mode" : "light-mode"}`}>
          <Navbar
            onToggleCart={() => setIsCartOpen(true)}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            adminLink={true}
          />

          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/store-locator" element={<StoreLocator />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/confirmation" element={<Confirmation /> } />
              <Route path="/login" element={<UserLogin />} />
              <Route path="/register" element={<UserRegister />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer serverStatus={serverStatus}/>

          {/* Cart Drawer */}
          <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)} />
        </div>
      </Router>
    </CartProvider>
    </UserProvider>
  );
}

export default App;
