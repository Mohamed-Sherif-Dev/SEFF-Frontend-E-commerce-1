import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../utils/cart";

export default function ProductCard({ id, title, price, image, category }) {
  const navigate = useNavigate();

  return (
    <div className="group rounded-lg border bg-white p-4 hover:shadow-md transition">
      <Link to={`/products/${id}`} className="block">
        <div className="aspect-[4/3] w-full overflow-hidden rounded-md bg-gray-100">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-contain p-3 group-hover:scale-105 transition"
            loading="lazy"
          />
        </div>
        <h3 className="mt-3 line-clamp-1 text-sm font-semibold text-gray-900">
          {title}
        </h3>
        <p className="mt-1 text-xs text-gray-500 capitalize">{category}</p>
      </Link>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-base font-bold text-gray-900">${price}</span>

        <div className="flex items-center gap-2">
          {/* Buy Now → تفاصيل المنتج */}
          <button
            onClick={() => navigate(`/products/${id}`)}
            className="text-sm font-medium rounded-md border px-3 py-1 hover:bg-gray-100"
          >
            Buy Now
          </button>

          {/* Add to Cart */}
          <button
            onClick={() => addToCart({ id, title, price, image, qty: 1 })}
            className="text-sm font-medium rounded-md bg-gray-900 text-white px-3 py-1 hover:opacity-90"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}