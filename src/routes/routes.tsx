import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "../layouts/layout";
import { AllGoods, Cart, Contact, Delivery, Home } from "../pages/user";
import { ScrollToTop } from "../sections";
import { CartProvider } from "../sections/CartContext";
import { AdminPanel } from "../pages/admin";

export const useRoutes = () => {
  return (
    <BrowserRouter>
       <ScrollToTop />
       <CartProvider>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/main" element={<Layout><Home /></Layout>} />
        <Route path="/product" element={<Layout><AllGoods /></Layout>} />
        <Route path="/product/:category" element={<Layout><AllGoods /></Layout>} /> {/* For categories */}
        <Route path="/product/:productName" element={<Layout><AllGoods /></Layout>} /> {/* For individual products */}
        <Route path="/product/:category/:productName" element={<Layout><AllGoods /></Layout>} />
        <Route path="/delivery-payment" element={<Layout><Delivery /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/cart" element={<Layout><Cart /></Layout>} />
        <Route path="/admin" element={<AdminPanel />} /> 
        <Route path="*" element={<Navigate to="/main" replace />} />
      </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default useRoutes;
