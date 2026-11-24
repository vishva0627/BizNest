import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { businessService } from "../../services/businessService";
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  MessageSquare, 
  Phone, 
  Mail, 
  ExternalLink,
  ChevronRight,
  X
} from "lucide-react";

export const OrdersPage = () => {
  const { business } = useAuth();
  const { addToast } = useToast();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (!business?.id) return;
    loadOrders();
  }, [business?.id]);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await businessService.getOrders(business.id);
      setOrders(data);
    } catch (err) {
      console.error(err);
      addToast("Failed to load orders", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await businessService.updateOrderStatus(business.id, orderId, newStatus);
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(prev => ({ ...prev, status: newStatus }));
      }
      addToast(`Order marked as ${newStatus}`, "success");
    } catch (err) {
      addToast("Failed to update order status", "error");
    }
  };

  const getWhatsAppLink = (order) => {
    if (!order.customerPhone) return "#";
    const cleanPhone = order.customerPhone.replace(/[^0-9]/g, "");
    const itemsText = order.items?.map(i => `${i.quantity}x ${i.name}`).join(", ") || "";
    const msg = `Hello ${order.customerName}! Thank you for your order at ${business?.name}. We are reviewing your order (${itemsText}) totaling ${business?.currencySymbol || "$"}${order.totalAmount}. Let us know if you have any questions!`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
  };

  const filteredOrders = orders.filter(o => {
    const matchesSearch = 
      o.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerPhone?.includes(searchQuery);
    const matchesStatus = statusFilter === "All" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const currencySymbol = business?.currencySymbol || "$";

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Customer Orders
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Review incoming enquiry orders, manage order statuses, and message customers directly.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by customer name, phone, or email..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          {["All", "Pending", "In Progress", "Completed", "Cancelled"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(n => (
            <div key={n} className="h-20 bg-slate-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 mx-auto flex items-center justify-center mb-4">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-slate-900">No orders found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {searchQuery ? "Try resetting your search query or status filter." : "Orders placed by customers on your public website will appear here in real-time."}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs divide-y divide-slate-100 overflow-hidden">
          {filteredOrders.map((ord) => (
            <div
              key={ord.id}
              className="p-5 hover:bg-slate-50/60 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-bold text-slate-900 text-sm">
                    {ord.customerName}
                  </span>
                  <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold ${
                    ord.status === "Completed"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : ord.status === "In Progress"
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : ord.status === "Cancelled"
                      ? "bg-rose-50 text-rose-700 border border-rose-200"
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}>
                    {ord.status}
                  </span>
                  <span className="text-xs text-slate-400">
                    {new Date(ord.createdAt).toLocaleString()}
                  </span>
                </div>

                <div className="text-xs text-slate-600 flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{ord.customerPhone}</span>
                  </span>
                  {ord.customerEmail && (
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>{ord.customerEmail}</span>
                    </span>
                  )}
                  {ord.deliveryMethod && (
                    <span className="text-[11px] bg-slate-100 px-2 py-0.5 rounded font-medium text-slate-700">
                      {ord.deliveryMethod}
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-500 mt-2 font-medium">
                  Items: {ord.items?.map(i => `${i.quantity}x ${i.name}`).join(", ") || "No items listed"}
                </div>
              </div>

              {/* Price & Actions */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right pr-2">
                  <div className="text-base font-extrabold text-slate-900">
                    {currencySymbol}{ord.totalAmount}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {ord.items?.length || 0} item(s)
                  </div>
                </div>

                {ord.customerPhone && (
                  <a
                    href={getWhatsAppLink(ord)}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                    title="Message Customer on WhatsApp"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </a>
                )}

                <button
                  onClick={() => setSelectedOrder(ord)}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Manage
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-lg text-slate-900">
                  Order Details ({selectedOrder.id})
                </h3>
                <span className="text-xs text-slate-400">
                  Placed {new Date(selectedOrder.createdAt).toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              
              {/* Customer Info Card */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                <div className="font-bold text-slate-900 text-sm">{selectedOrder.customerName}</div>
                <div className="text-slate-600">Phone: {selectedOrder.customerPhone}</div>
                {selectedOrder.customerEmail && (
                  <div className="text-slate-600">Email: {selectedOrder.customerEmail}</div>
                )}
                {selectedOrder.notes && (
                  <div className="pt-2 text-slate-700 italic border-t border-slate-200">
                    "Notes: {selectedOrder.notes}"
                  </div>
                )}
              </div>

              {/* Items List */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Items Ordered
                </h4>
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                  {selectedOrder.items?.map((item, idx) => (
                    <div key={idx} className="p-3 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-slate-800">{item.name}</span>
                        <span className="text-slate-400 ml-2">x{item.quantity}</span>
                      </div>
                      <span className="font-extrabold text-slate-900">
                        {currencySymbol}{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  <div className="p-3 bg-slate-50 flex items-center justify-between text-sm font-extrabold text-slate-900">
                    <span>Total Order Amount</span>
                    <span>{currencySymbol}{selectedOrder.totalAmount}</span>
                  </div>
                </div>
              </div>

              {/* Status Update Buttons */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Update Status
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {["Pending", "In Progress", "Completed", "Cancelled"].map((st) => (
                    <button
                      key={st}
                      onClick={() => handleUpdateStatus(selectedOrder.id, st)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold transition-all ${
                        selectedOrder.status === st
                          ? "bg-slate-900 text-white shadow-xs"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* WhatsApp direct contact */}
              {selectedOrder.customerPhone && (
                <div className="pt-2">
                  <a
                    href={getWhatsAppLink(selectedOrder)}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Open WhatsApp Chat with Customer</span>
                  </a>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
