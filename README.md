# BizNest — One Digital Platform for Every Business

BizNest is a modern, full-stack multi-tenant SaaS application that empowers local businesses (shops, boutiques, cafes, restaurants, salons, wellness spas, gyms, and service providers) to create, customize, and launch their own professional websites without writing a single line of code.

---

## 🌟 Key Features

### 1. Multi-Tenant Architecture & Data Separation
- **Data Isolation**: Every business has its own unique `businessId` and dedicated records for catalog products, customer enquiry orders, appointment bookings, inquiries, and analytics.
- **Firebase Security Rules (`firestore.rules`)**: Production-grade Cloud Firestore security rules with granular access control, ensuring that only authenticated business owners can modify their storefront catalog, view orders, or triage private customer inquiries.

### 2. Marketing Landing Page (`/`)
- **Linear/Stripe/Shopify Aesthetic**: Crisp typography (Inter & Plus Jakarta Sans), subtle gradient accents, responsive cards, micro-interactions.
- **Hero & Value Proposition**: "Your Business Deserves Its Own Professional Website."
- **Interactive Live Store Previews**: Direct links to test live business storefronts with zero friction.
- **How It Works (3 Steps)**: 1. Pick Template, 2. Add Products & Details, 3. Share URL & Accept Orders.
- **Business Categories**: Retail & Boutiques, Cafes & Restaurants, Salons & Spas, Gyms & Fitness, Tech & Electronics, Artisans & Crafts.
- **Pricing & FAQ**: Transparent pricing plans with annual discount toggle, and collapsible FAQ accordions.

### 3. Business Authentication (`/login`, `/register`, `/forgot-password`)
- **Business Registration**: Collects Owner Name, Email, Password, Business Name, and Industry Category. Automatically scaffolds a store profile with an industry-tailored template.
- **Adaptive Backend**: Connects to **Firebase Authentication** when configured, and provides an instant **Interactive Demo Mode** with 1-click logins for demo stores.

### 4. Comprehensive Business Dashboard (`/dashboard`)
Nine fully functional operational sections:
1. **Overview**: Metric cards (Visitors, Catalog Items, Customer Orders, Revenue, Enquiries), 6-month monthly traffic chart, recent activities, quick action shortcuts.
2. **My Website**: Public storefront URL with 1-click copy, live status indicator, and interactive Desktop / Mobile responsive frame preview.
3. **Products & Services**: Full CRUD (Add, Edit, Delete with confirmation modal, Toggle Availability/In Stock, Category tags, Pricing, Images).
4. **Orders**: Customer enquiry orders table with status badges (`Pending`, `In Progress`, `Completed`, `Cancelled`), itemized order summaries, and **1-Click WhatsApp reply** with pre-filled order details.
5. **Appointments**: Service scheduling table with date, time slot, specialist assignment, customer details, status updates, and WhatsApp confirmation links.
6. **Customer Enquiries**: Customer inbox for messages sent via storefront contact forms, with unread indicators and email/phone reply actions.
7. **Analytics**: Traffic KPIs, conversion rate, monthly comparison bar charts, and referral source breakdowns.
8. **Website Customization**: Select 1 of 3 industry templates, upload logos and cover banners, customize theme palette (curated swatches + custom hex), update business description, contact information, and daily operating hours.
9. **Business Settings**: Regional currency selection (USD, EUR, GBP, CAD, AUD, INR), WhatsApp order automation toggle, and store settings.

### 5. 3 Distinct Industry Templates
1. **Fashion & Retail Store (`retail`)**: Streetwear & boutique layout, product tag filters, image cards with badges, quick-view modal, and add-to-bag enquiry cart. (Demo: `/store/urban-vogue`)
2. **Restaurant & Cafe (`restaurant`)**: Menu categories, chef recommendation badges, taste descriptions, and table/takeout order enquiry. (Demo: `/store/artisan-brew`)
3. **Salon & Wellness Services (`salon`)**: Treatment menu with durations, transparent pricing, and interactive **Book Appointment** modal with date and time slot selection. (Demo: `/store/luxe-glow`)

### 6. Customer Experience & Frictionless Ordering
- **Public URL**: Clean dynamic routing at `/store/:slug`.
- **Enquiry-Based Ordering**: Customers assemble items in a slide-out cart drawer and submit order inquiries without high-friction payment gateways.
- **WhatsApp Integration**: Automatically pre-formats order summaries or appointment confirmations into direct WhatsApp message links.
- **Floating WhatsApp Button**: Instant direct chat for storefront visitors.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite 6, Tailwind CSS v4, React Router DOM v7
- **Icons & Animation**: Lucide React, Canvas Confetti
- **Backend & Cloud**: Firebase (Authentication, Cloud Firestore, Cloud Storage, Hosting)
- **Security**: Granular Multi-tenant Firestore Security Rules (`firestore.rules`)

---

## 🚀 Running Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://127.0.0.1:5173/` in your browser.

3. **Production Build**:
   ```bash
   npm run build
   ```

---

## ☁️ Connecting Production Firebase

To connect your own live Firebase project:
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. Enable **Authentication** (Email/Password), **Cloud Firestore**, and **Cloud Storage**.
3. Create a `.env` file in the project root:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```
4. Deploy security rules:
   ```bash
   firebase deploy --only firestore:rules
   ```
