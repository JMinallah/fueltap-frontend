import React from "react";

// Root wrapper for all /admin/* routes.
// Auth guard only lives in (dashboard)/layout.tsx so that
// onboarding pages (login, register, kyb…) are publicly accessible.
export default function SuperAdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
