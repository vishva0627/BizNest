import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { businessService } from "../../services/businessService";
import { uploadImageFile } from "../../services/storageService";
import { ConfirmModal } from "../../components/common/ConfirmModal";
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  Image, 
  CheckCircle2, 
  X,
  Upload,
  Tag,
  Clock,
  Eye,
  EyeOff
} from "lucide-react";

export const ProductsPage = () => {
  const { business } = useAuth();
  const { addToast } = useToast();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: "",
    duration: "",
    badge: "",
    isAvailable: true
  });

  useEffect(() => {
    if (!business?.id) return;
    loadProducts();
  }, [business?.id]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const prods = await businessService.getProducts(business.id);
      setProducts(prods);
    } catch (err) {
      console.error(err);
      addToast("Failed to load products", "error");
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

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      category: business?.template === "restaurant" ? "Main Course" : business?.template === "salon" ? "Hair Care" : "General",
      price: "",
      description: "",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      duration: business?.template === "salon" ? "45 mins" : "",
      badge: "",
      isAvailable: true
    });
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || "",
      category: product.category || "",
      price: product.price ?? "",
      description: product.description || "",
      image: product.image || "",
      duration: product.duration || "",
      badge: product.badge || "",
      isAvailable: product.isAvailable ?? true
    });
    setIsModalOpen(true);
  };

  const handleImageFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      addToast("Uploading image...", "info", 1500);
      const url = await uploadImageFile(file, `products/${business.id}`);
      setFormData(prev => ({ ...prev, image: url }));
      addToast("Image ready!", "success");
    } catch (err) {
      addToast("Image upload error", "error");
    }
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!formData.name || formData.price === "") {
      addToast("Name and price are required", "error");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price) || 0
      };

      if (editingProduct) {
        await businessService.updateProduct(business.id, editingProduct.id, payload);
        addToast("Product updated successfully", "success");
      } else {
        await businessService.addProduct(business.id, payload);
        addToast("Product added to catalog", "success");
      }
      setIsModalOpen(false);
      loadProducts();
    } catch (err) {
      console.error(err);
      addToast("Failed to save product", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleAvailability = async (product) => {
    try {
      const updated = !product.isAvailable;
      await businessService.updateProduct(business.id, product.id, { isAvailable: updated });
      setProducts(prev => prev.map(p => p.id === product.id ? { ...p, isAvailable: updated } : p));
      addToast(`Marked as ${updated ? "available" : "unavailable"}`, "info");
    } catch (err) {
      addToast("Could not update status", "error");
    }
  };

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;
    try {
      await businessService.deleteProduct(business.id, productToDelete.id);
      setProducts(prev => prev.filter(p => p.id !== productToDelete.id));
      addToast("Product deleted", "success");
    } catch (err) {
      addToast("Failed to delete product", "error");
    } finally {
      setProductToDelete(null);
    }
  };

  const currencySymbol = business?.currencySymbol || "$";

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Products & Services
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage catalog items, adjust pricing, toggle availability, and upload photos.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm shadow-blue-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Item</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search items by name or keywords..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(n => (
            <div key={n} className="h-64 rounded-2xl bg-slate-100 animate-pulse border border-slate-200" />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 mx-auto flex items-center justify-center mb-4">
            <Package className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-slate-900">No items found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {searchQuery ? "Try refining your search terms or category filter." : "Your catalog is empty. Add your first product or service now!"}
          </p>
          <button
            onClick={openAddModal}
            className="mt-6 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700"
          >
            Add First Item
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className={`bg-white rounded-2xl border transition-all duration-200 flex flex-col overflow-hidden shadow-xs hover:shadow-md ${
                !p.isAvailable ? "opacity-75 border-slate-200 bg-slate-50/50" : "border-slate-200/90"
              }`}
            >
              {/* Product Photo */}
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                <img
                  src={p.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-bold bg-white/95 text-slate-800 shadow-xs backdrop-blur-xs">
                  {p.category}
                </span>

                {p.badge && (
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-600 text-white shadow-xs">
                    {p.badge}
                  </span>
                )}

                {!p.isAvailable && (
                  <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-600 text-white shadow-md">
                      Currently Unavailable
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-bold text-base text-slate-900 leading-snug">
                      {p.name}
                    </h3>
                    <div className="font-extrabold text-base text-blue-600 shrink-0">
                      {currencySymbol}{p.price}
                    </div>
                  </div>

                  {p.duration && (
                    <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500 mb-2">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{p.duration}</span>
                    </div>
                  )}

                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mt-1">
                    {p.description}
                  </p>
                </div>

                {/* Card Actions */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleToggleAvailability(p)}
                    title={p.isAvailable ? "Set as unavailable" : "Set as available"}
                    className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                      p.isAvailable ? "text-emerald-700 bg-emerald-50 hover:bg-emerald-100" : "text-slate-600 bg-slate-100 hover:bg-slate-200"
                    }`}
                  >
                    {p.isAvailable ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    <span className="text-[11px]">{p.isAvailable ? "In Stock" : "Hidden"}</span>
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(p)}
                      className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setProductToDelete(p)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-bold text-lg text-slate-900">
                {editingProduct ? "Edit Product / Service" : "Add New Product or Service"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Item Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Heavyweight Organic Tee"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. Tops, Brunch, Hair"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Price ({currencySymbol}) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0.00"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              {business?.template === "salon" && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Service Duration
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g. 45 mins, 1 hour"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed description of features, materials, or ingredients..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Product Image
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none font-mono"
                  />
                  <label className="px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 hover:bg-slate-100 cursor-pointer text-xs font-semibold text-slate-700 flex items-center gap-1.5 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="availCheck"
                  checked={formData.isAvailable}
                  onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <label htmlFor="availCheck" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  Item is available for customer orders
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm shadow-blue-500/20"
                >
                  {submitting ? "Saving..." : editingProduct ? "Update Product" : "Add to Catalog"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(productToDelete)}
        title="Delete Product"
        message={`Are you sure you want to permanently delete "${productToDelete?.name}"?`}
        confirmText="Yes, Delete"
        onConfirm={handleDeleteProduct}
        onClose={() => setProductToDelete(null)}
      />

    </div>
  );
};
