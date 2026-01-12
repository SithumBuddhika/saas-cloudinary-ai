"use client";

import React from "react";

type Props = {
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({
  open,
  title = "Confirm",
  description = "Are you sure?",
  confirmText = "Delete",
  cancelText = "Cancel",
  loading = false,
  onConfirm,
  onCancel,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center px-4">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={loading ? undefined : onCancel}
      />

      {/* modal */}
      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#0b0c12]/90 p-5 shadow-[0_0_80px_rgba(0,0,0,0.7)]">
        <h3 className="text-lg font-bold text-white/95">{title}</h3>
        <p className="mt-2 text-sm text-white/65">{description}</p>

        <div className="flex items-center justify-end gap-2 mt-5">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 text-sm font-semibold transition border rounded-2xl border-white/10 bg-white/5 text-white/80 hover:bg-white/10 disabled:opacity-60"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_30px_rgba(244,63,94,0.25)] transition hover:brightness-110 disabled:opacity-60"
          >
            {loading ? "Deleting..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
