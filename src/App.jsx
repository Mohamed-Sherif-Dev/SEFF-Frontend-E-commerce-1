import { Route, Routes } from "react-router-dom";

import Products from "./pages/Products";
// import Product from "./pages/ProductDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import ProductDetails from "./pages/ProductDetails";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrooToTop";

// export default function App() {
//   return (
//     <div className="min-h-screen flex flex-col bg-gray-200">
//       <min className="flex-1">
//           <Navbar />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/product" element={<Products />} />
//           <Route path="/product/:id" element={<ProductDetails />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/checkout" element={<Checkout />} />
//           <Route path="*" element={<PageNotFound />} />
//           <Route path="/product/*" element={<PageNotFound />} />
//         </Routes>
//       </min>
//     </div>
//   );
// }

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-200">
      <main className="flex-1">
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          {/* products */}
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />

          {/* static */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* cart / auth / checkout */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* 404 */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </main>
    </div>
  );
}