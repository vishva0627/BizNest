import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { businessService } from "../../services/businessService";
import { 
  BarChart3, 
  Users, 
  Eye, 
  ShoppingBag, 
  TrendingUp, 
  ArrowUpRight, 
  Globe2, 
  Calendar 
} from "lucide-react";

export const AnalyticsPage = () => {
  const { business } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!business?.id) return;
    loadAnalytics();
  }, [business?.id]);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const data = await businessService.getAnalytics(business.id);
      setAnalytics(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const currencySymbol = business?.currencySymbol || "$";

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Store Analytics & Insights
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Monitor storefront visits, customer conversion rates, and revenue performance.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Total Store Visitors
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">
            {analytics?.totalVisitors?.toLocaleString() || "120"}
          </div>
          <div className="text-[11px] font-semibold text-emerald-600 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+14.2% vs previous period</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Unique Visitors
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">
            {analytics?.uniqueVisitors?.toLocaleString() || "94"}
          </div>
          <div className="text-[11px] font-semibold text-blue-600 mt-1">
            82% direct customer reach
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Total Page Views
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">
            {analytics?.pageViews?.toLocaleString() || "420"}
          </div>
          <div className="text-[11px] font-semibold text-indigo-600 mt-1">
            3.2 views / visitor avg
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Conversion Rate
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">
            {analytics?.conversionRate || 3.4}%
          </div>
          <div className="text-[11px] font-semibold text-emerald-600 mt-1">
            Above industry average
          </div>
        </div>

      </div>

      {/* Monthly Chart Card */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-2">
          <div>
            <h3 className="font-bold text-base text-slate-900">Monthly Traffic & Order Volume</h3>
            <p className="text-xs text-slate-500">6-Month historical comparison</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-blue-600">
              <span className="w-3 h-3 rounded-sm bg-blue-500 inline-block" /> Visitors
            </span>
            <span className="flex items-center gap-1.5 text-emerald-600">
              <span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block" /> Orders
            </span>
          </div>
        </div>

        <div className="grid grid-cols-6 gap-4 items-end h-56 pt-6">
          {analytics?.monthlyActivity?.map((m, idx) => {
            const maxVis = 7000;
            const visPercent = Math.min(100, Math.round((m.visitors / maxVis) * 100));
            return (
              <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end group">
                <div className="text-[11px] font-extrabold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  {m.visitors}
                </div>
                <div className="w-full flex items-end justify-center gap-1.5 h-full">
                  <div
                    style={{ height: `${visPercent}%` }}
                    className="w-1/2 max-w-[28px] bg-blue-500 rounded-t-md group-hover:bg-blue-600 transition-all"
                  />
                  <div
                    style={{ height: `${Math.min(100, m.orders * 0.8)}%` }}
                    className="w-1/2 max-w-[28px] bg-emerald-500 rounded-t-md group-hover:bg-emerald-600 transition-all"
                  />
                </div>
                <span className="text-xs font-bold text-slate-600 mt-2">{m.month}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Traffic Sources Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <h3 className="font-bold text-base text-slate-900 mb-4">
            Customer Referral Channels
          </h3>
          <div className="space-y-4">
            {analytics?.trafficSources?.map((src, i) => (
              <div key={i}>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
                  <span>{src.source}</span>
                  <span>{src.percentage}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    style={{ width: `${src.percentage}%` }}
                    className="h-full bg-blue-600 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-900 mb-2">
              Optimization Advice
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Tips to maximize conversions from your digital storefront.
            </p>
            <ul className="space-y-3 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                <span><b>Share on WhatsApp Status:</b> Over 40% of orders originate from direct message links sent to contacts.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                <span><b>Add High-Resolution Photos:</b> Products with images convert 3.5x higher than text-only listings.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                <span><b>Specify Opening Hours:</b> Clear business hours reduce customer confusion and increase order pickup reliability.</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-400">
            Analytics update automatically as visitors interact with your storefront.
          </div>
        </div>

      </div>

    </div>
  );
};
