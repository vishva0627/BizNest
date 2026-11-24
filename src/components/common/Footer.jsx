import React from "react";
import { Link } from "react-router-dom";
import { Store, Heart, ShieldCheck, Zap, Globe } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Store className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                BizNest
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              One Digital Platform for Every Business. Empowering local stores, cafes, salons, and service providers with beautiful storefronts and automated order management.
            </p>
            <div className="flex items-center gap-4 pt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Multi-Tenant Isolation
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" /> Instant Setup
              </span>
            </div>
          </div>

          {/* Solutions Column */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Templates
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/store/urban-vogue" target="_blank" className="hover:text-white transition-colors">
                  Fashion & Boutiques
                </Link>
              </li>
              <li>
                <Link to="/store/artisan-brew" target="_blank" className="hover:text-white transition-colors">
                  Cafes & Restaurants
                </Link>
              </li>
              <li>
                <Link to="/store/luxe-glow" target="_blank" className="hover:text-white transition-colors">
                  Salons & Wellness
                </Link>
              </li>
              <li>
                <a href="#categories" className="hover:text-white transition-colors">
                  Gyms & Fitness
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-white transition-colors">
                  Electronics & Tech
                </a>
              </li>
            </ul>
          </div>

          {/* Platform Column */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Website Builder
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Product Catalog
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Enquiry Orders
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Appointment Booking
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Transparent Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Get Started Column */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Account
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/register" className="hover:text-white transition-colors">
                  Create Business Store
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition-colors">
                  Owner Dashboard Login
                </Link>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} BizNest Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Security Overview</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
