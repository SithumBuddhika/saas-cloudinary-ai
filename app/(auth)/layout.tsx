// export default function AuthLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="grid min-h-screen lg:grid-cols-2 bg-base-100">
//       {/* LEFT: BRAND / INFO */}
//       <div className="flex-col justify-center hidden px-16 lg:flex bg-gradient-to-br from-primary to-secondary text-primary-content">
//         <h1 className="mb-4 text-4xl font-bold">Cloudinary Showcase</h1>
//         <p className="max-w-md text-lg opacity-90">
//           Upload, optimize, and transform your media using Cloudinary. A modern
//           SaaS demo built with Next.js, Prisma, and Clerk.
//         </p>

//         <div className="mt-10 text-sm opacity-80">
//           © {new Date().getFullYear()} Cloudinary Showcase
//         </div>
//       </div>

//       {/* RIGHT: AUTH FORM */}
//       <div className="flex items-center justify-center px-6">
//         <div className="w-full max-w-md">{children}</div>
//       </div>
//     </div>
//   );
// }

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left marketing panel */}
      <div className="flex-col justify-center hidden px-16 lg:flex">
        <div className="max-w-lg">
          <h1 className="mt-6 text-5xl font-bold tracking-tight">
            Media optimization,
            <span className="block text-white/70">done beautifully.</span>
          </h1>

          <p className="mt-5 text-lg text-white/70">
            Upload, optimize, and transform your media using Cloudinary —
            powered by Next.js, Prisma, and Clerk.
          </p>

          <div className="mt-10 text-sm text-white/50">
            © {new Date().getFullYear()} Cloudinary Showcase <br />©{" "}
            {new Date().getFullYear()} Sithum Buddhika Jayalal
          </div>
        </div>
      </div>

      {/* Right auth card */}
      <div className="flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_120px_rgba(0,0,0,0.6)] p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
