

import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";

const CATEGORIES = [
  { label: "All", value: "all" },
  { label: "Men's Clothing", value: "men's clothing" },
  { label: "Women's Clothing", value: "women's clothing" },
  { label: "Jewelery", value: "jewelery" },
  { label: "Electronics", value: "electronics" },
];

export default function Products() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | error
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        setStatus("loading");
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("Network error");
        const data = await res.json();
        if (!ignore) { setItems(data); setStatus("idle"); }
      } catch {
        setStatus("error");
      }
    })();
    return () => { ignore = true; };
  }, []);

  // الفلترة محليًا
  const visible = useMemo(() => {
    const term = q.trim().toLowerCase();
    return items.filter(p => {
      const okCat = cat === "all" || p.category === cat;
      const okText = !term || p.title.toLowerCase().includes(term);
      return okCat && okText;
    });
  }, [items, cat, q]);

  if (status === "loading") {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-64 rounded-lg animate-pulse bg-gray-200" />
          ))}
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <p className="rounded-md bg-red-50 p-4 text-red-700">
          Failed to load products. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-bold text-gray-900 text-center">Latest Products</h2>

      {/* شريط الفلترة + البحث */}
      <div className="mt-6 flex flex-col items-center gap-3">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map(c => {
            const active = cat === c.value;
            return (
              <button
                key={c.value}
                onClick={() => setCat(c.value)}
                className={`rounded-full border px-3 py-1 text-sm ${
                  active ? "bg-gray-900 text-white border-gray-900" : "hover:bg-gray-100"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        <input
          placeholder="Search products…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full max-w-xs rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 text-sm px-3 py-2"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visible.map((p) => (
          <ProductCard
            key={p.id}
            id={p.id}
            title={p.title}
            price={p.price}
            image={p.image}
            category={p.category}
          />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="mt-8 text-center text-gray-500">No products match your filters.</p>
      )}
    </div>
  );
}