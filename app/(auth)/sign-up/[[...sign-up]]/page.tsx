// import { SignUp } from "@clerk/nextjs";

// export default function Page() {
//   return <SignUp />;
// }

// import { SignUp } from "@clerk/nextjs";

// export default function Page() {
//   return (
//     <div className="shadow-2xl card bg-base-200">
//       <div className="card-body">
//         <SignUp
//           appearance={{
//             elements: {
//               rootBox: "w-full",
//               card: "shadow-none bg-transparent",
//               headerTitle: "text-2xl font-bold",
//               headerSubtitle: "text-base opacity-70",
//               socialButtonsBlockButton: "btn btn-outline w-full",
//               formButtonPrimary: "btn btn-primary w-full",
//               formFieldInput: "input input-bordered w-full",
//               footerActionLink: "link link-primary",
//             },
//           }}
//         />
//       </div>
//     </div>
//   );
// }

import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="p-6 border shadow-2xl rounded-3xl border-white/10 bg-black/40 backdrop-blur">
      <SignUp
        appearance={{
          variables: {
            colorPrimary: "#ffffff",
            colorText: "#ffffff",
            colorTextSecondary: "rgba(255,255,255,0.65)",
            colorBackground: "rgba(0,0,0,0)",
            colorInputBackground: "rgba(255,255,255,0.06)",
            colorInputText: "#ffffff",
            borderRadius: "14px",
          },
          elements: {
            card: "bg-transparent shadow-none",
            headerTitle: "text-2xl font-bold text-white",
            headerSubtitle: "text-white/70",
            formButtonPrimary: "btn btn-primary w-full",
            socialButtonsBlockButton: "btn btn-outline w-full",
            formFieldInput: "input input-bordered w-full bg-white/5",
            footerActionLink: "link link-primary",
            dividerLine: "bg-white/10",
            dividerText: "text-white/60",
          },
        }}
      />
    </div>
  );
}
