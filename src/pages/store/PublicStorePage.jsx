import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { businessService } from "../../services/businessService";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";
import { StoreHeader } from "../../components/store/StoreHeader";
import { StoreFooter } from "../../components/store/StoreFooter";
import { CartDrawer } from "../../components/store/CartDrawer";
import { AppointmentModal } from "../../components/store/AppointmentModal";
import { ProductDetailModal } from "../../components/store/ProductDetailModal";
import { EnquiryModal } from "../../components/store/EnquiryModal";
import { 
  Search, 
  Filter, 
  ShoppingBag, 
  Calendar, 
  Clock, 
  MapPin, 
  MessageSquare, 
  Sparkles, 
  Phone, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  Store,
  ChevronRight
} from "lucide-react";

export const PublicStorePage = () => {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const [business, setBusiness] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Modals
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState(null);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  useEffect(() => {
    loadStore();
  }, [slug]);

  const loadStore = async () => {
    setLoading(true);
    setError(null);
    try {
      const biz = await businessService.getBusinessBySlug(slug);
      if (!biz) {
        setError("Store not found");
        setLoading(false);
        return;
      }
      setBusiness(biz);

      const prods = await businessService.getProducts(biz.id);
      setProducts(prods);

      // Record visitor hit
      businessService.recordVisitorHit(biz.id);
    } catch (err) {
      console.error(err);
      setError("Failed to load store information");
    } finally {
      setLoading(false);
    }
  };

  const categories = ["All", ...new Set(products.map(p => p.category).filter(Boolean))];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const themeColor = business?.themeColor || "#2563eb";
  const currencySymbol = business?.currencySymbol || "$";

  const getWhatsAppFloatingUrl = () => {
    const phone = business?.contact?.whatsapp || business?.contact?.phone || "";
    const clean = phone.replace(/[^0-9]/g, "");
    const msg = `Hello! I'm browsing your storefront (${business?.name}) and would like to ask a question.`;
    return `https://wa.me/${clean}?text=${encodeURIComponent(msg)}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
        <span className="text-sm font-semibold text-slate-600">Loading storefront...</span>
      </div>
    );
  }

  if (error || !business) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900">Storefront Not Found</h2>
        <p className="mt-2 text-sm text-slate-500 max-w-sm">
          The requested store slug does not exist or has not been published yet.
        </p>

        <div className="mt-6 flex flex-col gap-2 w-full max-w-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
            Try our sample demo stores:
          </span>
          <Link
            to="/store/urban-vogue"
            className="p-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 hover:border-blue-500 transition-colors"
          >
            Urban Vogue (Fashion & Retail)
          </Link>
          <Link
            to="/store/artisan-brew"
            className="p-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 hover:border-amber-500 transition-colors"
          >
            Artisan Brew (Cafe & Bistro)
          </Link>
          <Link
            to="/store/luxe-glow"
            className="p-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 hover:border-pink-500 transition-colors"
          >
            Luxe Glow (Salon & Spa)
          </Link>
        </div>

        <Link
          to="/"
          className="mt-8 text-xs font-bold text-blue-600 hover:underline"
        >
          ← Return to BizNest Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">
      
      {/* Store Header */}
      <StoreHeader
        business={business}
        onOpenBooking={() => {
          setPreselectedService(null);
          setIsBookingOpen(true);
        }}
        onOpenEnquiry={() => setIsEnquiryOpen(true)}
      />

      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        {business.coverImage && (
          <div className="absolute inset-0">
            <img
              src={business.coverImage}
              alt={business.name}
              className="w-full h-full object-cover opacity-40 scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          </div>
        )}

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 flex flex-col justify-end min-h-[320px]">
          <div className="max-w-3xl">
            <span
              style={{ backgroundColor: themeColor }}
              className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider mb-3 shadow-sm"
            >
              {business.category}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {business.name}
            </h1>
            <p className="mt-3 text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
              {business.tagline || business.description}
            </p>

            {/* Quick Contact Line */}
            <div className="mt-6 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-300 font-medium">
              {business.contact?.address && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>{business.contact.address}</span>
                </div>
              )}
              {business.openingHours?.monday && (
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>Open Today: {business.openingHours.monday}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Store Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        
        {/* Search & Filter Bar */}
        <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search items, ingredients, or services..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setSelectedCategory(cat)}
                style={selectedCategory === cat ? { backgroundColor: themeColor, color: "#fff" } : {}}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? "shadow-sm shadow-blue-500/20"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* TEMPLATE 1: FASHION & RETAIL STORE                       */}
        {/* ======================================================== */}
        {business.template === "retail" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  Curated Collection
                </h2>
                <p className="text-xs text-slate-500">
                  Showing {filteredProducts.length} product(s)
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="group bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1"
                >
                  {/* Photo */}
                  <div 
                    onClick={() => setSelectedProduct(p)}
                    className="relative h-64 bg-slate-100 overflow-hidden cursor-pointer"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold bg-white/95 text-slate-800 backdrop-blur-xs">
                      {p.category}
                    </span>
                    {p.badge && (
                      <span
                        style={{ backgroundColor: themeColor }}
                        className="absolute top-3 right-3 px-2.5 py-1 rounded-md text-[10px] font-bold text-white shadow-xs"
                      >
                        {p.badge}
                      </span>
                    )}
                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-200">
                      <span className="px-3.5 py-2 rounded-xl bg-white/95 text-slate-900 text-xs font-bold shadow-lg flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Quick View</span>
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 
                          onClick={() => setSelectedProduct(p)}
                          className="font-bold text-base text-slate-900 leading-snug hover:text-blue-600 cursor-pointer transition-colors"
                        >
                          {p.name}
                        </h3>
                        <span className="font-extrabold text-base text-slate-900 shrink-0">
                          {currencySymbol}{p.price}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                        {p.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => setSelectedProduct(p)}
                        className="text-xs font-bold text-slate-600 hover:text-slate-900 py-2 px-3 rounded-lg hover:bg-slate-100 transition-colors"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => {
                          addToCart(p, 1, business.slug);
                          addToast(`Added "${p.name}" to bag`, "success");
                        }}
                        style={{ backgroundColor: themeColor }}
                        className="py-2.5 px-4 rounded-xl text-white font-bold text-xs flex items-center gap-1.5 shadow-sm hover:opacity-90 transition-opacity"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TEMPLATE 2: RESTAURANT & CAFE MENU                       */}
        {/* ======================================================== */}
        {business.template === "restaurant" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  Kitchen & Cafe Menu
                </h2>
                <p className="text-xs text-slate-500">
                  Farm-fresh delicacies, handcrafted daily.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow flex items-center gap-4"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover shrink-0 border border-slate-100"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
                        {p.name}
                      </h3>
                      <span 
                        style={{ color: themeColor }}
                        className="font-extrabold text-base shrink-0"
                      >
                        {currencySymbol}{p.price}
                      </span>
                    </div>

                    {p.badge && (
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 mt-1">
                        {p.badge}
                      </span>
                    )}

                    <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
                      {p.description}
                    </p>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-slate-400">
                        {p.category}
                      </span>
                      <button
                        onClick={() => {
                          addToCart(p, 1, business.slug);
                          addToast(`Added "${p.name}" to order`, "success");
                        }}
                        style={{ backgroundColor: themeColor }}
                        className="py-1.5 px-3 rounded-lg text-white font-bold text-xs flex items-center gap-1 shadow-xs hover:opacity-90 transition-opacity"
                      >
                        <span>+ Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TEMPLATE 3: SALON, SPA & WELLNESS SERVICES               */}
        {/* ======================================================== */}
        {business.template === "salon" && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  Services & Treatments
                </h2>
                <p className="text-xs text-slate-500">
                  Select a bespoke ritual and book your private appointment.
                </p>
              </div>

              <button
                onClick={() => {
                  setPreselectedService(null);
                  setIsBookingOpen(true);
                }}
                style={{ backgroundColor: themeColor }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white shadow-md hover:opacity-90 transition-all self-start sm:self-auto"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment Online</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-lg transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-bold text-base text-slate-900">
                        {p.name}
                      </h3>
                      <div className="text-right shrink-0">
                        <div 
                          style={{ color: themeColor }}
                          className="font-extrabold text-lg"
                        >
                          {currencySymbol}{p.price}
                        </div>
                      </div>
                    </div>

                    {p.duration && (
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-2">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{p.duration}</span>
                      </div>
                    )}

                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {p.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setSelectedProduct(p)}
                      className="text-xs font-bold text-slate-600 hover:text-slate-900"
                    >
                      View Details
                    </button>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          addToCart(p, 1, business.slug);
                          addToast(`Added to enquiry cart`, "success");
                        }}
                        className="py-2 px-3 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors"
                      >
                        Enquire
                      </button>

                      <button
                        onClick={() => {
                          setPreselectedService(p);
                          setIsBookingOpen(true);
                        }}
                        style={{ backgroundColor: themeColor }}
                        className="py-2 px-4 rounded-xl text-white font-bold text-xs flex items-center gap-1.5 shadow-xs hover:opacity-90 transition-opacity"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Book Slot</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* About & Location Highlight Section */}
        <section className="mt-20 p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-3">
            <span 
              style={{ color: themeColor }}
              className="text-xs font-bold uppercase tracking-wider block"
            >
              About {business.name}
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Dedicated to Craft, Community & Quality
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {business.description || business.tagline}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-4">
            <div>
              <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider mb-2">
                Visit Our Premises
              </h4>
              <p className="text-xs text-slate-600 flex items-start gap-1.5 leading-relaxed">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>{business.contact?.address || "Address available upon contact"}</span>
              </p>
            </div>

            <button
              onClick={() => setIsEnquiryOpen(true)}
              className="w-full py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Contact Us Today</span>
            </button>
          </div>
        </section>

      </main>

      {/* Floating WhatsApp Chat Button */}
      {business.contact?.whatsapp && (
        <a
          href={getWhatsAppFloatingUrl()}
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-500/30 hover:scale-105 transition-all flex items-center gap-2 group"
          title="Chat with us on WhatsApp"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 font-bold text-xs">
            Chat on WhatsApp
          </span>
        </a>
      )}

      {/* Shopping Bag Drawer */}
      <CartDrawer business={business} />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          business={business}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Appointment Booking Modal */}
      {isBookingOpen && (
        <AppointmentModal
          business={business}
          preselectedService={preselectedService}
          onClose={() => setIsBookingOpen(false)}
        />
      )}

      {/* Contact Enquiry Modal */}
      {isEnquiryOpen && (
        <EnquiryModal
          business={business}
          onClose={() => setIsEnquiryOpen(false)}
        />
      )}

      {/* Store Footer */}
      <StoreFooter
        business={business}
        onOpenEnquiry={() => setIsEnquiryOpen(true)}
      />

    </div>
  );
};
