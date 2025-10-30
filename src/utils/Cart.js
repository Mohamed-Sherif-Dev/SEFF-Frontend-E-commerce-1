const KEY = "attar-cart";

// حوّل أي عنصر للشكل الموحد {id,title,price,image,qty}
const normalizeItem = (item = {}) => {
  const qty = Number(item.qty ?? item.quantity ?? 1);
  return {
    id: item.id,
    title: item.title,
    price: item.price,
    image: item.image,
    qty: qty > 0 ? qty : 1,
  };
};

export const getCart = () => {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY)) || [];
    if (!Array.isArray(raw)) return [];
    // نضمن وجود qty حتى لو كانت مخزنة باسم quantity
    return raw.map((x) => ({
      ...x,
      qty: Number(x.qty ?? x.quantity ?? 1),
    }));
  } catch {
    return [];
  }
};

export const setCart = (cart) => {
  localStorage.setItem(KEY, JSON.stringify(cart));
  // اسم حدث موحّد يسمعه Navbar
  window.dispatchEvent(new Event("cart-changed"));
};

export const addToCart = (item) => {
  const cart = getCart();
  const norm = normalizeItem(item);
  const i = cart.findIndex((p) => p.id === norm.id);
  if (i >= 0) cart[i].qty += norm.qty;
  else cart.push(norm);
  setCart(cart);
};

export const updateQty = (id, qty) => {
  const cart = getCart();
  const i = cart.findIndex((p) => p.id === id);
  if (i >= 0) {
    cart[i].qty = Math.max(1, Number(qty) || 1);
    setCart(cart);
  }
};

export const removeFromCart = (id) => {
  setCart(getCart().filter((p) => p.id !== id));
};

export const countCart = () =>
  getCart().reduce((s, p) => s + (Number(p.qty) || 0), 0);

export const clearCart = () => setCart([]);