import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, isFirebaseConfigured } from "../services/firebase";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as fbSignOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { businessService } from "../services/businessService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("biznest_auth_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [business, setBusiness] = useState(() => {
    try {
      const saved = localStorage.getItem("biznest_active_business");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  // Sync auth state with Firebase if configured
  useEffect(() => {
    let unsubscribe = () => {};
    if (isFirebaseConfigured && auth) {
      unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
        if (fbUser) {
          const userObj = {
            uid: fbUser.uid,
            email: fbUser.email,
            displayName: fbUser.displayName || fbUser.email.split("@")[0]
          };
          setUser(userObj);
          localStorage.setItem("biznest_auth_user", JSON.stringify(userObj));
          // Load business associated with this owner
          const allBiz = await businessService.getAllBusinesses();
          const userBiz = allBiz.find(b => b.ownerId === fbUser.uid || b.ownerEmail === fbUser.email);
          if (userBiz) {
            setBusiness(userBiz);
            localStorage.setItem("biznest_active_business", JSON.stringify(userBiz));
          }
        } else {
          // If not demo user
          if (user && !user.isDemo) {
            setUser(null);
            setBusiness(null);
            localStorage.removeItem("biznest_auth_user");
            localStorage.removeItem("biznest_active_business");
          }
        }
        setLoading(false);
      });
    } else {
      // Demo mode: verify business exists
      if (business?.id) {
        businessService.getBusinessById(business.id).then(freshBiz => {
          if (freshBiz) {
            setBusiness(freshBiz);
            localStorage.setItem("biznest_active_business", JSON.stringify(freshBiz));
          }
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    }
    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Check demo accounts first
      const allBiz = await businessService.getAllBusinesses();
      const matchedBiz = allBiz.find(b => b.ownerEmail.toLowerCase() === email.toLowerCase());

      if (matchedBiz) {
        const demoUser = {
          uid: matchedBiz.ownerId,
          email: matchedBiz.ownerEmail,
          displayName: matchedBiz.ownerName,
          isDemo: true
        };
        setUser(demoUser);
        setBusiness(matchedBiz);
        localStorage.setItem("biznest_auth_user", JSON.stringify(demoUser));
        localStorage.setItem("biznest_active_business", JSON.stringify(matchedBiz));
        setLoading(false);
        return { success: true, user: demoUser, business: matchedBiz };
      }

      // Try Firebase if configured
      if (isFirebaseConfigured && auth) {
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        const fbUser = userCred.user;
        const userObj = {
          uid: fbUser.uid,
          email: fbUser.email,
          displayName: fbUser.displayName || fbUser.email.split("@")[0]
        };
        setUser(userObj);
        localStorage.setItem("biznest_auth_user", JSON.stringify(userObj));

        const userBiz = allBiz.find(b => b.ownerId === fbUser.uid);
        if (userBiz) {
          setBusiness(userBiz);
          localStorage.setItem("biznest_active_business", JSON.stringify(userBiz));
        }
        setLoading(false);
        return { success: true, user: userObj, business: userBiz };
      }

      // If demo mode and custom email was provided, auto-login with custom business
      const fallbackUser = {
        uid: "user_" + Date.now(),
        email,
        displayName: email.split("@")[0],
        isDemo: true
      };
      // Find or create default business
      let userBiz = allBiz.find(b => b.ownerEmail === email);
      if (!userBiz) {
        userBiz = allBiz[0]; // link to first available
      }
      setUser(fallbackUser);
      setBusiness(userBiz);
      localStorage.setItem("biznest_auth_user", JSON.stringify(fallbackUser));
      localStorage.setItem("biznest_active_business", JSON.stringify(userBiz));
      setLoading(false);
      return { success: true, user: fallbackUser, business: userBiz };
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const register = async ({ name, email, password, businessName, businessCategory }) => {
    setLoading(true);
    try {
      let uid = "user_" + Date.now();

      if (isFirebaseConfigured && auth) {
        try {
          const userCred = await createUserWithEmailAndPassword(auth, email, password);
          uid = userCred.user.uid;
        } catch (authErr) {
          console.warn("Firebase register notice:", authErr.message);
        }
      }

      const newUser = {
        uid,
        email,
        displayName: name,
        isDemo: !isFirebaseConfigured
      };

      const slug = businessName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

      // Determine template based on category
      let template = "retail";
      let themeColor = "#2563eb";
      let coverImage = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&h=600&q=80";

      if (businessCategory.toLowerCase().includes("restaurant") || businessCategory.toLowerCase().includes("cafe") || businessCategory.toLowerCase().includes("food")) {
        template = "restaurant";
        themeColor = "#b45309";
        coverImage = "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1600&h=600&q=80";
      } else if (businessCategory.toLowerCase().includes("salon") || businessCategory.toLowerCase().includes("spa") || businessCategory.toLowerCase().includes("beauty") || businessCategory.toLowerCase().includes("fitness") || businessCategory.toLowerCase().includes("gym")) {
        template = "salon";
        themeColor = "#be185d";
        coverImage = "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=1600&h=600&q=80";
      }

      const newBizData = {
        id: "biz_" + Date.now(),
        ownerId: uid,
        ownerName: name,
        ownerEmail: email,
        name: businessName,
        slug: slug || "my-store-" + Math.floor(Math.random() * 1000),
        category: businessCategory,
        template,
        tagline: `Welcome to ${businessName}. Quality & care in every detail.`,
        description: `${businessName} is dedicated to offering top-tier products, friendly service, and unforgettable experiences to our community.`,
        logo: "https://images.unsplash.com/photo-1516876437184-593fda40c7ce?auto=format&fit=crop&w=200&h=200&q=80",
        coverImage,
        themeColor,
        accentColor: themeColor,
        contact: {
          phone: "+1 (555) 000-0000",
          whatsapp: "+15550000000",
          email,
          address: "100 Main Street, Suite 1",
          city: "Metro City",
          country: "United States"
        },
        openingHours: {
          monday: "9:00 AM - 6:00 PM",
          tuesday: "9:00 AM - 6:00 PM",
          wednesday: "9:00 AM - 6:00 PM",
          thursday: "9:00 AM - 7:00 PM",
          friday: "9:00 AM - 7:00 PM",
          saturday: "10:00 AM - 5:00 PM",
          sunday: "Closed"
        },
        socialLinks: {
          instagram: "",
          facebook: ""
        },
        currency: "USD",
        currencySymbol: "$",
        published: true
      };

      const createdBiz = await businessService.createBusiness(newBizData);

      setUser(newUser);
      setBusiness(createdBiz);
      localStorage.setItem("biznest_auth_user", JSON.stringify(newUser));
      localStorage.setItem("biznest_active_business", JSON.stringify(createdBiz));
      setLoading(false);

      return { success: true, user: newUser, business: createdBiz };
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const logout = async () => {
    try {
      if (isFirebaseConfigured && auth) {
        await fbSignOut(auth);
      }
    } catch (e) {
      console.warn("Signout error:", e);
    }
    setUser(null);
    setBusiness(null);
    localStorage.removeItem("biznest_auth_user");
    localStorage.removeItem("biznest_active_business");
  };

  const switchBusiness = (newBiz) => {
    setBusiness(newBiz);
    localStorage.setItem("biznest_active_business", JSON.stringify(newBiz));
  };

  const updateCurrentBusiness = (updates) => {
    setBusiness(prev => {
      const updated = { ...prev, ...updates };
      localStorage.setItem("biznest_active_business", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        business,
        loading,
        login,
        register,
        logout,
        switchBusiness,
        updateCurrentBusiness,
        isFirebaseConfigured
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
