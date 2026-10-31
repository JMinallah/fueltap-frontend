"use server";

import { authenticatedApiRequest } from "@/lib/helpers/fetch/authenticatedApiRequest";

export type InventoryItem = {
  id: string;
  stationName: string;
  fuelType: "Petrol" | "Diesel" | "Cooking Gas";
  volumeLitres: number;
  lastUpdated: string;
  status: "In Stock" | "Low Stock" | "Out of Stock";
};

export async function getInventory() {
  return authenticatedApiRequest<void, { inventory: InventoryItem[] }>(
    "/api/v1/admin/inventory",
    "GET",
  );
}
