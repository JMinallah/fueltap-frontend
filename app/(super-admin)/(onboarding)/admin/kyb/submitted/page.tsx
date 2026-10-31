"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function KybSubmittedPage() {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center gap-6 text-center px-4">
      <div className="flex size-20 items-center justify-center rounded-full bg-green-100">
        <CheckCircle2 className="text-green-600" size={44} />
      </div>
      <div>
        <h1 className="font-pjs text-2xl font-bold text-primary-900 mb-2">
          Corporate Setup Submitted
        </h1>
        <p className="text-sm text-neutra-1000 max-w-xs mx-auto">
          Your business details have been submitted successfully. Our team will
          review and verify your information shortly.
        </p>
      </div>
      <Button variant="secondary" size="full" className="max-w-xs text-white" asChild>
        <Link href="/admin/dashboard">Go to Dashboard</Link>
      </Button>
    </div>
  );
}
