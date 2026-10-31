"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { PasswordInput, passwordSchema } from "@/lib/validators/authSchema";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";
import { Register } from "@/lib/server/auth";

export default function AdminConfirmPassword() {
  const form = useForm<PasswordInput>({ resolver: zodResolver(passwordSchema) });
  const password = form.watch("password") || "";
  const rules = {
    length: password.length > 7 && password.length <= 20,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const { push } = useRouter();

  async function onSubmit(data: PasswordInput) {
    try {
      setIsSubmitting(true);
      const registration_data = JSON.parse(
        localStorage.getItem("admin_registration_flow") || "{}",
      );
      if (!registration_data?.email) {
        push("/admin/register");
        return;
      }
      const { fullName, registerAs, email, phone } = registration_data;
      const payload = {
        full_name: fullName,
        email,
        phone_number: phone,
        password: data.password,
        confirm_password: data.confirmPassword,
        role: registerAs,
      };
      const { message, success } = await Register(payload);
      if (!success) {
        toast.add({ title: "Registration failed", description: message, type: "error" });
        return;
      }
      toast.add({ title: "Success", description: message, type: "success" });
      push("/admin/verify-email");
    } catch {
      toast.add({
        title: "Registration failed",
        description: "Unable to complete registration. Please try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex h-[65vh] flex-col space-y-4 md:h-full"
      id="admin-set-password"
    >
      <FieldGroup>
        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password" className="text-lg-medium">
                Create Password
              </FieldLabel>
              <div className="relative">
                <Input
                  placeholder="create a password"
                  id="password"
                  autoComplete="new-password"
                  type={showPassword ? "text" : "password"}
                  {...field}
                />
                {showPassword ? (
                  <EyeOff
                    className="text-neutra-600 absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowPassword(false)}
                    size={18}
                  />
                ) : (
                  <Eye
                    className="text-neutra-600 absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowPassword(true)}
                    size={18}
                  />
                )}
              </div>
              {fieldState.invalid && fieldState.error && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="confirmPassword" className="text-lg-medium">
                Confirm Password
              </FieldLabel>
              <div className="relative">
                <Input
                  placeholder="Re-enter password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  type={showConfPassword ? "text" : "password"}
                  {...field}
                />
                {showConfPassword ? (
                  <EyeOff
                    className="text-neutra-600 absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowConfPassword(false)}
                    size={18}
                  />
                ) : (
                  <Eye
                    className="text-neutra-600 absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowConfPassword(true)}
                    size={18}
                  />
                )}
              </div>
              {fieldState.invalid && fieldState.error && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <ul className="list-disc space-y-1 text-sm">
          <li className={rules.length ? "text-green-600" : "text-gray-500"}>Password should be 8-20 characters long</li>
          <li className={rules.uppercase ? "text-green-600" : "text-gray-500"}>At least one uppercase letter</li>
          <li className={rules.lowercase ? "text-green-600" : "text-gray-500"}>At least one lowercase letter</li>
          <li className={rules.number ? "text-green-600" : "text-gray-500"}>At least one number</li>
          <li className={rules.special ? "text-green-600" : "text-gray-500"}>At least one special character: @ ! # $ % &amp; =</li>
        </ul>

        <div className="mb-4 bg-white max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:w-full max-sm:p-4">
          <Button type="submit" size="full" disabled={isSubmitting} className="text-md-medium">
            {isSubmitting ? "Creating..." : "Next"}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
