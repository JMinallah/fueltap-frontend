import { Metadata } from "next";
import InventoryTable from "@/components/admin/inventory/InventoryTable";
import { getInventory } from "@/lib/server/admin/inventory";

export const metadata: Metadata = { title: "Inventory | FuelTap Admin" };

export default async function InventoryPage() {
  const result = await getInventory();
  return <InventoryTable inventory={result.success ? result.data : []} />;
}
