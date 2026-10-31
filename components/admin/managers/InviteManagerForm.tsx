"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldGroup, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";
import { managerSchema, ManagerInput } from "@/lib/validators/adminSchemas";
import { inviteManager } from "@/lib/server/admin-managers";
import { Station } from "@/lib/server/admin-stations";
import InviteSentModal from "./InviteSentModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown } from "lucide-react";

interface Props {
  stations: Station[];
}

export default function InviteManagerForm({ stations }: Props) {
  const form = useForm<ManagerInput>({
    resolver: zodResolver(managerSchema),
    defaultValues: { name: "", email: "", phone: "", stationId: "" },
  });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { push } = useRouter();

  const activeStations = stations.filter((s) => s.status === "active");

  async function onSubmit(values: ManagerInput) {
    setLoading(true);
    try {
      const result = await inviteManager(values);
      if (!result?.success) {
        toast.add({
          title: "Invite failed",
          description: (result as { message?: string }).message || "Please try again.",
          type: "error",
        });
        return;
      }
      setShowSuccess(true);
    } catch {
      toast.add({ title: "Error", description: "Unable to send invite. Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="font-pjs text-2xl font-semibold text-neutral-900">Invite a Manager</h1>
        <p className="text-sm text-neutra-700 mt-1">
          The manager will receive an email invitation to join FuelTap.
        </p>
      </div>

      <form
        onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}
        id="invite-manager-form"
        autoComplete="off"
        className="max-w-xl flex flex-col gap-5 pb-10"
      >
        <FieldGroup>
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-lg-medium">Manager&apos;s Name</FieldLabel>
                <Input placeholder="e.g. Ochife Ogechukwu" disabled={loading} {...field} />
                {fieldState.invalid && fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-lg-medium">Email Address</FieldLabel>
                <Input placeholder="manager@company.com" disabled={loading} {...field} />
                {fieldState.invalid && fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="phone"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-lg-medium">Phone Number</FieldLabel>
                <div className="flex">
                  <div className="text-primary-400 bg-primary-50 flex items-center justify-center gap-1 rounded-l px-2 text-sm">
                    +234 <ChevronDown size={14} />
                  </div>
                  <Input
                    placeholder="80 1234 5678"
                    inputMode="numeric"
                    onInput={(e) => {
                      const t = e.currentTarget as HTMLInputElement;
                      t.value = t.value.replace(/[^0-9]/g, "");
                    }}
                    className="rounded-l-none border-l-0"
                    disabled={loading}
                    {...field}
                  />
                </div>
                {fieldState.invalid && fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="stationId"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-lg-medium">Assign Station</FieldLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={loading || activeStations.length === 0}
                >
                  <SelectTrigger className="h-10 w-full rounded-lg border border-neutra-500">
                    <SelectValue
                      placeholder={
                        activeStations.length === 0
                          ? "No active stations — create one first"
                          : "Select a station"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {activeStations.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name} — {s.city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <div className="flex gap-3 mt-2">
            <Button
              variant="outline"
              size="full"
              className="basis-1/2 border-primary text-primary"
              type="button"
              disabled={loading}
              onClick={() => push("/admin/managers")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="secondary"
              size="full"
              className="basis-1/2 text-white"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Invite"}
            </Button>
          </div>
        </FieldGroup>
      </form>

      {showSuccess && (
        <InviteSentModal
          onClose={() => push("/admin/managers")}
          onInviteAnother={() => {
            setShowSuccess(false);
            form.reset();
          }}
        />
      )}
    </>
  );
}
