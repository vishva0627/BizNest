import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { Store, Lock, Mail, ArrowRight, Sparkles, AlertCircle } from "lucide-react";

export const LoginPage = () => {
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      addToast("Successfully logged into business dashboard!", "success");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to log in. Please check your credentials.");
      addToast("Login failed. Check your email & password.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = async (demoEmail) => {
    setError("");
    setLoading(true);
    try {
      await login(demoEmail, "password123");
      addToast(`Logged in as demo store owner!`, "success");
      navigate("/dashboard");
    } catch (err) {
      setError("Demo login error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <Store className="w-6 h-6" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-slate-900">
            BizNest
          </span>
        </Link>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Sign in to your business dashboard
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Manage products, customize your storefront, and track orders.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-200">
          
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Business Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="owner@yourstore.com"
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick 1-Click Demo Login Shortcuts */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Or 1-Click Demo Account Login</span>
            </div>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin("alex@urbanvogue.com")}
                className="w-full text-left px-3.5 py-2.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all text-xs flex items-center justify-between"
              >
                <div>
                  <span className="font-bold text-slate-800">Urban Vogue Apparel</span>
                  <span className="text-slate-500 block text-[11px]">Retail & Fashion Store</span>
                </div>
                <span className="text-blue-600 font-semibold text-xs">Enter →</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin("elena@artisanbrew.com")}
                className="w-full text-left px-3.5 py-2.5 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 transition-all text-xs flex items-center justify-between"
              >
                <div>
                  <span className="font-bold text-slate-800">Artisan Brew Cafe</span>
                  <span className="text-slate-500 block text-[11px]">Restaurant & Bistro</span>
                </div>
                <span className="text-amber-600 font-semibold text-xs">Enter →</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin("camilla@luxeglow.com")}
                className="w-full text-left px-3.5 py-2.5 rounded-xl border border-slate-200 hover:border-pink-400 hover:bg-pink-50/50 transition-all text-xs flex items-center justify-between"
              >
                <div>
                  <span className="font-bold text-slate-800">Luxe Glow Spa & Salon</span>
                  <span className="text-slate-500 block text-[11px]">Salon & Wellness Services</span>
                </div>
                <span className="text-pink-600 font-semibold text-xs">Enter →</span>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-slate-500">
            Don't have a business on BizNest?{" "}
            <Link to="/register" className="font-bold text-blue-600 hover:text-blue-700">
              Create your store free
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};
