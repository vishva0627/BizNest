import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { businessService } from "../../services/businessService";
import { 
  Settings, 
  DollarSign, 
  Globe, 
  MessageSquare, 
  ShieldAlert, 
  Save, 
  Check 
} from "lucide-react";

export const SettingsPage = () => {
  const { business, updateCurrentBusiness } = useAuth();
  const { addToast } = useToast();

  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    currency: business?.currency || "USD",
    currencySymbol: business?.currencySymbol || "$",
    category: business?.category || "Fashion & Retail",
    whatsappNotification: true
  });

  const currencies = [
    { code: "USD", symbol: "$", label: "US Dollar ($)" },
    { code: "EUR", symbol: "€", label: "Euro (€)" },
    { code: "GBP", symbol: "£", label: "British Pound (£)" },
    { code: "CAD", symbol: "$", label: "Canadian Dollar ($)" },
    { code: "AUD", symbol: "$", label: "Australian Dollar ($)" },
    { code: "INR", symbol: "₹", label: "Indian Rupee (₹)" }
  ];

  const handleCurrencyChange = (code) => {
    const cur = currencies.find(c => c.code === code);
    if (cur) {
      setFormData(prev => ({ ...prev, currency: cur.code, currencySymbol: cur.symbol }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await businessService.updateBusiness(business.id, {
        currency: formData.currency,
        currencySymbol: formData.currencySymbol,
        category: formData.category
      });
      updateCurrentBusiness({
        currency: formData.currency,
        currencySymbol: formData.currencySymbol,
        category: formData.category
      });
      addToast("Settings updated successfully", "success");
    } catch (err) {
      addToast("Failed to save settings", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl animate-in fade-in duration-300">
      
      {/* Top Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Business Settings
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Configure regional currency, store category, and order dispatch settings.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Currency Card */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-blue-600" />
            <span>Store Currency & Display</span>
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Select Currency
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {currencies.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => handleCurrencyChange(c.code)}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all text-left flex items-center justify-between ${
                    formData.currency === c.code
                      ? "border-blue-600 bg-blue-50/50 text-blue-700 ring-2 ring-blue-500/10"
                      : "border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span>{c.label}</span>
                  {formData.currency === c.code && <Check className="w-4 h-4 text-blue-600" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* WhatsApp & Orders Preference */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-600" />
            <span>Order Notifications</span>
          </h3>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <div>
              <div className="text-xs font-bold text-slate-800">
                Direct WhatsApp Order Dispatch
              </div>
              <div className="text-[11px] text-slate-500">
                Pre-format customer cart items into an instant WhatsApp chat link on checkout
              </div>
            </div>
            <input
              type="checkbox"
              checked={formData.whatsappNotification}
              onChange={(e) => setFormData({ ...formData, whatsappNotification: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded"
            />
          </div>
        </div>

        {/* Save Button */}
        <div>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm shadow-blue-500/20 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving..." : "Save Settings"}</span>
          </button>
        </div>

        {/* Danger Zone */}
        <div className="p-6 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-3">
          <h3 className="font-bold text-sm text-rose-800 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            <span>Danger Zone</span>
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Deleting this business will remove its public storefront, catalog items, and analytics permanently.
          </p>
          <button
            type="button"
            onClick={() => alert("To protect your store, business deletion requires contacting BizNest support.")}
            className="px-4 py-2 rounded-xl text-xs font-bold text-rose-700 bg-white border border-rose-300 hover:bg-rose-50 transition-colors"
          >
            Request Store Deletion
          </button>
        </div>

      </form>

    </div>
  );
};
