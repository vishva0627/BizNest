import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";
import { 
  X, 
  ShoppingBag, 
  Plus, 
  Minus, 
  CheckCircle2, 
  Clock, 
  Tag, 
  Share2 
} from "lucide-react";

export const ProductDetailModal = ({ product, business, onClose }) => {
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const currencySymbol = business?.currencySymbol || "$";
  const themeColor = business?.themeColor || "#2563eb";

  const handleAdd = () => {
    addToCart(product, quantity, business.slug);
    addToast(`Added ${quantity}x "${product.name}" to cart!`, "success");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 flex flex-col md:flex-row gap-6">
        
        {/* Product Image */}
        <div className="w-full md:w-1/2 h-64 md:h-auto rounded-xl overflow-hidden bg-slate-100 shrink-0 relative">
          <img
            src={product.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.badge && (
            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-600 text-white shadow-xs">
              {product.badge}
            </span>
          )}
        </div>

        {/* Product Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {product.category}
              </span>
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-1 leading-snug">
              {product.name}
            </h3>

            <div className="text-2xl font-extrabold text-blue-600 mb-3">
              {currencySymbol}{product.price}
            </div>

            {product.duration && (
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3 font-semibold">
                <Clock className="w-3.5 h-3.5" />
                <span>Service Duration: {product.duration}</span>
              </div>
            )}

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              {product.description || "Crafted with the highest attention to quality and customer satisfaction."}
            </p>

            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 mb-6">
                {product.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-slate-500 hover:bg-slate-100"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-xs font-bold text-slate-800">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-slate-500 hover:bg-slate-100"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={handleAdd}
                style={{ backgroundColor: themeColor }}
                className="flex-1 py-3 px-4 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:opacity-90 transition-opacity"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Order Enquiry</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
