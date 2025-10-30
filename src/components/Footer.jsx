import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">

        {/* Logo + About */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold text-white">E-commerce</h2>
            <p className="mt-2 text-sm max-w-md text-gray-400">
              Your trusted store for the best products with great prices and fast delivery.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-6 text-sm">
            <Link to="/" className="hover:text-white">Home</Link>
            <Link to="/products" className="hover:text-white">Products</Link>
            <Link to="/about" className="hover:text-white">About</Link>
            <Link to="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>

        {/* Line Divider */}
        <hr className="my-6 border-gray-700" />

        {/* Bottom */}
        <p className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} E-commerce Store. All rights reserved.
        </p>
      </div>
    </footer>
  );
}