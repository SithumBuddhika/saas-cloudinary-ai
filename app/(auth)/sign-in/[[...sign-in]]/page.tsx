// import { SignIn } from "@clerk/nextjs";

// export default function Page() {
//   return <SignIn />;
// }
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="shadow-2xl card bg-base-200">
      <div className="card-body">
        <SignIn
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "shadow-none bg-transparent",
              headerTitle: "text-2xl font-bold",
              headerSubtitle: "text-base opacity-70",
              socialButtonsBlockButton: "btn btn-outline w-full",
              formButtonPrimary: "btn btn-primary w-full",
              formFieldInput: "input input-bordered w-full",
              footerActionLink: "link link-primary",
            },
          }}
        />
      </div>
    </div>
  );
}
