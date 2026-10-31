"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldGroup, FieldError } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";
import { UploadCloud, CheckCircle2, Loader2 } from "lucide-react";
import MyDropzone from "@/components/web/MyDropzone";
import { corporateDocsSchema, CorporateDocsInput } from "@/lib/validators/kybAdminSchema";
import { uploadCorporateDocs } from "@/lib/server/kyb-admin";

const docFields: { name: keyof CorporateDocsInput; label: string; required: boolean }[] = [
  { name: "companyLogo", label: "Company Logo", required: true },
  { name: "cacCertificate", label: "CAC Certificate", required: true },
  { name: "tinCertificate", label: "TIN Certificate", required: true },
  { name: "tmCertificate", label: "TM Certificate (Optional)", required: false },
];

export default function DocumentUploadForm() {
  const form = useForm<CorporateDocsInput>({
    resolver: zodResolver(corporateDocsSchema),
    defaultValues: {
      companyLogo: [],
      cacCertificate: [],
      tinCertificate: [],
      tmCertificate: [],
    },
  });

  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const { push } = useRouter();

  async function onSubmit(values: CorporateDocsInput) {
    setLoading(true);
    setProcessing(true);

    const body = new FormData();
    values.companyLogo.forEach((f) => body.append("companyLogo", f));
    values.cacCertificate.forEach((f) => body.append("cacCertificate", f));
    values.tinCertificate.forEach((f) => body.append("tinCertificate", f));
    (values.tmCertificate ?? []).forEach((f) => body.append("tmCertificate", f));

    try {
      const result = await uploadCorporateDocs(body);
      if (!result?.success) {
        setProcessing(false);
        toast.add({
          title: "Upload failed",
          description: (result as { message?: string }).message || "Please try again.",
          type: "error",
        });
        return;
      }
      // Short pause on the "Processing…" state before redirecting
      await new Promise((r) => setTimeout(r, 1800));
      push("/admin/kyb/submitted");
    } catch {
      setProcessing(false);
      toast.add({ title: "Error", description: "Unable to upload documents. Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  if (processing) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4 rounded-2xl bg-primary-900 text-white">
        <Loader2 className="animate-spin text-secondary-400" size={48} />
        <p className="text-lg font-semibold">Processing...</p>
        <p className="text-sm text-white/70">Please wait while we verify your documents</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}
      id="corporate-docs-form"
      aria-busy={loading}
      autoComplete="off"
      className="flex flex-col gap-6 pb-8"
    >
      <div className="flex items-center gap-3 rounded-2xl bg-blue-50 px-4 py-3">
        <div className="flex size-10 items-center justify-center rounded-full bg-blue-100">
          <UploadCloud className="text-primary" size={20} />
        </div>
        <h3 className="text-sm font-semibold text-primary">Upload Corporate Documents & Branding</h3>
      </div>

      <FieldGroup>
        {docFields.map(({ name, label, required }) => (
          <Controller
            key={name}
            control={form.control}
            name={name}
            render={({ field, fieldState }) => {
              const files = (field.value ?? []) as File[];
              const hasFile = files.length > 0;
              return (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex items-center justify-between">
                    <FieldLabel className="text-lg-medium">
                      {label}
                      {required && <span className="ml-1 text-red-500">*</span>}
                    </FieldLabel>
                    {hasFile && <CheckCircle2 size={16} className="text-green-500" />}
                  </div>
                  <MyDropzone
                    value={files}
                    onChange={field.onChange}
                    disabled={loading}
                  />
                  {fieldState.invalid && fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              );
            }}
          />
        ))}

        <div className="flex items-center gap-3 mt-2">
          <Button
            variant="outline"
            size="full"
            className="text-primary border-primary basis-[48%]"
            type="button"
            disabled={loading}
            onClick={() => push("/admin/kyb")}
          >
            Back
          </Button>
          <Button
            type="submit"
            variant="secondary"
            size="full"
            className="text-white basis-[48%]"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Submit"}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
