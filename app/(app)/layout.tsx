"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import { LayoutDashboard, Share2, Upload, LogOut, Menu, X } from "lucide-react";

const navItems = [
  { href: "/home", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/social-share", icon: Share2, label: "Social Media" },
  { href: "/video-upload", icon: Upload, label: "Upload Video" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { signOut } = useClerk();
  const { user } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);

  const Sidebar = () => (
    <aside className="h-screen border-r w-72 shrink-0 border-white/10 bg-black/35 backdrop-blur-xl">
      {/* Brand header */}
      <div className="px-5 py-5 border-b border-white/10">
        <Link
          href="/home"
          className="flex items-center gap-4"
          onClick={() => setMobileOpen(false)}
        >
          {/* ✅ BIG logo, no glass box */}
          <div className="relative h-14 w-14 shrink-0">
            <Image
              src="/brand/logo.png"
              alt="Cloudinary Showcase"
              fill
              priority
              className="object-contain"
            />
          </div>

          {/* Keep text if you want; remove these 2 lines if you want ONLY logo */}
          <div className="min-w-0">
            <p className="font-bold leading-tight truncate">
              Cloudinary Showcase
            </p>
            <p className="truncate text-xs text-white/60 -mt-0.5">
              Media optimization dashboard
            </p>
          </div>
        </Link>
      </div>

      <div className="p-4">
        <p className="mb-3 text-xs tracking-wider uppercase text-white/50">
          Navigation
        </p>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition
                  ${
                    active
                      ? "bg-white/10 border border-white/10"
                      : "hover:bg-white/5"
                  }`}
              >
                <item.icon size={18} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="pt-6 mt-6 border-t border-white/10">
          <button
            className="flex items-center justify-center w-full gap-2 px-4 py-3 transition border rounded-xl border-white/10 bg-white/5 hover:bg-white/10"
            onClick={() => signOut()}
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen">
      {/* Mobile topbar */}
      <div className="sticky top-0 z-40 border-b border-white/10 bg-black/35 backdrop-blur-xl md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            className="p-2 rounded-lg hover:bg-white/10"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={20} />
          </button>

          {/* ✅ Logo in mobile header */}
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <Image
                src="/brand/logo.png"
                alt="Cloudinary Showcase"
                fill
                className="object-contain"
              />
            </div>
            <p className="font-semibold">Cloudinary Showcase</p>
          </div>

          <div className="w-10" />
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden md:flex">
        <Sidebar />

        <div className="flex-1 min-w-0">
          {/* Top bar */}
          <header className="sticky top-0 z-30 border-b border-white/10 bg-black/25 backdrop-blur-xl">
            <div className="flex items-center justify-end px-6 py-4">
              {user && (
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-medium leading-tight">
                      {user.username || user.emailAddresses[0].emailAddress}
                    </p>
                    <p className="text-xs text-white/60">Signed in</p>
                  </div>

                  <img
                    src={user.imageUrl}
                    alt="avatar"
                    className="w-10 h-10 border rounded-full border-white/10"
                  />

                  <button
                    className="p-2 rounded-lg hover:bg-white/10"
                    onClick={() => signOut()}
                    title="Sign out"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              )}
            </div>
          </header>

          {/* Content */}
          <main className="px-6 py-8">
            <div className="mx-auto max-w-7xl">{children}</div>
          </main>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-0 left-0 h-full">
            <div className="relative">
              <button
                className="absolute z-10 p-2 rounded-lg right-3 top-3 hover:bg-white/10"
                onClick={() => setMobileOpen(false)}
              >
                <X size={18} />
              </button>
              <Sidebar />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
