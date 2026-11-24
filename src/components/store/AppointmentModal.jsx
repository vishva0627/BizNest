import React, { useState } from "react";
import { businessService } from "../../services/businessService";
import { useToast } from "../../context/ToastContext";
import confetti from "canvas-confetti";
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Sparkles,
  MessageSquare
} from "lucide-react";

export const AppointmentModal = ({ business, preselectedService, onClose }) => {
  const { addToast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [booked, setBooked] = useState(null);

  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    serviceName: preselectedService?.name || "Consultation & Styling",
    servicePrice: preselectedService?.price || 50,
    appointmentDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    appointmentTime: "11:00 AM",
    stylist: "Lead Specialist",
    notes: ""
  });

  const timeSlots = [
    "09:30 AM", "11:00 AM", "12:30 PM", "02:00 PM", "03:30 PM", "05:00 PM"
  ];

  const themeColor = business?.themeColor || "#be185d";
  const currencySymbol = business?.currencySymbol || "$";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.customerPhone) {
      addToast("Name and phone number are required", "error");
      return;
    }

    setSubmitting(true);
    try {
      const created = await businessService.createAppointment(business.id, formData);
      setBooked(created);

      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {}

      addToast("Appointment request submitted!", "success");
    } catch (err) {
      console.error(err);
      addToast("Failed to book appointment", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const getWhatsAppBookingUrl = () => {
    const phone = business?.contact?.whatsapp || business?.contact?.phone || "";
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    const msg = `*New Appointment Request for ${business?.name}*\n` +
      `*Client:* ${booked?.customerName}\n` +
      `*Phone:* ${booked?.customerPhone}\n` +
      `*Service:* ${booked?.serviceName} (${currencySymbol}${booked?.servicePrice})\n` +
      `*Slot:* ${booked?.appointmentDate} at ${booked?.appointmentTime}\n` +
      (booked?.notes ? `*Notes:* ${booked.notes}` : "");

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-slate-800" />
            <h3 className="font-extrabold text-base text-slate-900">
              {booked ? "Booking Confirmed" : "Book an Appointment"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {booked ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-extrabold text-lg text-slate-900">
              Appointment Slot Reserved!
            </h4>
            <p className="text-xs text-slate-600 max-w-xs mx-auto">
              We look forward to seeing you, <span className="font-bold">{booked.customerName}</span>. Your slot for <span className="font-bold">{booked.serviceName}</span> is requested for <span className="font-bold">{booked.appointmentDate} at {booked.appointmentTime}</span>.
            </p>

            <div className="pt-4">
              <a
                href={getWhatsAppBookingUrl()}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Confirm on WhatsApp with Store</span>
              </a>
            </div>

            <button
              onClick={onClose}
              className="mt-4 px-6 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            
            {/* Service & Price */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Service Selected
                </span>
                <span className="font-bold text-sm text-slate-900">{formData.serviceName}</span>
              </div>
              <span className="font-extrabold text-base text-slate-900">
                {currencySymbol}{formData.servicePrice}
              </span>
            </div>

            {/* Date Picker */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Preferred Date *
              </label>
              <input
                type="date"
                required
                value={formData.appointmentDate}
                onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            {/* Time Slots */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Available Time Slots *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setFormData({ ...formData, appointmentTime: slot })}
                    className={`py-2 px-2 rounded-xl text-xs font-bold border transition-colors ${
                      formData.appointmentTime === slot
                        ? "border-slate-900 bg-slate-900 text-white shadow-xs"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                placeholder="e.g. Mia Jenkins"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Phone Number (For Confirmation) *
              </label>
              <input
                type="tel"
                required
                value={formData.customerPhone}
                onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                placeholder="e.g. +1 (555) 234-5678"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Special Requests or Notes
              </label>
              <textarea
                rows="2"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Specific stylist preference, skin sensitivities..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                style={{ backgroundColor: themeColor }}
                className="w-full py-3 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:opacity-90 disabled:opacity-50 transition-all"
              >
                {submitting ? "Booking..." : "Submit Appointment Request"}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
