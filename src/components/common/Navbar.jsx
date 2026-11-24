import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { 
  Store, 
  ChevronDown, 
  LayoutDashboard, 
  LogOut, 
  Sparkles, 
  Menu, 
  X,
  ExternalLink,
  ShieldCheck
} from "lucide-react";

export const Navbar = () => {
  const { user, business, logout, isFirebaseConfigured } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoMenuOpen, setDemoMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
            <Store className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
              BizNest
            </span>
            <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase -mt-1">
              Store Platform
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="/#templates" className="hover:text-slate-900 transition-colors">
            Templates
          </a>
          <a href="/#how-it-works" className="hover:text-slate-900 transition-colors">
            How It Works
          </a>
          <a href="/#features" className="hover:text-slate-900 transition-colors">
            Features
          </a>
          <a href="/#categories" className="hover:text-slate-900 transition-colors">
            Categories
          </a>
          <a href="/#pricing" className="hover:text-slate-900 transition-colors">
            Pricing
          </a>

          {/* Live Demos Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDemoMenuOpen(!demoMenuOpen)}
              onBlur={() => setTimeout(() => setDemoMenuOpen(false), 200)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Explore Demos</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {demoMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Live Business Stores
                </div>
                <Link
                  to="/store/urban-vogue"
                  target="_blank"
                  className="flex items-center justify-between px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <div>
                    <div className="font-semibold text-slate-800">Urban Vogue</div>
                    <div className="text-xs text-slate-500">Fashion & Streetwear</div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </Link>
                <Link
                  to="/store/artisan-brew"
                  target="_blank"
                  className="flex items-center justify-between px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <div>
                    <div className="font-semibold text-slate-800">Artisan Brew</div>
                    <div className="text-xs text-slate-500">Cafe & Bistro</div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </Link>
                <Link
                  to="/store/luxe-glow"
                  target="_blank"
                  className="flex items-center justify-between px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <div>
                    <div className="font-semibold text-slate-800">Luxe Glow</div>
                    <div className="text-xs text-slate-500">Salon & Spa</div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800 shadow-sm transition-all"
              >
                <LayoutDashboard className="w-4 h-4 text-blue-400" />
                <span>Dashboard ({business?.name ? business.name.slice(0, 16) : "Store"})</span>
              </Link>
              <button
                onClick={logout}
                title="Sign Out"
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-500/25 transition-all hover:shadow"
              >
                Get Started Free
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-2">
          <a
            href="/#templates"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-700 hover:text-blue-600"
          >
            Templates
          </a>
          <a
            href="/#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-700 hover:text-blue-600"
          >
            How It Works
          </a>
          <a
            href="/#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-700 hover:text-blue-600"
          >
            Features
          </a>
          <a
            href="/#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-700 hover:text-blue-600"
          >
            Pricing
          </a>

          <div className="pt-2 border-t border-slate-100">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Preview Demo Stores
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs text-center font-medium">
              <Link
                to="/store/urban-vogue"
                className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                Urban Vogue
              </Link>
              <Link
                to="/store/artisan-brew"
                className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                Artisan Brew
              </Link>
              <Link
                to="/store/luxe-glow"
                className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                Luxe Glow
              </Link>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl text-sm font-semibold bg-slate-900 text-white"
                >
                  Go to Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-2 text-sm text-slate-500 hover:text-rose-600"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600"
                >
                  Get Started Free
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
