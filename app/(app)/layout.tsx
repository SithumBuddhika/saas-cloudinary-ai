// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { useClerk, useUser } from "@clerk/nextjs";
// import {
//   LogOutIcon,
//   MenuIcon,
//   LayoutDashboardIcon,
//   Share2Icon,
//   UploadIcon,
//   ImageIcon,
// } from "lucide-react";

// const sidebarItems = [
//   { href: "/home", icon: LayoutDashboardIcon, label: "Home Page" },
//   { href: "/social-share", icon: Share2Icon, label: "Social Share" },
//   { href: "/video-upload", icon: UploadIcon, label: "Video Upload" },
// ];

// export default function AppLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const pathname = usePathname();
//   const router = useRouter();
//   const { signOut } = useClerk();
//   const { user } = useUser();

//   const handleLogoClick = () => {
//     router.push("/");
//   };

//   const handleSignOut = async () => {
//     await signOut();
//   };

//   return (
//     <div className="drawer lg:drawer-open">
//       <input
//         id="sidebar-drawer"
//         type="checkbox"
//         className="drawer-toggle"
//         checked={sidebarOpen}
//         onChange={() => setSidebarOpen(!sidebarOpen)}
//       />
//       <div className="flex flex-col drawer-content">
//         {/* Navbar */}
//         <header className="w-full bg-base-200">
//           <div className="px-4 mx-auto navbar max-w-7xl sm:px-6 lg:px-8">
//             <div className="flex-none lg:hidden">
//               <label
//                 htmlFor="sidebar-drawer"
//                 className="btn btn-square btn-ghost drawer-button"
//               >
//                 <MenuIcon />
//               </label>
//             </div>
//             <div className="flex-1">
//               <Link href="/" onClick={handleLogoClick}>
//                 <div className="text-2xl font-bold tracking-tight normal-case cursor-pointer btn btn-ghost">
//                   Cloudinary Showcase
//                 </div>
//               </Link>
//             </div>
//             <div className="flex items-center flex-none space-x-4">
//               {user && (
//                 <>
//                   <div className="avatar">
//                     <div className="w-8 h-8 rounded-full">
//                       <img
//                         src={user.imageUrl}
//                         alt={
//                           user.username || user.emailAddresses[0].emailAddress
//                         }
//                       />
//                     </div>
//                   </div>
//                   <span className="max-w-xs text-sm truncate lg:max-w-md">
//                     {user.username || user.emailAddresses[0].emailAddress}
//                   </span>
//                   <button
//                     onClick={handleSignOut}
//                     className="btn btn-ghost btn-circle"
//                   >
//                     <LogOutIcon className="w-6 h-6" />
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </header>
//         {/* Page content */}
//         <main className="flex-grow">
//           <div className="w-full px-4 mx-auto my-8 max-w-7xl sm:px-6 lg:px-8">
//             {children}
//           </div>
//         </main>
//       </div>
//       <div className="drawer-side">
//         <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>
//         <aside className="flex flex-col w-64 h-full bg-base-200">
//           <div className="flex items-center justify-center py-4">
//             <ImageIcon className="w-10 h-10 text-primary" />
//           </div>
//           <ul className="flex-grow w-full p-4 menu text-base-content">
//             {sidebarItems.map((item) => (
//               <li key={item.href} className="mb-2">
//                 <Link
//                   href={item.href}
//                   className={`flex items-center space-x-4 px-4 py-2 rounded-lg ${
//                     pathname === item.href
//                       ? "bg-primary text-white"
//                       : "hover:bg-base-300"
//                   }`}
//                   onClick={() => setSidebarOpen(false)}
//                 >
//                   <item.icon className="w-6 h-6" />
//                   <span>{item.label}</span>
//                 </Link>
//               </li>
//             ))}
//           </ul>
//           {user && (
//             <div className="p-4">
//               <button
//                 onClick={handleSignOut}
//                 className="w-full btn btn-outline btn-error"
//               >
//                 <LogOutIcon className="w-5 h-5 mr-2" />
//                 Sign Out
//               </button>
//             </div>
//           )}
//         </aside>
//       </div>
//     </div>
//   );
// }
///////////////////////////////////////////'

// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { useClerk, useUser } from "@clerk/nextjs";
// import {
//   LogOut,
//   LayoutDashboard,
//   Share2,
//   Upload,
//   Menu,
//   Sparkles,
// } from "lucide-react";

// const navItems = [
//   { href: "/home", icon: LayoutDashboard, label: "Dashboard" },
//   { href: "/social-share", icon: Share2, label: "Social Media" },
//   { href: "/video-upload", icon: Upload, label: "Upload Video" },
// ];

// export default function AppLayout({ children }: { children: React.ReactNode }) {
//   const [open, setOpen] = useState(false);
//   const pathname = usePathname();
//   const { signOut } = useClerk();
//   const { user } = useUser();

//   return (
//     <div className="drawer lg:drawer-open bg-base-100">
//       <input
//         type="checkbox"
//         className="drawer-toggle"
//         checked={open}
//         onChange={() => setOpen(!open)}
//       />

//       {/* MAIN CONTENT */}
//       <div className="flex flex-col drawer-content">
//         {/* NAVBAR */}
//         <header className="sticky top-0 z-30 border-b border-base-300 bg-base-100/80 backdrop-blur">
//           <div className="px-4 mx-auto navbar max-w-7xl">
//             <div className="flex-none lg:hidden">
//               <button className="btn btn-ghost" onClick={() => setOpen(!open)}>
//                 <Menu />
//               </button>
//             </div>

//             <div className="flex-1 gap-2">
//               <Sparkles className="text-primary" />
//               <span className="text-lg font-bold">Cloudinary Showcase</span>
//             </div>

//             {user && (
//               <div className="flex items-center gap-3">
//                 <div className="hidden text-right sm:block">
//                   <p className="text-sm font-medium">
//                     {user.username || user.emailAddresses[0].emailAddress}
//                   </p>
//                 </div>
//                 <img
//                   src={user.imageUrl}
//                   className="rounded-full w-9 h-9"
//                   alt="avatar"
//                 />
//                 <button
//                   onClick={() => signOut()}
//                   className="btn btn-ghost btn-circle"
//                 >
//                   <LogOut size={18} />
//                 </button>
//               </div>
//             )}
//           </div>
//         </header>

//         {/* PAGE */}
//         <main className="flex-1 w-full px-4 py-6 mx-auto max-w-7xl">
//           {children}
//         </main>
//       </div>

//       {/* SIDEBAR */}
//       <div className="drawer-side">
//         <label className="drawer-overlay" onClick={() => setOpen(false)} />

//         <aside className="flex flex-col p-4 w-72 bg-base-200">
//           <nav className="gap-1 menu">
//             {navItems.map((item) => {
//               const active = pathname === item.href;
//               return (
//                 <Link
//                   key={item.href}
//                   href={item.href}
//                   className={`flex items-center gap-3 rounded-xl px-4 py-3 transition
//                     ${
//                       active
//                         ? "bg-primary text-primary-content"
//                         : "hover:bg-base-300"
//                     }`}
//                 >
//                   <item.icon size={20} />
//                   <span>{item.label}</span>
//                 </Link>
//               );
//             })}
//           </nav>

//           <div className="pt-4 mt-auto">
//             <button
//               onClick={() => signOut()}
//               className="w-full btn btn-outline btn-error"
//             >
//               <LogOut size={18} />
//               Sign Out
//             </button>
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// }

//////////////////////////////////////////////////

// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useClerk, useUser } from "@clerk/nextjs";
// import { LayoutDashboard, Share2, Upload, Menu, LogOut } from "lucide-react";

// const navItems = [
//   { href: "/home", icon: LayoutDashboard, label: "Dashboard" },
//   { href: "/social-share", icon: Share2, label: "Social Media" },
//   { href: "/video-upload", icon: Upload, label: "Upload Video" },
// ];

// export default function AppLayout({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname();
//   const { signOut } = useClerk();
//   const { user } = useUser();
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="drawer lg:drawer-open">
//       <input
//         type="checkbox"
//         className="drawer-toggle"
//         checked={open}
//         onChange={() => setOpen(!open)}
//       />

//       <div className="flex flex-col min-h-screen drawer-content">
//         {/* Topbar */}
//         <header className="sticky top-0 z-30 border-b border-white/10 bg-black/30 backdrop-blur">
//           <div className="flex items-center justify-between px-4 py-3 mx-auto max-w-7xl">
//             <div className="flex items-center gap-3">
//               <button
//                 className="btn btn-ghost btn-sm lg:hidden"
//                 onClick={() => setOpen(true)}
//               >
//                 <Menu size={18} />
//               </button>

//               <div className="flex items-center gap-2">
//                 <div className="flex items-center justify-center border h-9 w-9 rounded-xl bg-white/10 border-white/10">
//                   ✦
//                 </div>
//                 <div>
//                   <p className="font-bold leading-tight">Cloudinary Showcase</p>
//                   <p className="text-xs opacity-60 -mt-0.5">
//                     Media optimization dashboard
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {user && (
//               <div className="flex items-center gap-3">
//                 <div className="hidden text-right sm:block">
//                   <p className="text-sm font-medium leading-tight">
//                     {user.username || user.emailAddresses[0].emailAddress}
//                   </p>
//                   <p className="text-xs leading-tight opacity-60">Signed in</p>
//                 </div>
//                 <img
//                   src={user.imageUrl}
//                   className="border rounded-full w-9 h-9 border-white/10"
//                   alt="avatar"
//                 />
//                 <button
//                   className="btn btn-ghost btn-circle btn-sm"
//                   onClick={() => signOut()}
//                 >
//                   <LogOut size={18} />
//                 </button>
//               </div>
//             )}
//           </div>
//         </header>

//         {/* Content */}
//         <main className="flex-1">
//           <div className="px-4 py-8 mx-auto max-w-7xl">
//             <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur p-6 shadow-[0_0_80px_rgba(0,0,0,0.5)]">
//               {children}
//             </div>
//           </div>
//         </main>
//       </div>

//       {/* Sidebar */}
//       <div className="drawer-side">
//         <label className="drawer-overlay" onClick={() => setOpen(false)} />
//         <aside className="min-h-screen p-4 border-r w-80 bg-black/40 backdrop-blur border-white/10">
//           <div className="px-2 pt-2 pb-4">
//             <p className="text-xs tracking-wider uppercase opacity-60">
//               Navigation
//             </p>
//           </div>

//           <nav className="space-y-1">
//             {navItems.map((item) => {
//               const active = pathname === item.href;
//               return (
//                 <Link
//                   key={item.href}
//                   href={item.href}
//                   onClick={() => setOpen(false)}
//                   className={`flex items-center gap-3 px-4 py-3 rounded-xl transition
//                     ${
//                       active
//                         ? "bg-white/10 border border-white/10"
//                         : "hover:bg-white/5"
//                     }`}
//                 >
//                   <item.icon size={18} className="opacity-90" />
//                   <span className="font-medium">{item.label}</span>
//                 </Link>
//               );
//             })}
//           </nav>

//           <div className="pt-6 mt-6 border-t border-white/10">
//             <button
//               className="w-full btn btn-outline btn-error"
//               onClick={() => signOut()}
//             >
//               <LogOut size={18} />
//               Sign Out
//             </button>
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import Link from "next/link";
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
      <div className="px-5 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 border rounded-xl bg-white/10 border-white/10">
            ✦
          </div>
          <div>
            <p className="font-bold leading-tight">Cloudinary Showcase</p>
            <p className="text-xs text-white/60 -mt-0.5">
              Media optimization dashboard
            </p>
          </div>
        </div>
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
      <div className="sticky top-0 z-40 border-b md:hidden border-white/10 bg-black/35 backdrop-blur-xl">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            className="p-2 rounded-lg hover:bg-white/10"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={20} />
          </button>

          <p className="font-semibold">Cloudinary Showcase</p>

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
