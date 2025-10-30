import { Link, useNavigate } from "react-router-dom";

const CATEGORIES = [
  {
    label: "Men's Clothing",
    value: "men's clothing",
    img: "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    label: "Women's Clothing",
    value: "women's clothing",
    img: "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    label: "Jewelery",
    value: "jewelery",
    img: "https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    label: "Electronics",
    value: "electronics",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop",
  },
];

export default function About() {
  const navigate = useNavigate();

  const goToCategory = (cat) => {
    // نودّي المستخدم لصفحة المنتجات مع بارامتر الكاتيجوري (اختياري)
    navigate(`/products?cat=${encodeURIComponent(cat)}`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      {/* عنوان وفقرة */}
      <h1 className="text-3xl font-bold text-gray-900 text-center">About Us</h1>
      <p className="mt-4 text-gray-600 text-center max-w-3xl mx-auto">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum facere
        doloremque veritatis odit similique sequi. Odit amet fuga nam quam quasi
        facilis sed doloremque saepe sit perspiciatis explicabo totam vero quas
        provident ipsam, veritatis nostrum velit quos recusandae amet iusto
        fugiat dolore laudantium.
      </p>

      {/* فاصل بسيط */}
      <div className="mt-8 h-[1px] bg-gray-200" />

      {/* عنوان الفئات */}
      <h2 className="mt-10 text-2xl font-bold text-gray-900 text-center">
        Our Products
      </h2>

      {/* كروت الفئات */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {CATEGORIES.map((c) => (
          <button
            key={c.value}
            onClick={() => goToCategory(c.value)}
            className="group text-left rounded-lg border bg-white overflow-hidden hover:shadow-md transition"
          >
            <div className="aspect-[4/3] w-full overflow-hidden">
              <img
                src={c.img}
                alt={c.label}
                className="h-full w-full object-cover group-hover:scale-105 transition"
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <h3 className="text-center font-semibold text-gray-900">
                {c.label}
              </h3>
            </div>
          </button>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-10 text-center">
        <Link
          to="/products"
          className="inline-block rounded-md bg-gray-900 px-5 py-2.5 text-white font-semibold hover:opacity-90"
        >
          Browse all products
        </Link>
      </div>
    </div>
  );
}