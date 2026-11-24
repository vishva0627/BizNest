import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { 
  Globe, 
  ExternalLink, 
  Copy, 
  Check, 
  QrCode, 
  Smartphone, 
  Monitor, 
  Share2, 
  Palette,
  CheckCircle2
} from "lucide-react";

export const MyWebsitePage = () => {
  const { business } = useAuth();
  const { addToast } = useToast();
  const [copied, setCopied] = useState(false);
  const [previewDevice, setPreviewDevice] = useState("desktop");

  const fullUrl = `${window.location.origin}/store/${business?.slug || "urban-vogue"}`;

  const copyUrl = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    addToast("Store URL copied to clipboard!", "success");
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            My Public Website
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Your store's live digital identity, accessible by any customer worldwide.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/dashboard/builder"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-xs"
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Customize Design</span>
          </Link>
          <a
            href={fullUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm shadow-blue-500/20"
          >
            <span>Open In New Tab</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* URL Banner */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Storefront Public Address
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-sm sm:text-base font-bold text-slate-900 break-all">
              {fullUrl}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={copyUrl}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-2 shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Link</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Live Preview Container with Device Frame */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-900">Interactive Store Preview</span>
            <span className="text-[11px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-semibold">
              Template: {business?.template || "retail"}
            </span>
          </div>

          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => setPreviewDevice("desktop")}
              className={`p-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                previewDevice === "desktop" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500"
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span className="hidden sm:inline">Desktop</span>
            </button>
            <button
              onClick={() => setPreviewDevice("mobile")}
              className={`p-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                previewDevice === "mobile" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500"
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span className="hidden sm:inline">Mobile</span>
            </button>
          </div>
        </div>

        {/* The Frame */}
        <div className="flex justify-center bg-slate-100/70 p-4 rounded-xl overflow-hidden border border-slate-200/80">
          <div
            className={`transition-all duration-300 shadow-2xl overflow-hidden border border-slate-300 bg-white ${
              previewDevice === "desktop"
                ? "w-full h-[620px] rounded-xl"
                : "w-[390px] h-[680px] rounded-[36px] border-[10px] border-slate-800"
            }`}
          >
            <iframe
              src={`/store/${business?.slug || "urban-vogue"}`}
              title="Storefront Live Preview"
              className="w-full h-full border-none"
            />
          </div>
        </div>
      </div>

    </div>
  );
};
