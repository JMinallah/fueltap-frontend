import { Metadata } from "next";
import ManagersList from "@/components/admin/managers/ManagersList";
import { getManagers } from "@/lib/server/admin/managers";

export const metadata: Metadata = { title: "Managers | FuelTap Admin" };

export default async function ManagersPage() {
  const result = await getManagers();
  return (
    <ManagersList
      managers={result.success ? result.data : []}
      // Server components render once per request, so this is stable.
      // eslint-disable-next-line react-hooks/purity
      now={Date.now()}
    />
  );
}
