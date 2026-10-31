"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldGroup, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";
import { stationSchema, StationInput } from "@/lib/validators/adminSchemas";
import { createStation, Station } from "@/lib/server/admin-stations";
import { Manager } from "@/lib/server/admin-managers";
import StationCreatedModal from "./StationCreatedModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const NIGERIAN_STATES = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno",
  "Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT","Gombe","Imo",
  "Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa",
  "Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba",
  "Yobe","Zamfara",
];

interface Props {
  managers: Manager[];
}

export default function AddStationForm({ managers }: Props) {
  const form = useForm<StationInput>({
    resolver: zodResolver(stationSchema),
    defaultValues: { name: "", address: "", state: "", city: "", managerId: "" },
  });
  const [loading, setLoading] = useState(false);
  const [createdStation, setCreatedStation] = useState<Station | null>(null);
  const { push } = useRouter();

  async function onSubmit(values: StationInput) {
    setLoading(true);
    try {
      const result = await createStation(values);
      if (!result?.success || !result.data?.station) {
        toast.add({
          title: "Failed to create station",
          description: (result as { message?: string }).message || "Please try again.",
          type: "error",
        });
        return;
      }
      setCreatedStation(result.data.station);
    } catch {
      toast.add({ title: "Error", description: "Unable to create station. Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  const activeManagers = managers.filter((m) => m.status === "active");

  return (
    <>
      <div className="mb-6">
        <h1 className="font-pjs text-2xl font-semibold text-neutral-900">Add New Station</h1>
        <p className="text-sm text-neutra-700 mt-1">Fill in the station details below</p>
      </div>

      <form
        onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}
        id="add-station-form"
        autoComplete="off"
        className="max-w-xl flex flex-col gap-5 pb-10"
      >
        <FieldGroup>
          {/* Station name */}
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-lg-medium">Station Name</FieldLabel>
                <Input placeholder="e.g. Lagos Island Station" disabled={loading} {...field} />
                {fieldState.invalid && fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Address */}
          <Controller
            control={form.control}
            name="address"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-lg-medium">Street Address</FieldLabel>
                <Input placeholder="e.g. 12 Marina Road" disabled={loading} {...field} />
                {fieldState.invalid && fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* State + City */}
          <div className="grid grid-cols-2 gap-3">
            <Controller
              control={form.control}
              name="state"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-lg-medium">State</FieldLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={loading}
                  >
                    <SelectTrigger className="h-10 w-full rounded-lg border border-neutra-500">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {NIGERIAN_STATES.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="city"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-lg-medium">City</FieldLabel>
                  <Input placeholder="e.g. Victoria Island" disabled={loading} {...field} />
                  {fieldState.invalid && fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>

          {/* Assign Manager */}
          <Controller
            control={form.control}
            name="managerId"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-lg-medium">
                  Assign Manager <span className="text-neutra-700 font-normal text-xs">(Optional)</span>
                </FieldLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={loading || activeManagers.length === 0}
                >
                  <SelectTrigger className="h-10 w-full rounded-lg border border-neutra-500">
                    <SelectValue
                      placeholder={
                        activeManagers.length === 0
                          ? "No active managers yet"
                          : "Select a manager"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {activeManagers.map((m) => (
                      <SelectItem key={m.id} value={m.id}>
                        {m.name} — {m.email}
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
              onClick={() => push("/admin/stations")}
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
              {loading ? "Creating..." : "Create Station"}
            </Button>
          </div>
        </FieldGroup>
      </form>

      {createdStation && (
        <StationCreatedModal
          station={createdStation}
          onClose={() => {
            setCreatedStation(null);
            push("/admin/stations");
          }}
        />
      )}
    </>
  );
}
