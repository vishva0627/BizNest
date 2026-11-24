// Multi-tenant Business Service with Firestore & LocalStorage Persistence
import { 
  INITIAL_BUSINESSES, 
  INITIAL_PRODUCTS, 
  INITIAL_ORDERS, 
  INITIAL_APPOINTMENTS, 
  INITIAL_ENQUIRIES, 
  INITIAL_ANALYTICS 
} from "./demoData";
import { db, isFirebaseConfigured } from "./firebase";
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy 
} from "firebase/firestore";

const STORAGE_KEY_PREFIX = "biznest_v1_";

const getStorageItem = (key, defaultVal) => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PREFIX + key);
    return raw ? JSON.parse(raw) : defaultVal;
  } catch (e) {
    console.warn("Storage read error:", e);
    return defaultVal;
  }
};

const setStorageItem = (key, val) => {
  try {
    localStorage.setItem(STORAGE_KEY_PREFIX + key, JSON.stringify(val));
  } catch (e) {
    console.warn("Storage write error:", e);
  }
};

// Initialize LocalStorage with seed data if not present
export const initializeStore = () => {
  if (!getStorageItem("businesses", null)) {
    setStorageItem("businesses", INITIAL_BUSINESSES);
  }
  if (!getStorageItem("products", null)) {
    setStorageItem("products", INITIAL_PRODUCTS);
  }
  if (!getStorageItem("orders", null)) {
    setStorageItem("orders", INITIAL_ORDERS);
  }
  if (!getStorageItem("appointments", null)) {
    setStorageItem("appointments", INITIAL_APPOINTMENTS);
  }
  if (!getStorageItem("enquiries", null)) {
    setStorageItem("enquiries", INITIAL_ENQUIRIES);
  }
  if (!getStorageItem("analytics", null)) {
    setStorageItem("analytics", INITIAL_ANALYTICS);
  }
};

initializeStore();

export const businessService = {
  // BUSINESS OPERATIONS
  async getAllBusinesses() {
    if (isFirebaseConfigured && db) {
      try {
        const snap = await getDocs(collection(db, "businesses"));
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
      } catch (err) {
        console.error("Firestore error, falling back to local:", err);
      }
    }
    return getStorageItem("businesses", INITIAL_BUSINESSES);
  },

  async getBusinessBySlug(slug) {
    if (isFirebaseConfigured && db) {
      try {
        const q = query(collection(db, "businesses"), where("slug", "==", slug));
        const snap = await getDocs(q);
        if (!snap.empty) {
          const docSnap = snap.docs[0];
          return { id: docSnap.id, ...docSnap.data() };
        }
      } catch (err) {
        console.error("Firestore getBusinessBySlug error:", err);
      }
    }
    const list = getStorageItem("businesses", INITIAL_BUSINESSES);
    return list.find(b => b.slug === slug || b.id === slug) || null;
  },

  async getBusinessById(id) {
    if (isFirebaseConfigured && db) {
      try {
        const ref = doc(db, "businesses", id);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          return { id: snap.id, ...snap.data() };
        }
      } catch (err) {
        console.error("Firestore getBusinessById error:", err);
      }
    }
    const list = getStorageItem("businesses", INITIAL_BUSINESSES);
    return list.find(b => b.id === id) || null;
  },

  async createBusiness(businessData) {
    const id = businessData.id || "biz_" + Date.now();
    const newBiz = {
      ...businessData,
      id,
      published: true,
      createdAt: new Date().toISOString()
    };

    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, "businesses", id), newBiz);
      } catch (err) {
        console.error("Firestore createBusiness error:", err);
      }
    }

    const list = getStorageItem("businesses", INITIAL_BUSINESSES);
    const updated = [newBiz, ...list];
    setStorageItem("businesses", updated);
    return newBiz;
  },

  async updateBusiness(id, updates) {
    if (isFirebaseConfigured && db) {
      try {
        await updateDoc(doc(db, "businesses", id), updates);
      } catch (err) {
        console.error("Firestore updateBusiness error:", err);
      }
    }

    const list = getStorageItem("businesses", INITIAL_BUSINESSES);
    const updated = list.map(b => b.id === id ? { ...b, ...updates } : b);
    setStorageItem("businesses", updated);
    return updated.find(b => b.id === id);
  },

  // PRODUCTS OPERATIONS
  async getProducts(businessId) {
    if (isFirebaseConfigured && db) {
      try {
        const colRef = collection(db, "businesses", businessId, "products");
        const snap = await getDocs(colRef);
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
      } catch (err) {
        console.error("Firestore getProducts error:", err);
      }
    }
    const all = getStorageItem("products", INITIAL_PRODUCTS);
    return all.filter(p => p.businessId === businessId);
  },

  async addProduct(businessId, productData) {
    const newProduct = {
      ...productData,
      id: "prod_" + Date.now(),
      businessId,
      createdAt: new Date().toISOString()
    };

    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, "businesses", businessId, "products", newProduct.id), newProduct);
      } catch (err) {
        console.error("Firestore addProduct error:", err);
      }
    }

    const all = getStorageItem("products", INITIAL_PRODUCTS);
    const updated = [newProduct, ...all];
    setStorageItem("products", updated);
    return newProduct;
  },

  async updateProduct(businessId, productId, updates) {
    if (isFirebaseConfigured && db) {
      try {
        await updateDoc(doc(db, "businesses", businessId, "products", productId), updates);
      } catch (err) {
        console.error("Firestore updateProduct error:", err);
      }
    }

    const all = getStorageItem("products", INITIAL_PRODUCTS);
    const updated = all.map(p => (p.id === productId && p.businessId === businessId) ? { ...p, ...updates } : p);
    setStorageItem("products", updated);
    return updated.find(p => p.id === productId);
  },

  async deleteProduct(businessId, productId) {
    if (isFirebaseConfigured && db) {
      try {
        await deleteDoc(doc(db, "businesses", businessId, "products", productId));
      } catch (err) {
        console.error("Firestore deleteProduct error:", err);
      }
    }

    const all = getStorageItem("products", INITIAL_PRODUCTS);
    const updated = all.filter(p => !(p.id === productId && p.businessId === businessId));
    setStorageItem("products", updated);
    return true;
  },

  // ORDERS OPERATIONS
  async getOrders(businessId) {
    if (isFirebaseConfigured && db) {
      try {
        const colRef = collection(db, "businesses", businessId, "orders");
        const snap = await getDocs(colRef);
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
      } catch (err) {
        console.error("Firestore getOrders error:", err);
      }
    }
    const all = getStorageItem("orders", INITIAL_ORDERS);
    return all.filter(o => o.businessId === businessId);
  },

  async createOrder(businessId, orderData) {
    const newOrder = {
      ...orderData,
      id: "ord_" + Date.now(),
      businessId,
      status: "Pending",
      createdAt: new Date().toISOString()
    };

    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, "businesses", businessId, "orders", newOrder.id), newOrder);
      } catch (err) {
        console.error("Firestore createOrder error:", err);
      }
    }

    const all = getStorageItem("orders", INITIAL_ORDERS);
    const updated = [newOrder, ...all];
    setStorageItem("orders", updated);
    return newOrder;
  },

  async updateOrderStatus(businessId, orderId, status) {
    if (isFirebaseConfigured && db) {
      try {
        await updateDoc(doc(db, "businesses", businessId, "orders", orderId), { status });
      } catch (err) {
        console.error("Firestore updateOrderStatus error:", err);
      }
    }

    const all = getStorageItem("orders", INITIAL_ORDERS);
    const updated = all.map(o => (o.id === orderId && o.businessId === businessId) ? { ...o, status } : o);
    setStorageItem("orders", updated);
    return updated.find(o => o.id === orderId);
  },

  // APPOINTMENTS OPERATIONS
  async getAppointments(businessId) {
    if (isFirebaseConfigured && db) {
      try {
        const colRef = collection(db, "businesses", businessId, "appointments");
        const snap = await getDocs(colRef);
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
      } catch (err) {
        console.error("Firestore getAppointments error:", err);
      }
    }
    const all = getStorageItem("appointments", INITIAL_APPOINTMENTS);
    return all.filter(a => a.businessId === businessId);
  },

  async createAppointment(businessId, appointmentData) {
    const newApt = {
      ...appointmentData,
      id: "apt_" + Date.now(),
      businessId,
      status: "Pending",
      createdAt: new Date().toISOString()
    };

    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, "businesses", businessId, "appointments", newApt.id), newApt);
      } catch (err) {
        console.error("Firestore createAppointment error:", err);
      }
    }

    const all = getStorageItem("appointments", INITIAL_APPOINTMENTS);
    const updated = [newApt, ...all];
    setStorageItem("appointments", updated);
    return newApt;
  },

  async updateAppointmentStatus(businessId, appointmentId, status) {
    if (isFirebaseConfigured && db) {
      try {
        await updateDoc(doc(db, "businesses", businessId, "appointments", appointmentId), { status });
      } catch (err) {
        console.error("Firestore updateAppointmentStatus error:", err);
      }
    }

    const all = getStorageItem("appointments", INITIAL_APPOINTMENTS);
    const updated = all.map(a => (a.id === appointmentId && a.businessId === businessId) ? { ...a, status } : a);
    setStorageItem("appointments", updated);
    return updated.find(a => a.id === appointmentId);
  },

  // ENQUIRIES OPERATIONS
  async getEnquiries(businessId) {
    if (isFirebaseConfigured && db) {
      try {
        const colRef = collection(db, "businesses", businessId, "enquiries");
        const snap = await getDocs(colRef);
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
      } catch (err) {
        console.error("Firestore getEnquiries error:", err);
      }
    }
    const all = getStorageItem("enquiries", INITIAL_ENQUIRIES);
    return all.filter(e => e.businessId === businessId);
  },

  async createEnquiry(businessId, enquiryData) {
    const newEnq = {
      ...enquiryData,
      id: "enq_" + Date.now(),
      businessId,
      isRead: false,
      status: "New",
      createdAt: new Date().toISOString()
    };

    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, "businesses", businessId, "enquiries", newEnq.id), newEnq);
      } catch (err) {
        console.error("Firestore createEnquiry error:", err);
      }
    }

    const all = getStorageItem("enquiries", INITIAL_ENQUIRIES);
    const updated = [newEnq, ...all];
    setStorageItem("enquiries", updated);
    return newEnq;
  },

  async updateEnquiryStatus(businessId, enquiryId, updates) {
    if (isFirebaseConfigured && db) {
      try {
        await updateDoc(doc(db, "businesses", businessId, "enquiries", enquiryId), updates);
      } catch (err) {
        console.error("Firestore updateEnquiryStatus error:", err);
      }
    }

    const all = getStorageItem("enquiries", INITIAL_ENQUIRIES);
    const updated = all.map(e => (e.id === enquiryId && e.businessId === businessId) ? { ...e, ...updates } : e);
    setStorageItem("enquiries", updated);
    return updated.find(e => e.id === enquiryId);
  },

  // ANALYTICS & VISITS
  async getAnalytics(businessId) {
    const allAnalytics = getStorageItem("analytics", INITIAL_ANALYTICS);
    if (allAnalytics[businessId]) {
      return allAnalytics[businessId];
    }
    // Return default metrics for newly registered business
    return {
      totalVisitors: 45,
      uniqueVisitors: 32,
      pageViews: 120,
      conversionRate: 2.1,
      monthlyActivity: [
        { month: "Nov", visitors: 10, orders: 1, revenue: 50 },
        { month: "Dec", visitors: 18, orders: 2, revenue: 110 },
        { month: "Jan", visitors: 28, orders: 3, revenue: 195 },
        { month: "Feb", visitors: 45, orders: 5, revenue: 310 }
      ],
      trafficSources: [
        { source: "Direct link", percentage: 65 },
        { source: "WhatsApp / Share", percentage: 25 },
        { source: "Social Media", percentage: 10 }
      ]
    };
  },

  async recordVisitorHit(businessId) {
    const allAnalytics = getStorageItem("analytics", INITIAL_ANALYTICS);
    const cur = allAnalytics[businessId] || {
      totalVisitors: 1,
      uniqueVisitors: 1,
      pageViews: 1,
      conversionRate: 0,
      monthlyActivity: [],
      trafficSources: []
    };
    cur.totalVisitors += 1;
    cur.pageViews += 1;
    allAnalytics[businessId] = cur;
    setStorageItem("analytics", allAnalytics);
  }
};
