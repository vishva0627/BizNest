import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { businessService } from "../../services/businessService";
import { uploadImageFile } from "../../services/storageService";
import { 
  Palette, 
  Upload, 
  Check, 
  Globe, 
  ExternalLink, 
  Eye, 
  Sparkles, 
  Save, 
  Store, 
  Clock, 
  MapPin, 
  Phone, 
  Mail,
  ShoppingBag,
  Coffee,
  Scissors
} from "lucide-react";

export const WebsiteBuilderPage = () => {
  const { business, updateCurrentBusiness } = useAuth();
  const { addToast } = useToast();

  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("branding"); // "branding" | "hours" | "contact" | "preview"

  // Form State
  const [formData, setFormData] = useState({
    name: business?.name || "",
    tagline: business?.tagline || "",
    description: business?.description || "",
    template: business?.template || "retail",
    themeColor: business?.themeColor || "#2563eb",
    logo: business?.logo || "",
    coverImage: business?.coverImage || "",
    contactPhone: business?.contact?.phone || "",
    contactWhatsapp: business?.contact?.whatsapp || "",
    contactEmail: business?.contact?.email || "",
    contactAddress: business?.contact?.address || "",
    openingHours: business?.openingHours || {
      monday: "9:00 AM - 6:00 PM",
      tuesday: "9:00 AM - 6:00 PM",
      wednesday: "9:00 AM - 6:00 PM",
      thursday: "9:00 AM - 7:00 PM",
      friday: "9:00 AM - 7:00 PM",
      saturday: "10:00 AM - 5:00 PM",
      sunday: "Closed"
    }
  });

  const templates = [
    {
      id: "retail",
      name: "Fashion & Retail",
      icon: ShoppingBag,
      desc: "E-commerce grid, filterable tags, quick add-to-cart & enquiry drawer."
    },
    {
      id: "restaurant",
      name: "Restaurant & Cafe",
      icon: Coffee,
      desc: "Menu categories, chef badges, item descriptions & table/takeout enquiries."
    },
    {
      id: "salon",
      name: "Salon & Wellness",
      icon: Scissors,
      desc: "Service catalog with durations, pricing & interactive appointment booking."
    }
  ];

  const curatedColors = [
    { name: "Ocean Blue", hex: "#2563eb" },
    { name: "Warm Amber", hex: "#b45309" },
    { name: "Luxe Rose", hex: "#be185d" },
    { name: "Emerald Grove", hex: "#059669" },
    { name: "Deep Violet", hex: "#7c3aed" },
    { name: "Slate Midnight", hex: "#0f172a" }
  ];

  const handleFileUpload = async (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      addToast(`Uploading ${field}...`, "info", 1500);
      const url = await uploadImageFile(file, `branding/${business?.id || "temp"}`);
      setFormData(prev => ({ ...prev, [field]: url }));
      addToast(`${field === "logo" ? "Logo" : "Banner"} uploaded!`, "success");
    } catch (err) {
      addToast("Upload failed", "error");
    }
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      const updates = {
        name: formData.name,
        tagline: formData.tagline,
        description: formData.description,
        template: formData.template,
        themeColor: formData.themeColor,
        accentColor: formData.themeColor,
        logo: formData.logo,
        coverImage: formData.coverImage,
        contact: {
          phone: formData.contactPhone,
          whatsapp: formData.contactWhatsapp,
          email: formData.contactEmail,
          address: formData.contactAddress,
          city: business?.contact?.city || "",
          country: business?.contact?.country || ""
        },
        openingHours: formData.openingHours
      };

      await businessService.updateBusiness(business.id, updates);
      updateCurrentBusiness(updates);
      addToast("Website changes saved and published live!", "success");
    } catch (err) {
      console.error(err);
      addToast("Failed to save customization", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Website Customization & Builder
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Pick templates, adjust brand colors, upload logos, configure operating hours, and preview live.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to={`/store/${business?.slug || "urban-vogue"}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-xs"
          >
            <Eye className="w-4 h-4" />
            <span>Open Public Store</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm shadow-blue-500/20"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Publishing..." : "Save & Publish"}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { id: "branding", label: "Template & Branding" },
          { id: "hours", label: "Opening Hours" },
          { id: "contact", label: "Contact & Location" },
          { id: "preview", label: "Live Split Preview" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Branding & Template */}
      {activeTab === "branding" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            
            {/* Step 1: Template Selection */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
              <h3 className="font-bold text-base text-slate-900 mb-1">
                1. Select Website Template
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Tailors layouts and customer workflows specifically to your trade.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {templates.map((tpl) => {
                  const Icon = tpl.icon;
                  const isSelected = formData.template === tpl.id;
                  return (
                    <div
                      key={tpl.id}
                      onClick={() => setFormData({ ...formData, template: tpl.id })}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? "border-blue-600 bg-blue-50/30 shadow-md ring-2 ring-blue-500/20"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <div>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                          isSelected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold text-sm text-slate-900 mb-1">{tpl.name}</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">{tpl.desc}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className={`font-bold ${isSelected ? "text-blue-600" : "text-slate-400"}`}>
                          {isSelected ? "Active Template" : "Select"}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Basic Business Information */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
              <h3 className="font-bold text-base text-slate-900 mb-1">
                2. Business Name & Story
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Business Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Tagline / Header Headline
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="e.g. Handcrafted sourdough & single-origin coffee"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  About Story / Business Description
                </label>
                <textarea
                  rows="4"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Tell your customers about your craft, origin, and commitment to quality..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none leading-relaxed"
                />
              </div>
            </div>

            {/* Step 3: Color Theme Selection */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
              <h3 className="font-bold text-base text-slate-900 mb-1">
                3. Brand Palette & Colors
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Select a cohesive theme accent applied across buttons, badges, and headers.
              </p>

              <div className="flex flex-wrap items-center gap-3 mb-4">
                {curatedColors.map((c) => (
                  <button
                    key={c.hex}
                    type="button"
                    onClick={() => setFormData({ ...formData, themeColor: c.hex })}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all text-xs font-semibold ${
                      formData.themeColor === c.hex
                        ? "border-slate-900 bg-slate-50 shadow-sm ring-2 ring-slate-900/10"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <span
                      style={{ backgroundColor: c.hex }}
                      className="w-4 h-4 rounded-full border border-black/10 inline-block shrink-0"
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                <span className="text-xs font-semibold text-slate-700">Custom Hex Code:</span>
                <input
                  type="color"
                  value={formData.themeColor}
                  onChange={(e) => setFormData({ ...formData, themeColor: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer border border-slate-300"
                />
                <input
                  type="text"
                  value={formData.themeColor}
                  onChange={(e) => setFormData({ ...formData, themeColor: e.target.value })}
                  className="w-28 px-2.5 py-1.5 rounded-lg border border-slate-300 font-mono text-xs uppercase"
                />
              </div>
            </div>

          </div>

          {/* Right Column: Imagery (Logo & Banner) */}
          <div className="space-y-6">
            
            {/* Logo Upload */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
              <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider mb-2">
                Business Logo
              </h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl border border-slate-200 overflow-hidden bg-slate-100 flex items-center justify-center shrink-0">
                  {formData.logo ? (
                    <img src={formData.logo} alt="Logo" className="w-full h-full object-cover" />
                  ) : (
                    <Store className="w-8 h-8 text-slate-400" />
                  )}
                </div>
                <div className="text-xs text-slate-500">
                  Square aspect ratio (e.g. 400x400) recommended.
                </div>
              </div>

              <div className="space-y-2">
                <input
                  type="text"
                  value={formData.logo}
                  onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  placeholder="https://image-url..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                />
                <label className="w-full py-2 px-3 rounded-xl border border-slate-300 bg-slate-50 hover:bg-slate-100 cursor-pointer text-xs font-semibold text-slate-700 flex items-center justify-center gap-2">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Logo File</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, "logo")}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Cover Banner Image */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
              <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider mb-2">
                Hero Banner Cover
              </h3>
              <div className="h-28 rounded-xl border border-slate-200 overflow-hidden bg-slate-100 mb-4">
                {formData.coverImage ? (
                  <img src={formData.coverImage} alt="Banner" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
                    No cover banner set
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <input
                  type="text"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  placeholder="https://image-url..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                />
                <label className="w-full py-2 px-3 rounded-xl border border-slate-300 bg-slate-50 hover:bg-slate-100 cursor-pointer text-xs font-semibold text-slate-700 flex items-center justify-center gap-2">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Cover Banner</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, "coverImage")}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Tab: Opening Hours */}
      {activeTab === "hours" && (
        <div className="max-w-2xl bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-base text-slate-900">Weekly Operating Hours</h3>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            Shown on your public storefront and in appointment booking hours.
          </p>

          <div className="divide-y divide-slate-100">
            {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => (
              <div key={day} className="py-3 flex items-center justify-between gap-4">
                <span className="capitalize font-bold text-xs text-slate-700 w-28">
                  {day}
                </span>
                <input
                  type="text"
                  value={formData.openingHours[day] || ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    openingHours: { ...formData.openingHours, [day]: e.target.value }
                  })}
                  placeholder="e.g. 9:00 AM - 6:00 PM or Closed"
                  className="flex-1 max-w-sm px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={handleSave}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs"
            >
              Save Operating Hours
            </button>
          </div>
        </div>
      )}

      {/* Tab: Contact & Location */}
      {activeTab === "contact" && (
        <div className="max-w-2xl bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-slate-900 mb-1">
            Store Contact & Location Information
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Customers use these channels to call you, send WhatsApp orders, and navigate to your physical premises.
          </p>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Physical Address / Location
            </label>
            <input
              type="text"
              value={formData.contactAddress}
              onChange={(e) => setFormData({ ...formData, contactAddress: e.target.value })}
              placeholder="e.g. 482 Broadway, SoHo, New York, NY 10013"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                WhatsApp Phone (For Instant Orders)
              </label>
              <input
                type="text"
                value={formData.contactWhatsapp}
                onChange={(e) => setFormData({ ...formData, contactWhatsapp: e.target.value })}
                placeholder="e.g. +1 (555) 234-8901"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Store Phone Number
              </label>
              <input
                type="text"
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                placeholder="e.g. +1 (555) 234-8901"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Customer Support Email
            </label>
            <input
              type="email"
              value={formData.contactEmail}
              onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
              placeholder="e.g. hello@yourbrand.com"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={handleSave}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs"
            >
              Save Contact Info
            </button>
          </div>
        </div>
      )}

      {/* Tab: Live Split Preview */}
      {activeTab === "preview" && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <h3 className="font-bold text-sm text-slate-900">
              Live Responsive Preview
            </h3>
            <a
              href={`/store/${business?.slug || "urban-vogue"}`}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>Full Screen Window</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="w-full h-[650px] rounded-xl overflow-hidden border border-slate-200 bg-slate-50 shadow-inner">
            <iframe
              src={`/store/${business?.slug || "urban-vogue"}`}
              title="Builder Preview"
              className="w-full h-full border-none"
            />
          </div>
        </div>
      )}

    </div>
  );
};
