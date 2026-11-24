import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { 
  Store, 
  ShoppingBag, 
  Phone, 
  Clock, 
  Calendar, 
  MessageSquare, 
  Menu, 
  X,
  ExternalLink
} from "lucide-react";

export const StoreHeader = ({ business, onOpenBooking, onOpenEnquiry }) => {
  const { totalItems, setIsCartOpen } = useCart();
  const [hoursModalOpen, setHoursModalOpen] = useState(false);

  const themeColor = business?.themeColor || "#2563eb";

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          {business?.logo ? (
            <img
              src={business.logo}
              alt={business.name}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover border border-slate-200 shrink-0"
            />
          ) : (
            <div 
              style={{ backgroundColor: themeColor }}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-md"
            >
              <Store className="w-6 h-6" />
            </div>
          )}

          <div>
            <h1 className="font-extrabold text-base sm:text-xl text-slate-900 leading-tight">
              {business?.name || "Store"}
            </h1>
            <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate max-w-[200px] sm:max-w-md">
              {business?.tagline || business?.category}
            </p>
          </div>
        </div>

        {/* Quick Contact & Navigation */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Opening Hours Button */}
          {business?.openingHours && (
            <button
              onClick={() => setHoursModalOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Hours</span>
            </button>
          )}

          {/* Contact / Enquiry */}
          <button
            onClick={onOpenEnquiry}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
            <span>Enquiry</span>
          </button>

          {/* Book Appointment (Salons / Services) */}
          {business?.template === "salon" && onOpenBooking && (
            <button
              onClick={onOpenBooking}
              style={{ backgroundColor: themeColor }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white shadow-sm hover:opacity-95 transition-opacity"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </button>
          )}

          {/* Phone Call */}
          {business?.contact?.phone && (
            <a
              href={`tel:${business.contact.phone}`}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors hidden sm:block"
              title="Call Store"
            >
              <Phone className="w-4 h-4" />
            </a>
          )}

          {/* Cart Bag Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors text-slate-800 flex items-center gap-2"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span
                style={{ backgroundColor: themeColor }}
                className="px-1.5 py-0.5 rounded-full text-[10px] font-extrabold text-white leading-none"
              >
                {totalItems}
              </span>
            )}
          </button>

        </div>

      </div>

      {/* Opening Hours Modal */}
      {hoursModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Weekly Opening Hours</span>
              </h3>
              <button onClick={() => setHoursModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {Object.entries(business.openingHours).map(([day, hrs]) => (
                <div key={day} className="py-2 flex items-center justify-between">
                  <span className="capitalize font-semibold text-slate-700">{day}</span>
                  <span className="text-slate-600 font-mono">{hrs}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setHoursModalOpen(false)}
              className="mt-5 w-full py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
