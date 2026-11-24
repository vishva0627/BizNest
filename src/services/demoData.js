// Demo seed data for multi-tenant businesses
export const INITIAL_BUSINESSES = [
  {
    id: "biz_urban_vogue",
    ownerId: "demo_owner_1",
    ownerName: "Alexander Wright",
    ownerEmail: "alex@urbanvogue.com",
    name: "Urban Vogue Apparel",
    slug: "urban-vogue",
    category: "Fashion & Retail",
    template: "retail", // "retail" | "restaurant" | "salon"
    tagline: "Curated contemporary streetwear & timeless minimalist essentials.",
    description: "Urban Vogue Apparel brings together precision tailoring, sustainable organic cottons, and high-fashion streetwear aesthetics designed for modern metropolitan lifestyles.",
    logo: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=200&h=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&h=600&q=80",
    themeColor: "#2563eb",
    accentColor: "#3b82f6",
    fontFamily: "Inter",
    contact: {
      phone: "+1 (555) 234-8901",
      whatsapp: "+15552348901",
      email: "hello@urbanvogue.com",
      address: "482 Broadway, SoHo, New York, NY 10013",
      city: "New York",
      country: "United States"
    },
    openingHours: {
      monday: "10:00 AM - 8:00 PM",
      tuesday: "10:00 AM - 8:00 PM",
      wednesday: "10:00 AM - 8:00 PM",
      thursday: "10:00 AM - 9:00 PM",
      friday: "10:00 AM - 9:00 PM",
      saturday: "11:00 AM - 9:00 PM",
      sunday: "12:00 PM - 6:00 PM"
    },
    socialLinks: {
      instagram: "https://instagram.com/urbanvogue",
      twitter: "https://twitter.com/urbanvogue",
      facebook: "https://facebook.com/urbanvogue"
    },
    currency: "USD",
    currencySymbol: "$",
    published: true,
    createdAt: "2026-01-10T08:00:00Z"
  },
  {
    id: "biz_artisan_brew",
    ownerId: "demo_owner_2",
    ownerName: "Elena Rostova",
    ownerEmail: "elena@artisanbrew.com",
    name: "Artisan Brew & Bistro",
    slug: "artisan-brew",
    category: "Restaurant & Cafe",
    template: "restaurant",
    tagline: "Specialty single-origin roasts, artisan sourdough & farm-fresh brunch.",
    description: "Nestled in the cultural heart of the city, Artisan Brew serves micro-lot pourovers, sourdough bakery items fermented for 48 hours, and locally sourced seasonal bistro delicacies.",
    logo: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=200&h=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1600&h=600&q=80",
    themeColor: "#b45309",
    accentColor: "#d97706",
    fontFamily: "Plus Jakarta Sans",
    contact: {
      phone: "+1 (555) 872-4321",
      whatsapp: "+15558724321",
      email: "orders@artisanbrew.com",
      address: "120 Pine Street, Downtown, Seattle, WA 98101",
      city: "Seattle",
      country: "United States"
    },
    openingHours: {
      monday: "7:00 AM - 7:00 PM",
      tuesday: "7:00 AM - 7:00 PM",
      wednesday: "7:00 AM - 7:00 PM",
      thursday: "7:00 AM - 9:00 PM",
      friday: "7:00 AM - 10:00 PM",
      saturday: "8:00 AM - 10:00 PM",
      sunday: "8:00 AM - 6:00 PM"
    },
    socialLinks: {
      instagram: "https://instagram.com/artisanbrewcafe",
      facebook: "https://facebook.com/artisanbrewcafe"
    },
    currency: "USD",
    currencySymbol: "$",
    published: true,
    createdAt: "2026-01-15T09:30:00Z"
  },
  {
    id: "biz_luxe_glow",
    ownerId: "demo_owner_3",
    ownerName: "Camilla Vance",
    ownerEmail: "camilla@luxeglow.com",
    name: "Luxe Glow Wellness & Salon",
    slug: "luxe-glow",
    category: "Salon & Wellness",
    template: "salon",
    tagline: "Bespoke hair design, organic clinical skincare & rejuvenating body rituals.",
    description: "An urban sanctuary dedicated to personalized hair styling, non-invasive botanical facial therapies, and restorative holistic spa treatments in an ultra-serene atmosphere.",
    logo: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=200&h=200&q=80",
    coverImage: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=1600&h=600&q=80",
    themeColor: "#be185d",
    accentColor: "#ec4899",
    fontFamily: "Plus Jakarta Sans",
    contact: {
      phone: "+1 (555) 901-4477",
      whatsapp: "+15559014477",
      email: "concierge@luxeglow.com",
      address: "740 Ocean Avenue, Santa Monica, CA 90401",
      city: "Santa Monica",
      country: "United States"
    },
    openingHours: {
      monday: "Closed",
      tuesday: "9:00 AM - 7:00 PM",
      wednesday: "9:00 AM - 7:00 PM",
      thursday: "9:00 AM - 8:00 PM",
      friday: "9:00 AM - 8:00 PM",
      saturday: "9:00 AM - 6:00 PM",
      sunday: "10:00 AM - 5:00 PM"
    },
    socialLinks: {
      instagram: "https://instagram.com/luxeglowspa",
      twitter: "https://twitter.com/luxeglow"
    },
    currency: "USD",
    currencySymbol: "$",
    published: true,
    createdAt: "2026-02-01T10:00:00Z"
  }
];

export const INITIAL_PRODUCTS = [
  // Urban Vogue Apparel Products
  {
    id: "prod_uv_1",
    businessId: "biz_urban_vogue",
    name: "Heavyweight Boxy Graphic Tee",
    category: "T-Shirts",
    price: 48,
    isAvailable: true,
    description: "Crafted from 280 GSM combed organic cotton with dropped shoulders and a modern architectural silhouette.",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
    badge: "Bestseller",
    tags: ["Streetwear", "100% Cotton", "Oversized"]
  },
  {
    id: "prod_uv_2",
    businessId: "biz_urban_vogue",
    name: "Japanese Selvedge Denim Trousers",
    category: "Denim",
    price: 135,
    isAvailable: true,
    description: "13.5oz vintage shuttle-loomed denim with copper rivets, natural indigo dye, and a relaxed straight cut.",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80",
    badge: "Premium",
    tags: ["Selvedge", "Indigo", "Denim"]
  },
  {
    id: "prod_uv_3",
    businessId: "biz_urban_vogue",
    name: "Minimalist Double-Breasted Trench",
    category: "Outerwear",
    price: 210,
    isAvailable: true,
    description: "Water-resistant matte gabardine fabric with tortoiseshell horn buttons, storm flap, and adjustable belt.",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80",
    badge: "New Arrival",
    tags: ["Coat", "Tailored", "Waterproof"]
  },
  {
    id: "prod_uv_4",
    businessId: "biz_urban_vogue",
    name: "Full-Grain Italian Leather Crossbody",
    category: "Accessories",
    price: 89,
    isAvailable: true,
    description: "Vegetable-tanned calfskin leather with brushed matte steel hardware and interior phone compartments.",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
    badge: "",
    tags: ["Leather", "Everyday Carry", "Accessories"]
  },
  {
    id: "prod_uv_5",
    businessId: "biz_urban_vogue",
    name: "Chunky Knit Merino Wool Crewneck",
    category: "Knitwear",
    price: 110,
    isAvailable: true,
    description: "Extra-fine Australian merino wool with thermal ribbing, exceptionally soft against the skin.",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80",
    badge: "",
    tags: ["Merino", "Winter", "Warm"]
  },

  // Artisan Brew Cafe Items
  {
    id: "prod_ab_1",
    businessId: "biz_artisan_brew",
    name: "Artisan Truffle Brioche Toast",
    category: "Brunch",
    price: 16.5,
    isAvailable: true,
    description: "House-baked golden brioche with smashed Hass avocado, poached organic farm egg, and black summer truffle oil.",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
    badge: "Chef's Special",
    tags: ["Vegetarian", "Popular", "Organic"]
  },
  {
    id: "prod_ab_2",
    businessId: "biz_artisan_brew",
    name: "Ethiopian Yirgacheffe Nitro Cold Brew",
    category: "Coffee",
    price: 6.5,
    isAvailable: true,
    description: "Steeped for 20 hours and infused with pure nitrogen. Delicate floral aroma with bright notes of bergamot and wild jasmine.",
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80",
    badge: "Signature",
    tags: ["Cold Brew", "Single Origin", "Vegan"]
  },
  {
    id: "prod_ab_3",
    businessId: "biz_artisan_brew",
    name: "Smoked Salmon Eggs Royale",
    category: "Brunch",
    price: 18.0,
    isAvailable: true,
    description: "Wild Scottish smoked salmon on toasted English muffins, draped in warm citrus hollandaise and microgreens.",
    image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=800&q=80",
    badge: "",
    tags: ["Seafood", "Breakfast"]
  },
  {
    id: "prod_ab_4",
    businessId: "biz_artisan_brew",
    name: "Basque Burnt Cheesecake Slice",
    category: "Bakery",
    price: 7.5,
    isAvailable: true,
    description: "Caramelized exterior with an irresistibly creamy, melt-in-your-mouth center infused with Madagascar vanilla bean.",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
    tags: ["Dessert", "Gluten-Free Friendly"]
  },
  {
    id: "prod_ab_5",
    businessId: "biz_artisan_brew",
    name: "Ceremonial Matcha Oat Latte",
    category: "Tea & Beverages",
    price: 7.0,
    isAvailable: true,
    description: "First-harvest Uji ceremonial green tea hand-whisked and steamed with organic gluten-free oat milk.",
    image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80",
    badge: "Antioxidant",
    tags: ["Matcha", "Dairy-Free", "Superfood"]
  },

  // Luxe Glow Salon & Wellness Services
  {
    id: "prod_lg_1",
    businessId: "biz_luxe_glow",
    name: "Hydra-Luminescence Diamond Facial",
    category: "Facial Care",
    price: 145,
    isAvailable: true,
    duration: "60 mins",
    description: "Multi-stage vortex infusion featuring glycolic exfoliation, hyaluronic acid replenishment, and LED light collagen therapy.",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
    badge: "Most Booked",
    tags: ["Skincare", "Anti-Aging", "Glow"]
  },
  {
    id: "prod_lg_2",
    businessId: "biz_luxe_glow",
    name: "Balayage Transformation & Couture Cut",
    category: "Hair Styling",
    price: 195,
    isAvailable: true,
    duration: "120 mins",
    description: "Custom hand-painted multidimensional blonde/caramel tones, Olaplex bonding treatment, and precision face-framing haircut.",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80",
    badge: "Signature",
    tags: ["Color", "Hair", "Styling"]
  },
  {
    id: "prod_lg_3",
    businessId: "biz_luxe_glow",
    name: "Botanical Scalp Detox & Massage",
    category: "Spa Treatments",
    price: 90,
    isAvailable: true,
    duration: "45 mins",
    description: "Herbal steam purification, organic rosemary oil massage, and acupressure points to release tension and encourage hair vitality.",
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80",
    badge: "",
    tags: ["Relaxation", "Holistic", "Detox"]
  },
  {
    id: "prod_lg_4",
    businessId: "biz_luxe_glow",
    name: "Organic Rosehip & Peptide Elixir (50ml)",
    category: "Retail Products",
    price: 58,
    isAvailable: true,
    description: "Cold-pressed virgin rosehip seed oil enriched with biomimetic copper peptides for night-time dermal restoration.",
    image: "https://images.unsplash.com/photo-1608248597359-5b79d201103c?auto=format&fit=crop&w=800&q=80",
    badge: "Organic",
    tags: ["Serum", "Take Home", "Cruelty-Free"]
  }
];

export const INITIAL_ORDERS = [
  {
    id: "ord_101",
    businessId: "biz_urban_vogue",
    customerName: "Marcus Sterling",
    customerEmail: "marcus@example.com",
    customerPhone: "+1 (555) 782-9012",
    items: [
      { id: "prod_uv_1", name: "Heavyweight Boxy Graphic Tee", quantity: 2, price: 48 },
      { id: "prod_uv_2", name: "Japanese Selvedge Denim Trousers", quantity: 1, price: 135 }
    ],
    totalAmount: 231,
    status: "Completed", // "Pending" | "In Progress" | "Completed" | "Cancelled"
    notes: "Please pack with gift wrap. Size L for tee and 32/32 for denim.",
    deliveryMethod: "Pickup in Store",
    createdAt: "2026-02-18T14:32:00Z"
  },
  {
    id: "ord_102",
    businessId: "biz_urban_vogue",
    customerName: "Sophia Lin",
    customerEmail: "sophia.lin@domain.com",
    customerPhone: "+1 (555) 349-1100",
    items: [
      { id: "prod_uv_3", name: "Minimalist Double-Breasted Trench", quantity: 1, price: 210 }
    ],
    totalAmount: 210,
    status: "In Progress",
    notes: "Checking if size M can be held until Saturday.",
    deliveryMethod: "Home Delivery",
    createdAt: "2026-02-21T09:15:00Z"
  },
  {
    id: "ord_103",
    businessId: "biz_artisan_brew",
    customerName: "David Kim",
    customerEmail: "dkim@techcorp.io",
    customerPhone: "+1 (555) 612-8844",
    items: [
      { id: "prod_ab_1", name: "Artisan Truffle Brioche Toast", quantity: 2, price: 16.5 },
      { id: "prod_ab_2", name: "Ethiopian Yirgacheffe Nitro Cold Brew", quantity: 2, price: 6.5 }
    ],
    totalAmount: 46.0,
    status: "Completed",
    notes: "Extra napkins and honey please.",
    deliveryMethod: "Curbside Pickup",
    createdAt: "2026-02-23T11:40:00Z"
  }
];

export const INITIAL_APPOINTMENTS = [
  {
    id: "apt_201",
    businessId: "biz_luxe_glow",
    customerName: "Jessica Taylor",
    customerEmail: "jess.taylor@gmail.com",
    customerPhone: "+1 (555) 431-7788",
    serviceName: "Hydra-Luminescence Diamond Facial",
    servicePrice: 145,
    appointmentDate: "2026-03-02",
    appointmentTime: "02:30 PM",
    stylist: "Camilla Vance (Lead Esthetician)",
    status: "Confirmed", // "Pending" | "Confirmed" | "Completed" | "Cancelled"
    notes: "Sensitive skin, first time visit.",
    createdAt: "2026-02-22T16:20:00Z"
  },
  {
    id: "apt_202",
    businessId: "biz_luxe_glow",
    customerName: "Brianna Gomez",
    customerEmail: "brianna.g@outlook.com",
    customerPhone: "+1 (555) 902-1133",
    serviceName: "Balayage Transformation & Couture Cut",
    servicePrice: 195,
    appointmentDate: "2026-03-04",
    appointmentTime: "11:00 AM",
    stylist: "Leo Chen (Senior Stylist)",
    status: "Pending",
    notes: "Wants consultation on honey blonde highlight tones.",
    createdAt: "2026-02-23T18:10:00Z"
  }
];

export const INITIAL_ENQUIRIES = [
  {
    id: "enq_301",
    businessId: "biz_urban_vogue",
    senderName: "Nathan Cole",
    senderEmail: "nathan@studiovibe.co",
    senderPhone: "+1 (555) 890-2341",
    subject: "Bulk corporate order inquiry for winter jackets",
    message: "Hi team, we're looking to purchase around 25-30 minimalist trench coats with subtle embroidery for our agency executives. Do you provide wholesale tier pricing?",
    isRead: true,
    status: "Replied",
    createdAt: "2026-02-19T10:15:00Z"
  },
  {
    id: "enq_302",
    businessId: "biz_urban_vogue",
    senderName: "Chloe Martin",
    senderEmail: "chloe@fashionmag.net",
    senderPhone: "+1 (555) 402-9911",
    subject: "Press pull request for upcoming Spring Lookbook",
    message: "Hello! We would love to feature the Japanese Selvedge Denim in our editorial shoot next week in Manhattan. Who should we coordinate stylist sample pulls with?",
    isRead: false,
    status: "New",
    createdAt: "2026-02-23T15:45:00Z"
  },
  {
    id: "enq_303",
    businessId: "biz_artisan_brew",
    senderName: "Sarah Jenkins",
    senderEmail: "sarah@eventpro.org",
    senderPhone: "+1 (555) 777-2020",
    subject: "Weekend coffee cart catering for 80 guests",
    message: "Would love to book your mobile espresso bar for our outdoor brand pop-up on Saturday afternoon. Could you send your catering package options?",
    isRead: false,
    status: "New",
    createdAt: "2026-02-24T08:10:00Z"
  }
];

export const INITIAL_ANALYTICS = {
  biz_urban_vogue: {
    totalVisitors: 4892,
    uniqueVisitors: 3610,
    pageViews: 12450,
    conversionRate: 3.4,
    monthlyActivity: [
      { month: "Sep", visitors: 2800, orders: 48, revenue: 3200 },
      { month: "Oct", visitors: 3400, orders: 62, revenue: 4400 },
      { month: "Nov", visitors: 4100, orders: 79, revenue: 5800 },
      { month: "Dec", visitors: 5300, orders: 110, revenue: 8900 },
      { month: "Jan", visitors: 4600, orders: 86, revenue: 6400 },
      { month: "Feb", visitors: 4892, orders: 94, revenue: 7350 }
    ],
    trafficSources: [
      { source: "Direct / QR Code", percentage: 42 },
      { source: "Instagram / Social", percentage: 34 },
      { source: "Google Search", percentage: 16 },
      { source: "Referral / WhatsApp", percentage: 8 }
    ]
  },
  biz_artisan_brew: {
    totalVisitors: 6210,
    uniqueVisitors: 4980,
    pageViews: 15320,
    conversionRate: 4.8,
    monthlyActivity: [
      { month: "Sep", visitors: 3100, orders: 65, revenue: 2100 },
      { month: "Oct", visitors: 3900, orders: 82, revenue: 2800 },
      { month: "Nov", visitors: 4500, orders: 98, revenue: 3400 },
      { month: "Dec", visitors: 5800, orders: 130, revenue: 4700 },
      { month: "Jan", visitors: 5600, orders: 122, revenue: 4300 },
      { month: "Feb", visitors: 6210, orders: 145, revenue: 5120 }
    ],
    trafficSources: [
      { source: "Google Maps / Local", percentage: 48 },
      { source: "Instagram", percentage: 28 },
      { source: "Direct URL", percentage: 18 },
      { source: "Word of mouth", percentage: 6 }
    ]
  },
  biz_luxe_glow: {
    totalVisitors: 3140,
    uniqueVisitors: 2420,
    pageViews: 8920,
    conversionRate: 5.2,
    monthlyActivity: [
      { month: "Sep", visitors: 1900, orders: 32, revenue: 3800 },
      { month: "Oct", visitors: 2200, orders: 40, revenue: 4600 },
      { month: "Nov", visitors: 2600, orders: 48, revenue: 5700 },
      { month: "Dec", visitors: 3400, orders: 65, revenue: 8100 },
      { month: "Jan", visitors: 2900, orders: 51, revenue: 6300 },
      { month: "Feb", visitors: 3140, orders: 59, revenue: 7420 }
    ],
    trafficSources: [
      { source: "Instagram", percentage: 45 },
      { source: "Client Referrals", percentage: 30 },
      { source: "Google Search", percentage: 18 },
      { source: "Direct", percentage: 7 }
    ]
  }
};
