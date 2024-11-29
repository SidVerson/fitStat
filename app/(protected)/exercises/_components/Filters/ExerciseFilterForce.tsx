"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Select, SelectItem } from "@nextui-org/select";
import { Selection } from "@react-types/shared";
import { IconFilter } from "@tabler/icons-react";

const forces = [
  { label: "Тяговая", value: "pull" },
  { label: "Толкающая", value: "push" },
  { label: "Статическая", value: "static" },
];

export default function ExerciseFilterForce() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleFilterForce(selection: Selection) {
    const terms = Array.from(selection);
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (terms.length > 0) {
      params.set("force", terms.join(","));
    } else {
      params.delete("force");
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const selectedForce = searchParams.get("force");
  const selectedKeys = selectedForce
    ? new Set(selectedForce.split(","))
    : undefined;

  return (
    <Select
      key={selectedKeys ? selectedKeys.size : "empty"}
      label="Нагрузка"
      placeholder="Выберите нагрузку..."
      size="sm"
      items={forces}
      onSelectionChange={handleFilterForce}
      selectedKeys={selectedKeys}
      startContent={<IconFilter size={18} />}
      selectionMode="multiple"
    >
      {(force) => <SelectItem key={force.value}>{force.label}</SelectItem>}
    </Select>
  );
}
