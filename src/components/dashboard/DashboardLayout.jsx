import React, { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { businessService } from "../../services/businessService";
import { 
  LayoutDashboard, 
  Globe, 
  Package, 
  ShoppingBag, 
  Calendar, 
  MessageSquare, 
  BarChart3, 
  Palette, 
  Settings, 
  LogOut, 
  ExternalLink, 
  Store, 
  Menu, 
  X,
  ChevronDown,
  Sparkles,
  CheckCircle2,
  Bell
} from "lucide-react";

export const DashboardLayout = () => {
  const { user, business, switchBusiness, logout, isFirebaseConfigured } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [storeDropdown, setStoreDropdown] = useState(false);

  const demoStores = [
    { id: "biz_urban_vogue", name: "Urban Vogue Apparel", slug: "urban-vogue", type: "Retail" },
    { id: "biz_artisan_brew", name: "Artisan Brew & Bistro", slug: "artisan-brew", type: "Cafe" },
    { id: "biz_luxe_glow", name: "Luxe Glow Wellness & Salon", slug: "luxe-glow", type: "Salon" }
  ];

  const navItems = [
    { to: "/dashboard", label: "Overview", icon: LayoutDashboard, end: true },
    { to: "/dashboard/website", label: "My Website", icon: Globe },
    { to: "/dashboard/products", label: "Products & Services", icon: Package },
    { to: "/dashboard/orders", label: "Orders", icon: ShoppingBag },
    { to: "/dashboard/appointments", label: "Appointments", icon: Calendar },
    { to: "/dashboard/enquiries", label: "Customer Enquiries", icon: MessageSquare },
    { to: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
    { to: "/dashboard/builder", label: "Website Customization", icon: Palette },
    { to: "/dashboard/settings", label: "Business Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
            <Store className="w-4 h-4" />
          </div>
          <span className="font-bold text-slate-900">{business?.name || "BizNest"}</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 h-screen w-64 bg-white border-r border-slate-200 z-40 flex flex-col justify-between transition-transform duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-5 flex flex-col h-full overflow-y-auto">
          
          {/* Logo & Platform Label */}
          <Link to="/" className="flex items-center gap-2.5 pb-5 border-b border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900 block leading-tight">
                BizNest
              </span>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Merchant Hub
              </span>
            </div>
          </Link>

          {/* Active Business Switcher */}
          <div className="mt-4 mb-4 relative">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Active Store
            </label>
            <button
              onClick={() => setStoreDropdown(!storeDropdown)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50/80 hover:bg-slate-100/80 transition-colors flex items-center justify-between text-left"
            >
              <div className="truncate pr-1">
                <div className="font-bold text-xs text-slate-800 truncate">
                  {business?.name || "My Store"}
                </div>
                <div className="text-[11px] text-slate-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  <span>/{business?.slug || "store"}</span>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
            </button>

            {/* Store Switcher Dropdown */}
            {storeDropdown && (
              <div className="absolute left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl p-1 z-50 animate-in fade-in zoom-in-95">
                <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase">
                  Switch Active Business
                </div>
                {demoStores.map((s) => (
                  <button
                    key={s.id}
                    onClick={async () => {
                      const fresh = await businessService.getBusinessById(s.id);
                      if (fresh) switchBusiness(fresh);
                      setStoreDropdown(false);
                    }}
                    className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                      business?.id === s.id ? "bg-blue-50 text-blue-700 font-semibold" : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span className="truncate">{s.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 uppercase font-medium">
                      {s.type}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Nav List */}
          <nav className="space-y-1 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Public Store Direct Link */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <Link
              to={`/store/${business?.slug || "urban-vogue"}`}
              target="_blank"
              className="flex items-center justify-between w-full px-3 py-2 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
            >
              <span className="flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View Public Store</span>
              </span>
              <span className="text-[10px] bg-blue-200/60 px-1.5 py-0.5 rounded">Live</span>
            </Link>

            {/* User Profile & Logout */}
            <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100">
              <div className="flex items-center gap-2.5 truncate">
                <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0">
                  {user?.displayName ? user.displayName[0].toUpperCase() : "O"}
                </div>
                <div className="truncate">
                  <div className="text-xs font-bold text-slate-800 truncate">
                    {user?.displayName || "Store Owner"}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {user?.email || "owner@biznest.com"}
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                title="Sign Out"
                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top bar on desktop */}
        <div className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold text-slate-900">
              {business?.name || "Business Dashboard"}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Published & Active
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to={`/store/${business?.slug || "urban-vogue"}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <span>Visit Storefront</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </Link>
            <Link
              to="/dashboard/builder"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs"
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Customize Website</span>
            </Link>
          </div>
        </div>

        {/* Dynamic Nested Routes */}
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </div>

      </main>

    </div>
  );
};
