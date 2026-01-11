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

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  LogOut,
  LayoutDashboard,
  Share2,
  Upload,
  Menu,
  Sparkles,
} from "lucide-react";

const navItems = [
  { href: "/home", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/social-share", icon: Share2, label: "Social Media" },
  { href: "/video-upload", icon: Upload, label: "Upload Video" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { signOut } = useClerk();
  const { user } = useUser();

  return (
    <div className="drawer lg:drawer-open bg-base-100">
      <input
        type="checkbox"
        className="drawer-toggle"
        checked={open}
        onChange={() => setOpen(!open)}
      />

      {/* MAIN CONTENT */}
      <div className="flex flex-col drawer-content">
        {/* NAVBAR */}
        <header className="sticky top-0 z-30 border-b border-base-300 bg-base-100/80 backdrop-blur">
          <div className="px-4 mx-auto navbar max-w-7xl">
            <div className="flex-none lg:hidden">
              <button className="btn btn-ghost" onClick={() => setOpen(!open)}>
                <Menu />
              </button>
            </div>

            <div className="flex-1 gap-2">
              <Sparkles className="text-primary" />
              <span className="text-lg font-bold">Cloudinary Showcase</span>
            </div>

            {user && (
              <div className="flex items-center gap-3">
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-medium">
                    {user.username || user.emailAddresses[0].emailAddress}
                  </p>
                </div>
                <img
                  src={user.imageUrl}
                  className="rounded-full w-9 h-9"
                  alt="avatar"
                />
                <button
                  onClick={() => signOut()}
                  className="btn btn-ghost btn-circle"
                >
                  <LogOut size={18} />
                </button>
              </div>
            )}
          </div>
        </header>

        {/* PAGE */}
        <main className="flex-1 w-full px-4 py-6 mx-auto max-w-7xl">
          {children}
        </main>
      </div>

      {/* SIDEBAR */}
      <div className="drawer-side">
        <label className="drawer-overlay" onClick={() => setOpen(false)} />

        <aside className="flex flex-col p-4 w-72 bg-base-200">
          <nav className="gap-1 menu">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 transition
                    ${
                      active
                        ? "bg-primary text-primary-content"
                        : "hover:bg-base-300"
                    }`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 mt-auto">
            <button
              onClick={() => signOut()}
              className="w-full btn btn-outline btn-error"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
