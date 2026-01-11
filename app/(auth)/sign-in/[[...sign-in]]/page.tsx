import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Page() {
  return (
    <SignIn
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#8b5cf6",
          colorBackground: "rgba(0,0,0,0)",
          borderRadius: "18px",
        },
        elements: {
          // the outside wrapper Clerk uses
          rootBox: "w-full",
          cardBox: "w-full max-w-[420px]",

          // our glass card (this is the IMPORTANT part)
          card: "bg-black/45 backdrop-blur-xl border border-white/12 shadow-[0_0_90px_rgba(0,0,0,0.55)] rounded-[26px] p-0 overflow-hidden",

          // spacing inside
          main: "px-8 py-8",
          headerTitle: "text-2xl font-bold text-white",
          headerSubtitle: "text-white/70",

          // social button
          socialButtonsBlockButton:
            "bg-white/5 border border-white/12 hover:bg-white/10 text-white rounded-xl py-3 transition",
          socialButtonsBlockButtonText: "text-white font-medium",

          // divider
          dividerLine: "bg-white/10",
          dividerText: "text-white/60",

          // labels + inputs
          formFieldLabel: "text-white/80 text-sm",
          formFieldInput:
            "bg-black/35 border border-white/12 text-white placeholder:text-white/35 rounded-xl px-4 py-3 focus:border-white/25 focus:ring-2 focus:ring-white/10 outline-none",

          // primary button
          formButtonPrimary:
            "w-full rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold py-3 hover:opacity-95 transition shadow-[0_10px_40px_rgba(139,92,246,0.25)]",

          // links
          footerActionText: "text-white/60",
          footerActionLink:
            "text-white underline underline-offset-4 hover:text-white/80",

          // hide the ugly Clerk dev footer block
          footer: "hidden",
        },
      }}
    />
  );
}
