"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldGroup, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";
import { Building2 } from "lucide-react";
import { corporateIdentitySchema, CorporateIdentityInput } from "@/lib/validators/kybAdminSchema";
import { submitCorporateIdentity } from "@/lib/server/kyb-admin";

export default function CorporateIdentityForm() {
  const form = useForm<CorporateIdentityInput>({
    resolver: zodResolver(corporateIdentitySchema),
    defaultValues: {
      companyName: "",
      rcNumber: "",
      tin: "",
      ctiNumber: "",
      dateOfRegistration: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  async function onSubmit(values: CorporateIdentityInput) {
    setLoading(true);
    try {
      const result = await submitCorporateIdentity(values);
      if (!result?.success) {
        toast.add({
          title: "Verification failed",
          description: (result as { message?: string }).message || "Please try again.",
          type: "error",
        });
        return;
      }
      push("/admin/kyb/documents");
    } catch {
      toast.add({ title: "Error", description: "Unable to submit. Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}
      id="corporate-identity-form"
      aria-busy={loading}
      autoComplete="off"
      className="flex flex-col gap-6 pb-8"
    >
      {/* Header card */}
      <div className="flex items-center gap-3 rounded-2xl bg-blue-50 px-4 py-3">
        <div className="flex size-10 items-center justify-center rounded-full bg-blue-100">
          <Building2 className="text-primary" size={20} />
        </div>
        <h3 className="text-sm font-semibold text-primary">Verify Your Corporate Identity</h3>
      </div>

      <FieldGroup>
        <Controller
          control={form.control}
          name="companyName"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="text-lg-medium">Company / Organisation Name</FieldLabel>
              <Input placeholder="e.g. FuelCorp Ltd" disabled={loading} {...field} />
              {fieldState.invalid && fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="rcNumber"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="text-lg-medium">RC Number</FieldLabel>
              <Input placeholder="e.g. RC123456" disabled={loading} {...field} />
              {fieldState.invalid && fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="tin"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="text-lg-medium">Tax Identification Number (TIN)</FieldLabel>
              <Input placeholder="e.g. 1234567890" inputMode="numeric" disabled={loading} {...field} />
              {fieldState.invalid && fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="ctiNumber"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="text-lg-medium">Corporate Tax Identification Number (CTI)</FieldLabel>
              <Input placeholder="e.g. CTI-987654321" disabled={loading} {...field} />
              {fieldState.invalid && fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="dateOfRegistration"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="text-lg-medium">Date of Registration</FieldLabel>
              <Input type="date" disabled={loading} {...field} />
              {fieldState.invalid && fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="flex items-center gap-3 mt-2">
          <Button
            variant="outline"
            size="full"
            className="text-primary border-primary basis-[48%]"
            type="button"
            disabled={loading}
            onClick={() => push("/admin/dashboard")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="secondary"
            size="full"
            className="text-white basis-[48%]"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Next"}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
