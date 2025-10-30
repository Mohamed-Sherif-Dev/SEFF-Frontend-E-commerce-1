

import { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { addToCart } from "../utils/cart";
import RelatedRow from "../components/RelatedRoW";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [related, setRelated] = useState([]);        
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        setStatus("loading");
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error("Network error");
        const data = await res.json();
        if (!ignore) {
          setItem(data);
          setStatus("idle");
        }

        if (data?.category) {
          const r = await fetch(
            `https://fakestoreapi.com/products/category/${encodeURIComponent(
              data.category
            )}`
          );
          const rData = await r.json();
          if (!ignore) {
            setRelated(rData.filter((p) => p.id !== data.id).slice(0, 8));
          }
        } else {
          if (!ignore) setRelated([]);
        }
      } catch {
        if (!ignore) setStatus("error");
      }
    })();
    return () => {
      ignore = true;
    };
  }, [id]);

  if (status === "loading") return <div className="p-8">Loading…</div>;
  if (status === "error" || !item) {
    return (
      <div className="p-8">
        <p className="text-red-600">Failed to load product.</p>
        <Link to="/products" className="underline">Back to products</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-lg border bg-white p-6">
          <div className="aspect-square w-full bg-gray-100 rounded-md overflow-hidden">
            <img src={item.image} alt={item.title} className="h-full w-full object-contain p-4" />
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500 capitalize">{item.category}</p>
          <h1 className="mt-2 text-2xl font-bold text-gray-900">{item.title}</h1>
          <p className="mt-4 text-gray-700">{item.description}</p>

          <div className="mt-6 flex items-center gap-4">
            <span className="text-3xl font-extrabold text-gray-900">${item.price}</span>
            <button
              className="rounded-md bg-gray-900 px-5 py-3 text-white font-semibold hover:opacity-90"
              onClick={() =>
                addToCart({
                  id: item.id,
                  title: item.title,
                  price: item.price,
                  image: item.image,
                  qty: 1,
                })
              }
            >
              Add to cart
            </button>
          </div>

          <div className="mt-6">
            <Link to="/products" className="text-sm underline underline-offset-4">
              ← Back to products
            </Link>
          </div>
        </div>
      </div>

      <RelatedRow items={related} />
    </div>
  );
}