import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "الاسم مطلوب";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "بريد إلكتروني غير صالح";
    if (form.phone && !/^[0-9+\-\s]{7,}$/.test(form.phone)) e.phone = "رقم غير صالح";
    if (!form.message.trim()) e.message = "اكتب رسالتك";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    // هنا تقدر تبعته لـ API لاحقًا
    setSent(true);
    setForm({ name: "", email: "", phone: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
        <p className="mt-2 text-gray-600">راسلنا لأي استفسار — هنرد عليك في أسرع وقت.</p>
      </div>

      {/* Grid */}
      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        {/* Info + Map */}
        <div className="space-y-6">
          <div className="rounded-xl border bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900">معلومات التواصل</h2>
            <ul className="mt-4 space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-3">
                <svg className="h-5 w-5 text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
                <span>15 El-Tahrir St, Cairo, Egypt</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="h-5 w-5 text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22 16.92V21a1 1 0 0 1-1.1 1 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 3 3.1 1 1 0 0 1 4 2h4.09A1 1 0 0 1 9.1 2.72l1.2 2.89a1 1 0 0 1-.27 1.16L8.9 8.1a16 16 0 0 0 6 6l1.33-1.13a1 1 0 0 1 1.16-.27l2.89 1.2a1 1 0 0 1 .72 1.02z"/></svg>
                <span>+20 100 000 0000</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="h-5 w-5 text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 4h16v16H4z"/><path d="m22 6-10 7L2 6"/></svg>
                <span>support@ecommerce.com</span>
              </li>
            </ul>

            {/* Social */}
            <div className="mt-4 flex items-center gap-3">
              <a href="#" className="rounded-full border p-2 hover:bg-gray-100" aria-label="Facebook">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2.7v-2.9h2.7V9.8c0-2.7 1.6-4.2 4-4.2 1.2 0 2.4.2 2.4.2v2.6h-1.3c-1.3 0-1.7.8-1.7 1.6v1.9h2.9L16 14.9h-2v7A10 10 0 0 0 22 12z"/></svg>
              </a>
              <a href="#" className="rounded-full border p-2 hover:bg-gray-100" aria-label="Instagram">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a5 5 0 1 0 .001 10.001A5 5 0 0 0 12 7zm6.5-1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/></svg>
              </a>
              <a href="#" className="rounded-full border p-2 hover:bg-gray-100" aria-label="Twitter">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M22 5.8c-.7.3-1.5.6-2.3.7.8-.5 1.4-1.3 1.7-2.2-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.7 11.7 0 0 1 3.1 4.9a4.1 4.1 0 0 0 1.3 5.5c-.6 0-1.2-.2-1.7-.5a4.1 4.1 0 0 0 3.3 4.1c-.5.1-1 .2-1.5.1.4 1.3 1.6 2.2 3.1 2.2A8.3 8.3 0 0 1 2 19.6a11.7 11.7 0 0 0 6.3 1.9c7.6 0 11.8-6.3 11.8-11.8v-.5A8.3 8.3 0 0 0 22 5.8z"/></svg>
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-xl overflow-hidden border">
            <iframe
              title="Store location"
              src="https://www.google.com/maps?q=Cairo%20Egypt&output=embed"
              className="h-64 w-full"
              loading="lazy"
            />
          </div>
        </div>

        {/* Form */}
        <div className="rounded-xl border bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">أرسل رسالة</h2>

          {sent && (
            <p className="mt-3 rounded-md bg-green-50 p-3 text-sm text-green-700">
              تم إرسال رسالتك بنجاح. سنعاود التواصل قريبًا.
            </p>
          )}

          <form onSubmit={onSubmit} className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">الاسم</label>
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                className="mt-1 w-full border p-3 rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
              />
              {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  className="mt-1 w-full rounded-md border p-2 border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                />
                {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">رقم الهاتف (اختياري)</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  className="mt-1 w-full border p-2  rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                />
                {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">الرسالة</label>
              <textarea
                name="message"
                rows="5"
                value={form.message}
                onChange={onChange}
                className="mt-1 w-full border p-2 rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
              />
              {errors.message && <p className="text-xs text-red-600 mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto rounded-md bg-gray-900 px-6 py-2.5 text-white font-semibold hover:opacity-90"
            >
              إرسال
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}