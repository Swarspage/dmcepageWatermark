"use client";

import React, { useState, useEffect } from "react";
import { Share2, Copy, Check, QrCode, X, MessageSquareShare } from "lucide-react";
import LinearButton from "./LinearButton";
import { playPopSound } from "../utils/audio";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShareModal({ isOpen, onClose }: ShareModalProps) {
  const [shareUrl, setShareUrl] = useState<string>("");
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    playPopSound();
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyInvite = () => {
    playPopSound();
    const text = `Hey! Check out DMCE PageX — instantly stamp official Datta Meghe header logos and watermarks locally with zero server uploads. Try it here: ${shareUrl}`;
    navigator.clipboard.writeText(text);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2500);
  };

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(
    shareUrl || "https://dmce.edu"
  )}&color=EDEDEF&bgcolor=0a0a0f&margin=12`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050506]/85 backdrop-blur-xl p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#0a0a0f] border border-white/[0.12] rounded-2xl shadow-2xl w-full max-w-lg p-6 flex flex-col relative overflow-hidden animate-in zoom-in-95 duration-200 space-y-6">
        {/* Top Highlight */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#5E6AD2]/50 to-transparent pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#5E6AD2]/15 border border-[#5E6AD2]/30 flex items-center justify-center text-[#5E6AD2]">
              <Share2 className="w-4 h-4" />
            </div>
            <div className="flex flex-col text-left">
              <h3 className="text-base font-semibold text-white">
                Share DMCE PageX With Your Class
              </h3>
              <span className="text-xs font-mono text-[#8A8F98]">
                INSTANT LAB &amp; ASSIGNMENT ACCESS
              </span>
            </div>
          </div>
          <LinearButton
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="!p-2 text-[#8A8F98] hover:!text-white"
          >
            <X className="w-5 h-5" />
          </LinearButton>
        </div>

        {/* Customizable Subdomain URL Input */}
        <div className="space-y-2 text-left">
          <label className="text-xs font-mono text-[#8A8F98] block uppercase tracking-wider">
            Your Deployed Tool Link (Editable if testing locally)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={shareUrl}
              onChange={(e) => setShareUrl(e.target.value)}
              placeholder="https://pagex.yoursubdomain.com"
              className="flex-1 px-3.5 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.1] text-sm text-white focus:outline-none focus:border-[#5E6AD2] font-mono transition-colors"
            />
            <LinearButton
              type="button"
              variant={copiedLink ? "secondary" : "primary"}
              size="md"
              onClick={handleCopyLink}
              leftIcon={
                copiedLink ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )
              }
            >
              {copiedLink ? "Copied!" : "Copy"}
            </LinearButton>
          </div>
        </div>

        {/* Live Scannable QR Code */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] flex flex-col items-center justify-center space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[#8A8F98] uppercase tracking-wider">
            <QrCode className="w-4 h-4 text-[#5E6AD2]" />
            <span>Scan in College Lab for Instant Phone/Laptop Access</span>
          </div>
          <div className="p-3 rounded-xl bg-[#0a0a0f] border border-white/10 shadow-inner">
            <img
              src={qrCodeUrl}
              alt="DMCE PageX QR Code"
              className="w-48 h-48 rounded-lg object-contain"
            />
          </div>
        </div>

        {/* One-Click Class Invite Copy */}
        <div className="pt-2">
          <LinearButton
            type="button"
            variant="secondary"
            size="lg"
            onClick={handleCopyInvite}
            leftIcon={
              copiedMessage ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <MessageSquareShare className="w-4 h-4 text-[#5E6AD2]" />
              )
            }
            className="w-full justify-center"
          >
            {copiedMessage ? "Invite Text Copied to Clipboard!" : "Copy Class Invitation Message"}
          </LinearButton>
        </div>
      </div>
    </div>
  );
}
