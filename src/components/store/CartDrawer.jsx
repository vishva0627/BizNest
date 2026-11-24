import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";
import { businessService } from "../../services/businessService";
import confetti from "canvas-confetti";
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  MessageSquare, 
  CheckCircle2, 
  ArrowRight,
  Send,
  Phone,
  Mail,
  User,
  MapPin
} from "lucide-react";

export const CartDrawer = ({ business }) => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    totalItems, 
    totalPrice 
  } = useCart();
  const { addToast } = useToast();

  const [checkoutStep, setCheckoutStep] = useState("cart"); // "cart" | "form" | "confirmed"
  const [submitting, setSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
    deliveryMethod: "Pickup in Store",
    notes: ""
  });

  if (!isCartOpen) return null;

  const currencySymbol = business?.currencySymbol || "$";
  const themeColor = business?.themeColor || "#2563eb";

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.phone) {
      addToast("Please provide your name and phone number", "error");
      return;
    }

    setSubmitting(true);
    try {
      const orderData = {
        customerName: customerInfo.name,
        customerPhone: customerInfo.phone,
        customerEmail: customerInfo.email,
        deliveryMethod: customerInfo.deliveryMethod,
        notes: customerInfo.notes,
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: totalPrice
      };

      const created = await businessService.createOrder(business.id, orderData);
      setPlacedOrder(created);
      setCheckoutStep("confirmed");
      clearCart();

      // Confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {}

      addToast("Order enquiry submitted to store!", "success");
    } catch (err) {
      console.error(err);
      addToast("Failed to place order enquiry", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const getWhatsAppOrderUrl = () => {
    const phone = business?.contact?.whatsapp || business?.contact?.phone || "";
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    const itemsText = placedOrder?.items?.map(i => `• ${i.quantity}x ${i.name} (${currencySymbol}${i.price})`).join("\n") || "";
    const msg = `*New Order Enquiry for ${business?.name}*\n` +
      `*Order ID:* ${placedOrder?.id}\n` +
      `*Customer:* ${placedOrder?.customerName}\n` +
      `*Phone:* ${placedOrder?.customerPhone}\n` +
      `*Preference:* ${placedOrder?.deliveryMethod}\n` +
      `*Items:*\n${itemsText}\n` +
      `*Total:* ${currencySymbol}${placedOrder?.totalAmount}\n` +
      (placedOrder?.notes ? `*Notes:* ${placedOrder.notes}` : "");

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-slate-800" />
              <h2 className="font-extrabold text-base text-slate-900">
                {checkoutStep === "cart" ? `Shopping Bag (${totalItems})` : checkoutStep === "form" ? "Order Details" : "Order Placed!"}
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5">
            {checkoutStep === "cart" && (
              <>
                {cart.length === 0 ? (
                  <div className="py-16 text-center">
                    <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-4">
                      <ShoppingBag className="w-7 h-7" />
                    </div>
                    <h3 className="font-bold text-base text-slate-800">Your bag is empty</h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                      Explore our products and services and add items to place an order enquiry.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 divide-y divide-slate-100">
                    {cart.map((item) => (
                      <div key={item.id} className="pt-4 first:pt-0 flex items-center gap-3">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded-xl object-cover border border-slate-100 shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-xs text-slate-900 truncate">
                            {item.name}
                          </h4>
                          <div className="text-xs font-extrabold text-slate-900 mt-0.5">
                            {currencySymbol}{item.price}
                          </div>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 text-slate-500 hover:bg-slate-100"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2 text-xs font-bold text-slate-800">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 text-slate-500 hover:bg-slate-100"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-slate-400 hover:text-rose-600 p-1 rounded-md"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {checkoutStep === "form" && (
              <form id="orderForm" onSubmit={handleCheckoutSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      placeholder="e.g. Liam Walker"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      placeholder="e.g. +1 (555) 000-0000"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                      placeholder="e.g. liam@example.com"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Fulfillment Preference
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Pickup in Store", "Home Delivery"].map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setCustomerInfo({ ...customerInfo, deliveryMethod: method })}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                          customerInfo.deliveryMethod === method
                            ? "border-slate-900 bg-slate-900 text-white"
                            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Order Notes or Special Requests
                  </label>
                  <textarea
                    rows="2"
                    value={customerInfo.notes}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                    placeholder="Sizes, food allergies, delivery timing preferences..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </form>
            )}

            {checkoutStep === "confirmed" && placedOrder && (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-extrabold text-xl text-slate-900">
                  Order Enquiry Received!
                </h3>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  Thank you, <span className="font-semibold">{placedOrder.customerName}</span>. Your order reference is <span className="font-mono font-bold text-slate-800">{placedOrder.id}</span>.
                </p>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1 mt-4">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>Total Amount</span>
                    <span>{currencySymbol}{placedOrder.totalAmount}</span>
                  </div>
                  <div className="text-slate-500">Method: {placedOrder.deliveryMethod}</div>
                </div>

                {/* WhatsApp One-Click Action */}
                <div className="pt-4">
                  <a
                    href={getWhatsAppOrderUrl()}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send Order Directly to WhatsApp</span>
                  </a>
                  <p className="text-[11px] text-slate-400 mt-2">
                    Clicking opens WhatsApp with your pre-formatted order summary.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-5 border-t border-slate-100 bg-slate-50/50">
            {checkoutStep === "cart" && cart.length > 0 && (
              <div>
                <div className="flex items-center justify-between text-sm mb-4">
                  <span className="font-semibold text-slate-600">Subtotal</span>
                  <span className="font-extrabold text-lg text-slate-900">
                    {currencySymbol}{totalPrice.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => setCheckoutStep("form")}
                  style={{ backgroundColor: themeColor }}
                  className="w-full py-3 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all hover:opacity-90"
                >
                  <span>Proceed to Order Enquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {checkoutStep === "form" && (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setCheckoutStep("cart")}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100"
                >
                  Back
                </button>
                <button
                  type="submit"
                  form="orderForm"
                  disabled={submitting}
                  style={{ backgroundColor: themeColor }}
                  className="flex-1 py-2.5 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all hover:opacity-90 disabled:opacity-50"
                >
                  {submitting ? "Placing..." : "Submit Order Enquiry"}
                </button>
              </div>
            )}

            {checkoutStep === "confirmed" && (
              <button
                onClick={() => {
                  setCheckoutStep("cart");
                  setIsCartOpen(false);
                }}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-200 hover:bg-slate-300 transition-colors"
              >
                Close & Return to Store
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
