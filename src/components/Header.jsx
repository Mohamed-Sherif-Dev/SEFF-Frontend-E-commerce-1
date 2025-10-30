import { Link } from "react-router-dom";

const DEFAULT_BG =
"https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=1600";

export default function Header({
  bg = DEFAULT_BG,
  title = "Welcome to our store",
  sub = "Welcome to our store! Discover a wide range of high-quality products at competitive prices, all in one place. Enjoy a seamless shopping experience with fast delivery and exclusive deals."
}) {
  return (
    <section
      className="relative min-h-[78vh] w-full overflow-hidden"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-purple-100/50 to-transparent" />
      <div className="absolute inset-0 bg-black/35" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="min-h-[78vh] grid place-items-center text-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              {title}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/90 leading-relaxed">
              {sub}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}