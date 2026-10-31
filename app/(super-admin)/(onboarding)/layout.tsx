import Logo from "@/components/web/Logo";
import AdminOnboardingShell from "@/components/admin/AdminOnboardingShell";

export default function AdminOnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex h-screen w-screen justify-between overflow-hidden">
      {/* LEFT: form — full width on mobile, half on md+ */}
      <div className="mx-auto flex w-screen max-w-lg basis-full flex-col items-center sm:basis-1/2 lg:max-w-180">
        <Logo />
        <div className="mx-auto mt-4 w-[95%] max-sm:h-[75%] md:mt-8 lg:max-w-140">
          <AdminOnboardingShell />
          {children}
        </div>
      </div>

      {/* RIGHT: gradient panel — hidden on mobile */}
      <div className="relative hidden h-full w-1/2 overflow-hidden md:flex md:flex-col md:items-center md:justify-center">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/admin-onboarding-gradient.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative z-10 flex flex-col items-start px-16 text-left">
          <span className="mb-3 text-sm font-semibold tracking-widest text-primary-400 uppercase">
            FuelTap
          </span>
          <h2 className="font-pjs mb-4 text-4xl font-bold leading-tight text-primary-900">
            Tired of fuel
            <br />
            wahala?
          </h2>
          <p className="max-w-xs text-base text-neutra-1000">
            You&apos;ve found the right place for fuel delivery requests. Easily
            manage thousands of local customers and keep your fuel flowing,
            always and generating income too.
          </p>
        </div>
      </div>
    </main>
  );
}
