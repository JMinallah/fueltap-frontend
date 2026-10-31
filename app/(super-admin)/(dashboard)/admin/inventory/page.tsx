import { Metadata } from "next";
import { getInventory } from "@/lib/server/admin-inventory";
import InventoryTable from "@/components/admin/inventory/InventoryTable";

export const metadata: Metadata = { title: "Inventory | FuelTap Admin" };

export default async function InventoryPage() {
  const result = await getInventory();
  const inventory = result.success ? result.data?.inventory ?? [] : [];
  return <InventoryTable inventory={inventory} />;
}
