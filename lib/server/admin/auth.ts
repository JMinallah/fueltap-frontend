"use server";

import { passwordSchema } from "@/lib/validators/authSchema";
import { getStore, wait } from "./mock";
import type { ActionResult, Invite, QueryResult } from "./types";

// Super admin accounts are created from an invitation, not self sign-up.
export async function getInvite(
  token: string | null,
): Promise<QueryResult<Invite>> {
  const invite = getStore().invites.find((i) => i.token === token);
  if (!invite || new Date(invite.expiresAt).getTime() < Date.now()) {
    return {
      success: false,
      message: "This invitation link is invalid or has expired.",
    };
  }
  return { success: true, data: invite };
}

export async function acceptInvite(input: {
  token: string;
  password: string;
  confirmPassword: string;
}): Promise<ActionResult> {
  await wait();
  const invite = await getInvite(input.token);
  if (!invite.success) return { success: false, message: invite.message };

  const parsed = passwordSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0].message };
  }

  // A real backend would create the account and start a session here.
  return { success: true, message: invite.data.organisation };
}

export async function requestPasswordResetOtp(
  email: string,
): Promise<ActionResult> {
  await wait();
  return {
    success: true,
    message: `We've sent a one-time code to ${email}.`,
  };
}

export async function verifyPasswordResetOtp(input: {
  email: string;
  otp: string;
}): Promise<ActionResult> {
  await wait();
  if (!/^\d{6}$/.test(input.otp) || input.otp === "000000") {
    return { success: false, message: "That code is incorrect or has expired." };
  }
  return { success: true, message: "Code verified." };
}

export async function resetPasswordWithOtp(input: {
  email: string;
  otp: string;
  password: string;
  confirmPassword: string;
}): Promise<ActionResult> {
  await wait();
  const parsed = passwordSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0].message };
  }
  return { success: true, message: "Your password has been set successfully." };
}
