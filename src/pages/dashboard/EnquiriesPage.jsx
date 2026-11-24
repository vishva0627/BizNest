import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { businessService } from "../../services/businessService";
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  Clock, 
  CheckCircle2, 
  Search, 
  Filter, 
  ExternalLink 
} from "lucide-react";

export const EnquiriesPage = () => {
  const { business } = useAuth();
  const { addToast } = useToast();

  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!business?.id) return;
    loadEnquiries();
  }, [business?.id]);

  const loadEnquiries = async () => {
    setLoading(true);
    try {
      const data = await businessService.getEnquiries(business.id);
      setEnquiries(data);
    } catch (err) {
      console.error(err);
      addToast("Failed to load customer enquiries", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleRead = async (enquiry) => {
    try {
      const updated = !enquiry.isRead;
      await businessService.updateEnquiryStatus(business.id, enquiry.id, { isRead: updated });
      setEnquiries(prev => prev.map(e => e.id === enquiry.id ? { ...e, isRead: updated } : e));
      addToast(`Marked as ${updated ? "read" : "unread"}`, "info");
    } catch (err) {
      addToast("Failed to update enquiry", "error");
    }
  };

  const handleMarkReplied = async (enquiry) => {
    try {
      await businessService.updateEnquiryStatus(business.id, enquiry.id, { status: "Replied", isRead: true });
      setEnquiries(prev => prev.map(e => e.id === enquiry.id ? { ...e, status: "Replied", isRead: true } : e));
      addToast("Marked as replied", "success");
    } catch (err) {
      addToast("Failed to update status", "error");
    }
  };

  const filtered = enquiries.filter(e => {
    return e.senderName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.message?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Customer Enquiries
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Questions, catering queries, and wholesale inquiries submitted via your website contact form.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search enquiries by sender name or keyword..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>

      {/* Enquiries Inbox */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(n => (
            <div key={n} className="h-32 bg-slate-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 mx-auto flex items-center justify-center mb-4">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-slate-900">Inbox empty</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Customers can send you questions directly from the contact section of your storefront.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((enq) => (
            <div
              key={enq.id}
              className={`p-6 rounded-2xl border transition-all duration-200 bg-white ${
                !enq.isRead ? "border-blue-300 ring-2 ring-blue-50 shadow-md" : "border-slate-200/90 shadow-xs"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-900 text-sm">{enq.senderName}</span>
                  {!enq.isRead && (
                    <span className="text-[10px] bg-blue-600 text-white font-bold px-2 py-0.5 rounded-full">
                      New
                    </span>
                  )}
                  {enq.status === "Replied" && (
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                      Replied
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-400">
                  {new Date(enq.createdAt).toLocaleString()}
                </span>
              </div>

              {enq.subject && (
                <div className="text-xs font-bold text-slate-800 mb-2">
                  Subject: {enq.subject}
                </div>
              )}

              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
                {enq.message}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  {enq.senderEmail && (
                    <a
                      href={`mailto:${enq.senderEmail}`}
                      className="flex items-center gap-1.5 hover:text-blue-600"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>{enq.senderEmail}</span>
                    </a>
                  )}
                  {enq.senderPhone && (
                    <a
                      href={`tel:${enq.senderPhone}`}
                      className="flex items-center gap-1.5 hover:text-blue-600"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{enq.senderPhone}</span>
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleRead(enq)}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    {enq.isRead ? "Mark Unread" : "Mark Read"}
                  </button>
                  {enq.status !== "Replied" && (
                    <button
                      onClick={() => handleMarkReplied(enq)}
                      className="px-3 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
                    >
                      Mark as Replied
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
