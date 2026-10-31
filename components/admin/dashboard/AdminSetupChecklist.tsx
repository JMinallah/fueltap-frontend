"use client";

import Link from "next/link";
import { Check } from "@/components/animate-ui/icons/check";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import { ArrowUpRight, Building2, LockKeyhole, Users, Zap } from "lucide-react";

interface Props {
  kybSubmitted: boolean;
  hasManager: boolean;
  hasStation: boolean;
  companyId?: string;
}

interface Step {
  type: string;
  header: string;
  subText: string;
  isCompleted: boolean;
  lockedReason?: string;
  icon: React.ReactNode;
  actionLink: string;
  actionText: string;
}

export default function AdminSetupChecklist({
  kybSubmitted,
  hasManager,
  hasStation,
  companyId,
}: Props) {
  const steps: Step[] = [
    {
      type: "account",
      header: "Create Account",
      subText: "Your account has been created successfully.",
      isCompleted: true,
      icon: <Building2 className="text-primary" size={20} />,
      actionLink: "#",
      actionText: "Done",
    },
    {
      type: "kyb",
      header: "Verify Your Business Identity (KYB)",
      subText: companyId
        ? `Company ID: ${companyId}`
        : "Submit your corporate documents for verification.",
      isCompleted: kybSubmitted,
      icon: <Building2 className="text-green-500" size={20} />,
      actionLink: "/admin/kyb",
      actionText: "Verify Business",
    },
    {
      type: "manager",
      header: "Invite Your First Manager",
      subText: "Add a manager to run your first station.",
      isCompleted: hasManager,
      lockedReason: !kybSubmitted ? "Complete KYB first." : undefined,
      icon: <Users className="text-green-500" size={20} />,
      actionLink: "/admin/managers/invite",
      actionText: "Invite Manager",
    },
    {
      type: "station",
      header: "Create First Station",
      subText: "Add a fuel station to start receiving orders.",
      isCompleted: hasStation,
      lockedReason: !kybSubmitted
        ? "Complete KYB first."
        : !hasManager
          ? "Invite a manager first."
          : undefined,
      icon: <Zap className="text-green-500" size={20} />,
      actionLink: "/admin/stations/new",
      actionText: "Create Station",
    },
  ];

  const completedCount = steps.filter((s) => s.isCompleted).length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  return (
    <section className="max-w-2xl">
      <div className="mb-5 rounded-2xl bg-white p-4 shadow-xs border border-gray-100">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-neutra-1000">
            Setup Progress
          </span>
          <span className="text-sm font-semibold text-primary">
            {completedCount}/{steps.length} Complete
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {steps.map((step) => {
        const isLocked = !step.isCompleted && Boolean(step.lockedReason);
        return (
          <div
            key={step.type}
            className={`rounded-2xl mb-4 border-2 p-4 flex items-center justify-between transition-colors ${
              step.isCompleted
                ? "bg-neutral-400 border-neutral-400/20"
                : "bg-green-50 border-green-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="bg-white p-2.5 rounded-xl shadow-xs flex items-center justify-center">
                {step.icon}
              </span>
              <div className={step.isCompleted ? "line-through opacity-70" : ""}>
                <h4 className="font-semibold text-base lg:text-lg mb-1 text-neutral-900">
                  {step.header}
                </h4>
                <p className="text-xs text-neutral-600">{step.subText}</p>
              </div>
            </div>

            {step.isCompleted ? (
              <AnimateIcon animateOnView>
                <Check className="bg-green-500 text-white size-10 rounded-full p-2" />
              </AnimateIcon>
            ) : isLocked ? (
              <button
                type="button"
                disabled
                title={step.lockedReason}
                className="p-4 bg-neutral-200 border border-neutral-300 max-w-[158px] rounded-full justify-center md:rounded-[999px] flex gap-2 text-sm text-neutral-500 items-center cursor-not-allowed"
              >
                <span className="hidden lg:inline">{step.actionText}</span>
                <LockKeyhole className="md:hidden size-4" aria-hidden="true" />
              </button>
            ) : (
              <Link
                href={step.actionLink}
                className="p-4 bg-white border max-w-[158px] rounded-full justify-center md:rounded-[999px] flex gap-2 text-sm border-[#DCDDDD] text-black items-center shadow-xs hover:bg-neutral-50 transition-all"
              >
                <span className="hidden lg:inline">{step.actionText}</span>
                <ArrowUpRight className="size-4" />
              </Link>
            )}
          </div>
        );
      })}
    </section>
  );
}
