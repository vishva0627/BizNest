import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Store, 
  ShoppingBag, 
  Coffee, 
  Scissors, 
  Smartphone, 
  TrendingUp, 
  ShieldCheck, 
  Calendar, 
  MessageSquare, 
  ExternalLink, 
  HelpCircle,
  Zap,
  Globe2,
  ChevronDown
} from "lucide-react";

export const LandingPage = () => {
  const [annualBilling, setAnnualBilling] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const templates = [
    {
      id: "retail",
      name: "Fashion & Retail Boutique",
      slug: "urban-vogue",
      description: "Optimized for apparel, jewelry, handcrafted accessories, and consumer goods.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
      accent: "from-blue-600 to-indigo-600",
      category: "Fashion & Retail",
      features: ["Product tag filters", "Product detail modals", "Enquiry cart checkout"]
    },
    {
      id: "restaurant",
      name: "Restaurant, Cafe & Bakery",
      slug: "artisan-brew",
      description: "Designed for coffee shops, bakeries, bistros, and cloud kitchens with menus.",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
      accent: "from-amber-600 to-orange-600",
      category: "Food & Beverage",
      features: ["Food category menu", "Chef's specials & badges", "WhatsApp order direct"]
    },
    {
      id: "salon",
      name: "Salon, Spa & Wellness",
      slug: "luxe-glow",
      description: "Tailored for hair salons, day spas, massage therapists, and fitness coaches.",
      image: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=800&q=80",
      accent: "from-pink-600 to-rose-600",
      category: "Health & Beauty",
      features: ["Service duration & pricing", "Interactive booking modal", "Staff member assignment"]
    }
  ];

  const categories = [
    { name: "Fashion & Boutiques", icon: ShoppingBag, count: "120+ templates", desc: "Streetwear, luxury apparel, footwear & accessories" },
    { name: "Restaurants & Cafes", icon: Coffee, count: "95+ templates", desc: "Bistros, coffee roasters, bakeries & food trucks" },
    { name: "Salons & Spas", icon: Scissors, count: "80+ templates", desc: "Barbers, beauty studios, estheticians & nail bars" },
    { name: "Electronics & Tech", icon: Smartphone, count: "60+ templates", desc: "Smartphones, audio gear, computing & repairs" },
    { name: "Fitness & Gyms", icon: TrendingUp, count: "45+ templates", desc: "Personal trainers, yoga studios & crossfit gyms" },
    { name: "Artisans & Crafts", icon: Sparkles, count: "70+ templates", desc: "Pottery, floral design, handmade jewelry & decor" }
  ];

  const features = [
    {
      title: "Unique Public Storefront URL",
      desc: "Every business gets its dedicated high-performance public link (e.g. biznest.com/store/your-business) with zero server setup.",
      icon: Globe2
    },
    {
      title: "Enquiry-Based Frictionless Cart",
      desc: "Customers assemble orders without complex checkout gates. Orders are dispatched straight to your dashboard and WhatsApp.",
      icon: ShoppingBag
    },
    {
      title: "Direct WhatsApp Ordering",
      desc: "Bridge the gap between your web store and customer chats. One-click sends pre-formatted orders straight to your WhatsApp business.",
      icon: MessageSquare
    },
    {
      title: "Built-in Appointment Scheduling",
      desc: "Allow clients to book salon slots, consultation calls, or dining tables with instant date and time slot validation.",
      icon: Calendar
    },
    {
      title: "Isolated Multi-Tenant Security",
      desc: "Architected with secure Cloud Firestore rules ensuring complete data segregation between businesses.",
      icon: ShieldCheck
    },
    {
      title: "Live Customization & Theming",
      desc: "Upload logos, tweak banner graphics, configure operating hours, and switch curated color schemes in real-time.",
      icon: Zap
    }
  ];

  const faqs = [
    {
      q: "Do I need any coding or web design experience?",
      a: "Not at all! BizNest is designed specifically for busy business owners. You can launch a fully functional store in under 5 minutes simply by selecting a template, filling in your business details, and adding your items."
    },
    {
      q: "How do customer orders work without a complicated payment gateway?",
      a: "BizNest uses an enquiry-based ordering flow. Customers browse your products or services, add items to their cart, and submit an enquiry order. The order is instantly saved in your Business Dashboard and can also be forwarded directly to your WhatsApp with a single tap!"
    },
    {
      q: "Can I customize the colors, logo, and store information?",
      a: "Yes! The Website Customizer allows you to pick your primary brand colors, upload high-resolution logos and cover banners, set contact information, and establish daily opening hours."
    },
    {
      q: "Can customers book appointments for services?",
      a: "Absolutely. For service businesses like salons, wellness centers, and clinics, the template includes an interactive booking modal where customers pick a service, preferred date, time slot, and specialist."
    },
    {
      q: "Is my business data secure and separated from others?",
      a: "Yes. BizNest operates on a strict multi-tenant architecture with Firestore security rules that isolate each store's products, enquiries, and orders so that only authorized business owners can access their private records."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32 bg-gradient-to-b from-blue-50/50 via-white to-slate-50">
        
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-100/80 text-blue-800 border border-blue-200/60 shadow-xs mb-8 animate-in fade-in zoom-in duration-500">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>One Digital Platform for Every Business</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.1]">
            Your Business Deserves Its Own{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
              Professional Website.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            BizNest empowers local shops, cafes, salons, and service providers to build, customize, and launch an elegant digital storefront with product catalogs, WhatsApp ordering, and appointment booking in minutes.
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-base text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#templates"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-base text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Live Demos</span>
            </a>
          </div>

          {/* Trust bullets */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-medium text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> No coding required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Free 14-day trial
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Instant WhatsApp ordering
            </span>
          </div>

        </div>
      </section>

      {/* Website Template Previews */}
      <section id="templates" className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-3">
              Tailored Storefronts
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Pre-built for Your Specific Industry
            </p>
            <p className="mt-4 text-slate-600 text-base">
              Choose from professionally designed, responsive templates configured out of the box with your industry's exact feature set.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {templates.map((tpl) => (
              <div 
                key={tpl.id}
                className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1"
              >
                {/* Image Banner */}
                <div className="relative h-56 overflow-hidden bg-slate-100">
                  <img
                    src={tpl.image}
                    alt={tpl.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-slate-800 backdrop-blur-xs">
                    {tpl.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {tpl.name}
                    </h3>
                    <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                      {tpl.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      {tpl.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <Link
                      to={`/store/${tpl.slug}`}
                      target="_blank"
                      className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-center text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Live Preview</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      to={`/register`}
                      className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-center text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                    >
                      Use Template
                    </Link>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-3">
              Simple 3-Step Setup
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              From Sign-up to Selling in Under 5 Minutes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            {/* Step 1 */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs relative">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 font-extrabold text-xl flex items-center justify-center mb-6">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Register & Pick Template
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Sign up with your business name and select a tailored template matching retail, dining, or salon services.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs relative">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 font-extrabold text-xl flex items-center justify-center mb-6">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Add Products & Brand Details
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Upload your business logo, custom banner, contact phone, and showcase your products with photos and prices.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs relative">
              <div className="w-12 h-12 rounded-xl bg-violet-100 text-violet-600 font-extrabold text-xl flex items-center justify-center mb-6">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Share Link & Accept Orders
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Publish your custom link to social media and Google Maps. Watch customer enquiries, orders, and bookings stream in.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Business Categories */}
      <section id="categories" className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-3">
              Built For Every Industry
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              One Platform, Endless Possibilities
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div 
                  key={idx}
                  className="p-6 rounded-2xl border border-slate-200/90 bg-white hover:border-blue-400 hover:shadow-md transition-all duration-200 flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base mb-1">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-2">
                      {cat.desc}
                    </p>
                    <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                      {cat.count}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Platform Features Grid */}
      <section id="features" className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-blue-400 tracking-widest uppercase mb-3">
              Enterprise Power, Local Simplicity
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Everything Your Business Needs to Thrive Online
            </p>
            <p className="mt-4 text-slate-400 text-base">
              Built with SaaS-grade stability, lightning-fast CDN delivery, and full mobile optimization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                  className="p-8 rounded-2xl bg-slate-800/60 border border-slate-700/80 hover:border-slate-600 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-3">
              Simple Transparent Pricing
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Choose the Plan That Fits Your Growth
            </p>
            <p className="mt-4 text-slate-600 text-base">
              Start with a 14-day free trial. No credit card required.
            </p>

            {/* Toggle */}
            <div className="mt-8 inline-flex items-center gap-3 p-1 rounded-xl bg-slate-100 text-xs font-semibold">
              <button
                onClick={() => setAnnualBilling(false)}
                className={`px-4 py-2 rounded-lg transition-colors ${!annualBilling ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setAnnualBilling(true)}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${annualBilling ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
              >
                <span>Annual Billing</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">Save 20%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            
            {/* Starter */}
            <div className="p-8 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between shadow-xs">
              <div>
                <h3 className="font-bold text-xl text-slate-900">Starter</h3>
                <p className="text-xs text-slate-500 mt-1">Perfect for solo business owners launching their first site.</p>
                <div className="mt-6 mb-6">
                  <span className="text-4xl font-extrabold text-slate-900">$0</span>
                  <span className="text-slate-500 text-sm ml-1">/ forever free</span>
                </div>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600" /> Up to 15 products or services</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600" /> Standard public store URL</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600" /> Enquiry cart & WhatsApp contact</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600" /> Basic visitor analytics</li>
                </ul>
              </div>
              <Link
                to="/register"
                className="mt-8 w-full py-3 rounded-xl text-center text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Get Started
              </Link>
            </div>

            {/* Growth */}
            <div className="p-8 rounded-2xl border-2 border-blue-600 bg-white flex flex-col justify-between shadow-xl relative scale-105 z-10">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white tracking-wide uppercase">
                Most Popular
              </div>
              <div>
                <h3 className="font-bold text-xl text-slate-900">Growth</h3>
                <p className="text-xs text-slate-500 mt-1">For growing local shops, restaurants, and salons.</p>
                <div className="mt-6 mb-6">
                  <span className="text-4xl font-extrabold text-slate-900">
                    {annualBilling ? "$15" : "$19"}
                  </span>
                  <span className="text-slate-500 text-sm ml-1">/ month</span>
                </div>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600" /> Unlimited products & services</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600" /> Full website customization & colors</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600" /> Interactive appointment calendar</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600" /> WhatsApp order automation</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600" /> Priority email & chat support</li>
                </ul>
              </div>
              <Link
                to="/register"
                className="mt-8 w-full py-3 rounded-xl text-center text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all"
              >
                Start 14-Day Free Trial
              </Link>
            </div>

            {/* Pro */}
            <div className="p-8 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between shadow-xs">
              <div>
                <h3 className="font-bold text-xl text-slate-900">Pro Enterprise</h3>
                <p className="text-xs text-slate-500 mt-1">For multi-location businesses and high-volume chains.</p>
                <div className="mt-6 mb-6">
                  <span className="text-4xl font-extrabold text-slate-900">
                    {annualBilling ? "$39" : "$49"}
                  </span>
                  <span className="text-slate-500 text-sm ml-1">/ month</span>
                </div>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600" /> Custom domain mapping (yourstore.com)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600" /> Multiple staff accounts & roles</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600" /> Advanced conversion analytics & export</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600" /> Dedicated account manager</li>
                </ul>
              </div>
              <Link
                to="/register"
                className="mt-8 w-full py-3 rounded-xl text-center text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Contact Sales
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-3">
              Trusted by Hundreds of Owners
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Real Businesses, Tangible Results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
              <p className="text-sm text-slate-600 leading-relaxed italic">
                "BizNest took our boutique from an Instagram DM headache to a streamlined catalog where customers place direct orders. Our sales doubled in the first month!"
              </p>
              <div className="mt-6 flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80"
                  alt="Sarah Lin"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-bold text-sm text-slate-900">Sarah Lin</div>
                  <div className="text-xs text-slate-500">Founder, Mode & Co.</div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
              <p className="text-sm text-slate-600 leading-relaxed italic">
                "Our cafe brunch line used to be chaotic. Having a clean menu that regulars can browse on their phones before arriving has sped up counter ordering drastically."
              </p>
              <div className="mt-6 flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80"
                  alt="Marco Valenti"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-bold text-sm text-slate-900">Marco Valenti</div>
                  <div className="text-xs text-slate-500">Owner, Caffe Piccolo</div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
              <p className="text-sm text-slate-600 leading-relaxed italic">
                "The appointment booking integration is phenomenal. Clients choose their hair stylist and time slot without having to phone during busy salon hours."
              </p>
              <div className="mt-6 flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&h=120&q=80"
                  alt="Tasha Vance"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-bold text-sm text-slate-900">Tasha Vance</div>
                  <div className="text-xs text-slate-500">Director, Glow Salon Studio</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-3">
              Have Questions?
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div 
                key={i}
                className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full px-6 py-4 text-left font-bold text-slate-800 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <span className="text-base">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${openFaq === i ? 'rotate-180 text-blue-600' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Final Call to Action Banner */}
      <section className="py-20 bg-gradient-to-tr from-blue-700 via-indigo-700 to-violet-800 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Ready to give your business the website it deserves?
          </h2>
          <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
            Join hundreds of local entrepreneurs building their modern online presence with BizNest today.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-base text-blue-900 bg-white hover:bg-blue-50 shadow-lg transition-all"
            >
              Create Your Business Store
            </Link>
            <Link
              to="/store/urban-vogue"
              target="_blank"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-base text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <span>View Live Demo</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
