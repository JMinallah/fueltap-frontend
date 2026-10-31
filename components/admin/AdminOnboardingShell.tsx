"use client";

import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
  Progress,
  ProgressTrack,
  ProgressValue,
} from "@/components/animate-ui/components/base/progress";


const indicatorMap: Record<
  string,
  { progressValue: number; text: string; title: string }
> = {
  "/admin/register": {
    progressValue: 40,
    text: "Already have an account?",
    title: "Create an Account",
  },
  "/admin/confirm-password": {
    progressValue: 60,
    text: "Secure your account",
    title: "Create a Password",
  },
  "/admin/verify-email": {
    progressValue: 90,
    title: "Verify your email",
    text: "Enter the OTP sent to your email",
  },
  "/admin/login": {
    progressValue: 50,
    text: "Don't have an account?",
    title: "Login to Continue",
  },
  "/admin/forgot-password": {
    progressValue: 50,
    text: "Enter the email associated with your account, and we will email you a reset password link.",
    title: "Forgot Password?",
  },
  "/admin/reset-password": {
    progressValue: 90,
    text: "Please do not reuse an old password",
    title: "Enter New Password",
  },
  "/admin/kyb": {
    progressValue: 30,
    text: "Verify your corporate identity",
    title: "Business Verification",
  },
  "/admin/kyb/documents": {
    progressValue: 70,
    text: "Upload your company documents",
    title: "Corporate Documents",
  },
};

export default function AdminOnboardingShell() {
  const pathname = usePathname();
  const indicatorData = indicatorMap[pathname];
  return (
    <div>
      {indicatorData && (
        <Indicator
          progressValue={indicatorData.progressValue}
          text={indicatorData.text}
          title={indicatorData.title}
        />
      )}
    </div>
  );
}

function Indicator({
  progressValue,
  title,
  text,
}: {
  progressValue: number;
  title: string;
  text: string;
}) {
  const router = useRouter();
  return (
    <div className="mt-6 mb-4 flex flex-col lg:mt-0 lg:items-center">
      <div className="flex items-center gap-4 rounded-2xl">
        <ChevronLeft
          size={16}
          className={"bg-gray-100 sm:hidden cursor-pointer"}
          onClick={() => router.back()}
        />
        <div>
          <h1 className="text-primary font-pjs text-xl md:text-3xl font-semi">
            {title}
          </h1>
          <div className="mt-1 mb-4 flex items-center justify-center gap-1 lg:mt-2 lg:mb-6">
            <p className="text-sm text-neutra-1000">{text}</p>
          </div>
        </div>
      </div>
      <Progress className={"w-full"} value={progressValue}>
        <ProgressTrack />
        <ProgressValue />
      </Progress>
    </div>
  );
}
