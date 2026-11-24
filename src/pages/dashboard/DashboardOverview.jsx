import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { businessService } from "../../services/businessService";
import { 
  Users, 
  Package, 
  ShoppingBag, 
  MessageSquare, 
  DollarSign, 
  TrendingUp, 
  ExternalLink, 
  ArrowUpRight, 
  Plus, 
  Palette, 
  Globe, 
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles
} from "lucide-react";

export const DashboardOverview = () => {
  const { business } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    productsCount: 0,
    ordersCount: 0,
    enquiriesCount: 0,
    appointmentsCount: 0,
    totalRevenue: 0,
    visitors: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    if (!business?.id) return;
    loadDashboardData();
  }, [business?.id]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [prods, ords, apts, enqs, anl] = await Promise.all([
        businessService.getProducts(business.id),
        businessService.getOrders(business.id),
        businessService.getAppointments(business.id),
        businessService.getEnquiries(business.id),
        businessService.getAnalytics(business.id)
      ]);

      const rev = ords.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

      setStats({
        productsCount: prods.length,
        ordersCount: ords.length,
        enquiriesCount: enqs.length,
        appointmentsCount: apts.length,
        totalRevenue: rev,
        visitors: anl?.totalVisitors || 120
      });

      setRecentOrders(ords.slice(0, 5));
      setRecentEnquiries(enqs.slice(0, 4));
      setAnalytics(anl);
    } catch (err) {
      console.error("Dashboard overview load error:", err);
    } finally {
      setLoading(false);
    }
  };

  const currencySymbol = business?.currencySymbol || "$";

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Welcome Banner */}
      <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white shadow-xl shadow-blue-500/10 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-xs mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Store Dashboard Ready</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {business?.name || "Business"}
          </h2>
          <p className="mt-2 text-sm text-blue-100 leading-relaxed">
            Your public storefront is online and accepting customer enquiries. Here is a snapshot of your store's latest activity.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-3">
          <Link
            to={`/store/${business?.slug || "urban-vogue"}`}
            target="_blank"
            className="px-4 py-2.5 rounded-xl font-bold text-xs text-blue-900 bg-white hover:bg-blue-50 transition-colors shadow-sm flex items-center gap-1.5"
          >
            <span>View Live Store</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <Link
            to="/dashboard/products"
            className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-white/20 hover:bg-white/30 backdrop-blur-xs border border-white/20 transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Item</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Visitors */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Visitors
            </span>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">
              {stats.visitors.toLocaleString()}
            </div>
            <div className="text-[11px] font-medium text-emerald-600 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>+18.4% this month</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Total Products */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Active Catalog
            </span>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">
              {stats.productsCount} items
            </div>
            <div className="text-[11px] font-medium text-slate-500 mt-1">
              Available to customers
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
        </div>

        {/* Total Orders */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Customer Orders
            </span>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">
              {stats.ordersCount}
            </div>
            <div className="text-[11px] font-medium text-blue-600 mt-1">
              {currencySymbol}{stats.totalRevenue.toLocaleString()} volume
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        {/* Total Enquiries & Appointments */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Enquiries & Bookings
            </span>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">
              {stats.enquiriesCount + stats.appointmentsCount}
            </div>
            <div className="text-[11px] font-medium text-amber-600 mt-1">
              {stats.appointmentsCount} bookings scheduled
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Main Grid: Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Orders (2 Columns) */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-base text-slate-900">Recent Customer Orders</h3>
                <p className="text-xs text-slate-500">Orders placed through your digital storefront</p>
              </div>
              <Link
                to="/dashboard/orders"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                View all ({recentOrders.length}) →
              </Link>
            </div>

            <div className="mt-4 divide-y divide-slate-100">
              {recentOrders.length === 0 ? (
                <div className="text-center py-8 text-sm text-slate-400">
                  No orders placed yet. Share your store link with customers!
                </div>
              ) : (
                recentOrders.map((ord) => (
                  <div key={ord.id} className="py-3.5 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="font-semibold text-sm text-slate-800 flex items-center gap-2">
                        <span>{ord.customerName}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          ord.status === "Completed"
                            ? "bg-emerald-50 text-emerald-700"
                            : ord.status === "In Progress"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-amber-50 text-amber-700"
                        }`}>
                          {ord.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 truncate mt-0.5">
                        {ord.items?.map(i => `${i.quantity}x ${i.name}`).join(", ") || "Order items"}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-bold text-sm text-slate-900">
                        {currencySymbol}{ord.totalAmount}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {new Date(ord.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Monthly Trend Bar preview */}
          {analytics?.monthlyActivity && (
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-bold text-base text-slate-900">Monthly Visitors & Engagement</h3>
                  <p className="text-xs text-slate-500">Traffic performance across the last 6 months</p>
                </div>
                <Link to="/dashboard/analytics" className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                  Detailed Report →
                </Link>
              </div>

              <div className="grid grid-cols-6 gap-3 items-end h-36 pt-4 border-b border-slate-100">
                {analytics.monthlyActivity.map((m, idx) => {
                  const maxVisitors = 7000;
                  const heightPercent = Math.min(100, Math.round((m.visitors / maxVisitors) * 100));
                  return (
                    <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end group">
                      <div className="text-[10px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        {m.visitors}
                      </div>
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className="w-full max-w-[36px] bg-blue-500 group-hover:bg-blue-600 rounded-t-lg transition-all"
                      />
                      <span className="text-xs font-semibold text-slate-500 mt-1">{m.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Sidebar: Quick Actions & Enquiries (1 Column) */}
        <div className="space-y-6">
          
          {/* Quick Action Shortcuts */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
            <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider mb-4">
              Quick Shortcuts
            </h3>
            <div className="flex flex-col gap-2">
              <Link
                to="/dashboard/products"
                className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 transition-all text-xs font-semibold text-slate-800"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Plus className="w-4 h-4" />
                  </div>
                  <span>Add Product / Service</span>
                </div>
                <span>→</span>
              </Link>

              <Link
                to="/dashboard/builder"
                className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/40 transition-all text-xs font-semibold text-slate-800"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                    <Palette className="w-4 h-4" />
                  </div>
                  <span>Customize Store Design</span>
                </div>
                <span>→</span>
              </Link>

              <Link
                to="/dashboard/website"
                className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/40 transition-all text-xs font-semibold text-slate-800"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <Globe className="w-4 h-4" />
                  </div>
                  <span>Share Store URL & QR</span>
                </div>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Recent Inquiries */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900">Customer Inquiries</h3>
              <Link to="/dashboard/enquiries" className="text-xs font-semibold text-blue-600">
                All →
              </Link>
            </div>

            <div className="mt-3 divide-y divide-slate-100">
              {recentEnquiries.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-400">
                  No new enquiries received.
                </div>
              ) : (
                recentEnquiries.map((enq) => (
                  <div key={enq.id} className="py-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800">{enq.senderName}</span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(enq.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium truncate mt-0.5">
                      {enq.subject || enq.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
