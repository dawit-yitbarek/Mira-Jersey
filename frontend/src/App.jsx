import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import AboutPage from "./pages/About";
import ShopPage from "./pages/Shop";
import ContactPage from "./pages/Contact";
import CartPage from "./pages/Cart";
import Admin from './pages/Admin'
import CheckoutPage from './pages/Checkout';
import VerifyPage from './pages/Verify';
import Navbar from './components/Navbar';
import FooterSection from './components/Footer';
import NotFound from './pages/NotFound';
import ScrollToHash from './components/ScrollToHash';

const App = () => {
  return (
    <Router>
      <ScrollToHash />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/verify/:tx_ref" element={<VerifyPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <FooterSection />
    </Router>
  );
};

export default App;
