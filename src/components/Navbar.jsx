import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { countCart } from "../utils/cart"; // ✅ مهم

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const [cartCount, setCartCount] = useState(countCart());
  useEffect(() => {
    const update = () => setCartCount(countCart());
    window.addEventListener("cart-changed", update);
    return () => window.removeEventListener("cart-changed", update);
  }, []);

  const isLoggedIn = localStorage.getItem("attar-logged-in") === "true";

  const handleLogout = () => {
    localStorage.removeItem("attar-logged-in");
    localStorage.removeItem("attar-user");
    window.dispatchEvent(new Event("auth-changed"))
    window.location.href = "/login";
  };

  const linkBase = "px-3 py-2 rounded-md text-sm font-medium";
  const linkClass = ({ isActive }) =>
    isActive
      ? `${linkBase} bg-gray-900 text-white`
      : `${linkBase} text-gray-700 hover:bg-gray-200`;

  const CartLink = ({ className = "" }) => (
    <NavLink to="/cart" className={className || linkClass} aria-label="Cart">
      <span className="inline-flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M3 3h2l.4 2M7 13h10l3-8H6.4M7 13L5.4 5M7 13l-2 8h14m-9 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
        </svg>
        <span>Cart</span>
        <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-900 px-1 text-[10px] font-semibold text-white">
          {cartCount /* ✅ بدل 0 */}
        </span>
      </span>
    </NavLink>
  );

  return (
    <header className="bg-white border-b sticky top-0 z-40 shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2" aria-label="Al-Attar Home">
              <span className="text-lg font-bold tracking-tight text-gray-900">E-commerce</span>
            </Link>
          </div>

          {/* Center: Main Links */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1">
            <NavLink end to="/" className={linkClass}>Home</NavLink>
            <NavLink to="/products" className={linkClass}>Products</NavLink>
            <NavLink to="/about" className={linkClass}>About</NavLink>
            <NavLink to="/contact" className={linkClass}>Contact</NavLink>
          </div>

          {/* Right: Actions */}
          <div className="ml-auto hidden md:flex items-center gap-1">
            {!isLoggedIn ? (
              <>
                <NavLink to="/login" className={linkClass}>Login</NavLink>
                <NavLink to="/register" className={linkClass}>Register</NavLink>
                <CartLink />
              </>
            ) : (
              <>
                <CartLink />
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden ml-auto inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div id="mobile-menu" className="md:hidden pb-4 space-y-1 border-t pt-3 flex flex-col items-center justify-center">
            <NavLink end to="/" className={linkClass} onClick={() => setOpen(false)}>Home</NavLink>
            <NavLink to="/products" className={linkClass} onClick={() => setOpen(false)}>Products</NavLink>
            <NavLink to="/about" className={linkClass} onClick={() => setOpen(false)}>About</NavLink>
            <NavLink to="/contact" className={linkClass} onClick={() => setOpen(false)}>Contact</NavLink>

            {!isLoggedIn ? (
              <>
                <NavLink to="/login" className={linkClass} onClick={() => setOpen(false)}>Login</NavLink>
                <NavLink to="/register" className={linkClass} onClick={() => setOpen(false)}>Register</NavLink>
                <CartLink className={`${linkBase} text-gray-700 hover:bg-gray-200`} />
              </>
            ) : (
              <>
                <CartLink className={`${linkBase} text-gray-700 hover:bg-gray-200`} />
                <button
                  onClick={() => { handleLogout(); setOpen(false); }}
                  className="px-3 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}