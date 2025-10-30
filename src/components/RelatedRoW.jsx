import { useRef } from "react";
import { Link } from "react-router-dom";

export default function RelatedRow({ items = [] }) {
  const scroller = useRef(null);

  const scrollByPx = (px) => {
    scroller.current?.scrollBy({ left: px, behavior: "smooth" });
  };

  if (!items.length) return null;

  return (
    <div className="mt-12 relative">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">
        You may also like
      </h3>

      {/* buttons */}
      <button
        type="button"
        aria-label="Scroll left"
        onClick={() => scrollByPx(-350)}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full border bg-white/90 p-2 shadow hover:bg-white hidden sm:inline-flex"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Scroll right"
        onClick={() => scrollByPx(350)}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full border bg-white/90 p-2 shadow hover:bg-white hidden sm:inline-flex"
      >
        ›
      </button>

      {/* scroller */}
      <div
        ref={scroller}
        className="flex gap-3 overflow-x-auto pb-3 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none]"
        // hide scrollbar (Firefox/Chromium)
        style={{ scrollbarWidth: "none" }}
      >
        {/* hide scrollbar (WebKit) */}
        <style>{`.hidebar::-webkit-scrollbar{display:none}`}</style>

        {items.map((p) => (
          <Link
            key={p.id}
            to={`/products/${p.id}`}
            className="min-w-[160px] snap-start rounded-md border bg-white p-3 hover:shadow"
          >
            <div className="aspect-square bg-gray-100 rounded">
              <img
                src={p.image}
                alt={p.title}
                className="h-full w-full object-contain p-3"
                loading="lazy"
              />
            </div>
            <div className="mt-2 line-clamp-1 text-xs text-gray-800">
              {p.title}
            </div>
            <div className="mt-1 text-sm font-semibold">${p.price}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}