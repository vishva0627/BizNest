import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext";

// Components
import { Navbar } from "./components/common/Navbar";
import { Footer } from "./components/common/Footer";

// Pages
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { ForgotPasswordPage } from "./pages/auth/ForgotPasswordPage";

// Dashboard
import { DashboardLayout } from "./components/dashboard/DashboardLayout";
import { DashboardOverview } from "./pages/dashboard/DashboardOverview";
import { MyWebsitePage } from "./pages/dashboard/MyWebsitePage";
import { ProductsPage } from "./pages/dashboard/ProductsPage";
import { OrdersPage } from "./pages/dashboard/OrdersPage";
import { AppointmentsPage } from "./pages/dashboard/AppointmentsPage";
import { EnquiriesPage } from "./pages/dashboard/EnquiriesPage";
import { AnalyticsPage } from "./pages/dashboard/AnalyticsPage";
import { WebsiteBuilderPage } from "./pages/dashboard/WebsiteBuilderPage";
import { SettingsPage } from "./pages/dashboard/SettingsPage";

// Public Storefront
import { PublicStorePage } from "./pages/store/PublicStorePage";

// Protected Route Guard
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Landing Layout wrapper with Navbar & Footer
const MainLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <div className="flex-1">{children}</div>
    <Footer />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ToastProvider>
            <Routes>
              {/* Marketing Landing */}
              <Route
                path="/"
                element={
                  <MainLayout>
                    <LandingPage />
                  </MainLayout>
                }
              />

              {/* Authentication */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />

              {/* Business Dashboard Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<DashboardOverview />} />
                <Route path="website" element={<MyWebsitePage />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="orders" element={<OrdersPage />} />
                <Route path="appointments" element={<AppointmentsPage />} />
                <Route path="enquiries" element={<EnquiriesPage />} />
                <Route path="analytics" element={<AnalyticsPage />} />
                <Route path="builder" element={<WebsiteBuilderPage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>

              {/* Public Storefront Dynamic Route */}
              <Route path="/store/:slug" element={<PublicStorePage />} />

              {/* Catch-all 404 */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ToastProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
