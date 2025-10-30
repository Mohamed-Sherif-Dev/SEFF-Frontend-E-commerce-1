import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getCart,
  setCart,
  updateQty,
  removeFromCart,
  clearCart,
} from "../utils/cart";

export default function Cart() {
  const navigate = useNavigate();
  const [items, setItems] = useState(getCart());

  useEffect(() => {
    const refresh = () => setItems(getCart());
    window.addEventListener("cart-changed", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("cart-changed", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const subtotal = useMemo(
    () => items.reduce((s, p) => s + p.price * p.qty, 0),
    [items]
  );

  const handleInc = (id) => {
    const next = items.map((p) =>
      p.id === id ? { ...p, qty: p.qty + 1 } : p
    );
    setCart(next);
  };

  const handleDec = (id) => {
    const row = items.find((p) => p.id === id);
    if (!row) return;
    const nextQty = Math.max(1, row.qty - 1);
    updateQty(id, nextQty); 
  };

  const handleChange = (id, value) => {
    const q = Math.max(1, Number(value) || 1);
    updateQty(id, q);
  };

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const handleClear = () => {
    if (items.length === 0) return;
    clearCart();
  };

  const goCheckout = () => {
    if (items.length === 0) return;
    navigate("/checkout");
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
        <div className="mt-6 rounded-lg border bg-white p-8 text-center">
          <p className="text-gray-700">Your cart is empty.</p>
          <Link
            to="/products"
            className="mt-4 inline-block rounded-md bg-gray-900 px-5 py-2 text-white"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>

      <div className="mt-6 grid gap-8 lg:grid-cols-[2fr,1fr]">
        {/* جدول العناصر */}
        <div className="rounded-lg border bg-white">
          <ul className="divide-y">
            {items.map((p) => (
              <li key={p.id} className="p-4 sm:p-5 flex items-center gap-4">
                <div className="h-20 w-20 flex-shrink-0 rounded bg-gray-100 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-contain p-2"
                  />
                </div>

                <div className="flex-1">
                  <Link
                    to={`/products/${p.id}`}
                    className="text-sm font-semibold text-gray-900 line-clamp-1 hover:underline"
                  >
                    {p.title}
                  </Link>
                  <p className="text-xs text-gray-500">${p.price.toFixed(2)}</p>

                  <div className="mt-2 flex items-center gap-3">
                    <div className="inline-flex items-center rounded-md border">
                      <button
                        onClick={() => handleDec(p.id)}
                        className="px-3 py-1 text-sm"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <input
                        value={p.qty}
                        onChange={(e) => handleChange(p.id, e.target.value)}
                        className="w-12 border-x text-center text-sm outline-none"
                        type="number"
                        min="1"
                      />
                      <button
                        onClick={() => handleInc(p.id)}
                        className="px-3 py-1 text-sm"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemove(p.id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="text-right font-semibold text-gray-900">
                  ${(p.price * p.qty).toFixed(2)}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <aside className="rounded-lg border bg-white p-5 h-fit">
          <h2 className="text-lg font-semibold">Order Summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={goCheckout}
            className="mt-5 w-full rounded-md bg-gray-900 py-2.5 text-white font-semibold hover:opacity-90"
          >
            Checkout
          </button>

          <button
            onClick={handleClear}
            className="mt-3 w-full rounded-md border py-2.5 font-semibold hover:bg-gray-50"
          >
            Clear Cart
          </button>

          <Link
            to="/products"
            className="mt-3 block text-center text-sm underline underline-offset-4"
          >
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}