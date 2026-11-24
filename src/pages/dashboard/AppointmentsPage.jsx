import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { businessService } from "../../services/businessService";
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  MessageSquare, 
  CheckCircle2, 
  XCircle, 
  Filter, 
  Search,
  Sparkles
} from "lucide-react";

export const AppointmentsPage = () => {
  const { business } = useAuth();
  const { addToast } = useToast();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    if (!business?.id) return;
    loadAppointments();
  }, [business?.id]);

  const loadAppointments = async () => {
    setLoading(true);
    try {
      const data = await businessService.getAppointments(business.id);
      setAppointments(data);
    } catch (err) {
      console.error(err);
      addToast("Failed to load appointments", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (aptId, newStatus) => {
    try {
      await businessService.updateAppointmentStatus(business.id, aptId, newStatus);
      setAppointments(prev => prev.map(a => a.id === aptId ? { ...a, status: newStatus } : a));
      addToast(`Appointment updated to ${newStatus}`, "success");
    } catch (err) {
      addToast("Failed to update appointment", "error");
    }
  };

  const getWhatsAppLink = (apt) => {
    if (!apt.customerPhone) return "#";
    const cleanPhone = apt.customerPhone.replace(/[^0-9]/g, "");
    const msg = `Hello ${apt.customerName}! This is ${business?.name}. Confirming your appointment for ${apt.serviceName} on ${apt.appointmentDate} at ${apt.appointmentTime}. See you soon!`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
  };

  const filtered = appointments.filter(a => {
    const matchesSearch = 
      a.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.serviceName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.customerPhone?.includes(searchQuery);
    const matchesStatus = statusFilter === "All" || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const currencySymbol = business?.currencySymbol || "$";

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Appointment Bookings
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage scheduled customer consultations, styling sessions, and therapy slots.
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
            placeholder="Search by customer name or service..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          {["All", "Pending", "Confirmed", "Completed", "Cancelled"].map((st) => (
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

      {/* Bookings Grid */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(n => (
            <div key={n} className="h-28 bg-slate-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-pink-50 text-pink-600 mx-auto flex items-center justify-center mb-4">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-slate-900">No appointments scheduled</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            When visitors use the booking widget on your public site, appointments will show here with instant date and time slot validation.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((apt) => (
            <div
              key={apt.id}
              className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-bold text-base text-slate-900">
                      {apt.serviceName}
                    </h3>
                    <div className="text-xs font-semibold text-blue-600 mt-0.5">
                      {currencySymbol}{apt.servicePrice}
                    </div>
                  </div>
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
                    apt.status === "Confirmed"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : apt.status === "Completed"
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : apt.status === "Cancelled"
                      ? "bg-rose-50 text-rose-700 border border-rose-200"
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}>
                    {apt.status}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-600 mb-4">
                  <div className="flex items-center gap-2 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>{apt.appointmentDate} at {apt.appointmentTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-bold text-slate-800">{apt.customerName}</span>
                    {apt.stylist && <span className="text-slate-400">({apt.stylist})</span>}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{apt.customerPhone}</span>
                  </div>
                  {apt.notes && (
                    <div className="text-[11px] text-slate-500 italic pt-1 border-t border-slate-200/60">
                      Note: {apt.notes}
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  {apt.status !== "Confirmed" && (
                    <button
                      onClick={() => handleUpdateStatus(apt.id, "Confirmed")}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors"
                    >
                      Confirm
                    </button>
                  )}
                  {apt.status !== "Completed" && (
                    <button
                      onClick={() => handleUpdateStatus(apt.id, "Completed")}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
                    >
                      Complete
                    </button>
                  )}
                </div>

                {apt.customerPhone && (
                  <a
                    href={getWhatsAppLink(apt)}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors flex items-center gap-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
