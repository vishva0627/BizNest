import React from "react";
import { Link } from "react-router-dom";
import { Store, Phone, Mail, MapPin, Clock, MessageSquare, ExternalLink } from "lucide-react";

export const StoreFooter = ({ business, onOpenEnquiry }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-12 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Business Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              {business?.logo ? (
                <img
                  src={business.logo}
                  alt={business.name}
                  className="w-10 h-10 rounded-xl object-cover border border-slate-700"
                />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                  <Store className="w-5 h-5" />
                </div>
              )}
              <span className="font-extrabold text-xl text-white tracking-tight">
                {business?.name}
              </span>
            </div>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              {business?.description || business?.tagline}
            </p>

            {business?.contact?.address && (
              <div className="flex items-start gap-2 text-xs text-slate-400 pt-2">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>{business.contact.address}</span>
              </div>
            )}
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold text-white tracking-wider uppercase mb-4">
              Contact & Inquiries
            </h4>
            <ul className="space-y-2.5 text-xs">
              {business?.contact?.phone && (
                <li>
                  <a href={`tel:${business.contact.phone}`} className="hover:text-white transition-colors flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{business.contact.phone}</span>
                  </a>
                </li>
              )}
              {business?.contact?.email && (
                <li>
                  <a href={`mailto:${business.contact.email}`} className="hover:text-white transition-colors flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5" />
                    <span>{business.contact.email}</span>
                  </a>
                </li>
              )}
              {onOpenEnquiry && (
                <li className="pt-2">
                  <button
                    onClick={onOpenEnquiry}
                    className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Send Message to Store</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Operating Hours */}
          <div>
            <h4 className="text-xs font-bold text-white tracking-wider uppercase mb-4">
              Hours of Operation
            </h4>
            {business?.openingHours ? (
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span>Mon - Fri</span>
                  <span className="text-slate-300">{business.openingHours.monday || "Open"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="text-slate-300">{business.openingHours.saturday || "Open"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-slate-300">{business.openingHours.sunday || "Closed"}</span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500">Contact store for operating schedule.</p>
            )}
          </div>

        </div>

        {/* Powered by BizNest attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} {business?.name}. All rights reserved.</p>
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-2 hover:text-slate-300 transition-colors"
          >
            <span>Powered by</span>
            <span className="font-extrabold text-white flex items-center gap-1">
              <Store className="w-3.5 h-3.5 text-blue-500" /> BizNest
            </span>
            <span className="text-[10px] text-slate-500 bg-slate-800 px-2 py-0.5 rounded">
              Build your website →
            </span>
          </Link>
        </div>

      </div>
    </footer>
  );
};
