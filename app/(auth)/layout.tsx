export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2 bg-base-100">
      {/* LEFT: BRAND / INFO */}
      <div className="flex-col justify-center hidden px-16 lg:flex bg-gradient-to-br from-primary to-secondary text-primary-content">
        <h1 className="mb-4 text-4xl font-bold">Cloudinary Showcase</h1>
        <p className="max-w-md text-lg opacity-90">
          Upload, optimize, and transform your media using Cloudinary. A modern
          SaaS demo built with Next.js, Prisma, and Clerk.
        </p>

        <div className="mt-10 text-sm opacity-80">
          © {new Date().getFullYear()} Cloudinary Showcase
        </div>
      </div>

      {/* RIGHT: AUTH FORM */}
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
