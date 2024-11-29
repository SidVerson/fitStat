"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Select, SelectItem } from "@nextui-org/select";
import { Selection } from "@react-types/shared";
import { IconFilter } from "@tabler/icons-react";

const levels = [
  { label: "Легкий", value: "beginner" },
  { label: "Средний", value: "intermediate" },
  { label: "Тяжелый", value: "expert" },
];

export default function ExerciseFilterLevel() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleFilterLevel(selection: Selection) {
    const terms = Array.from(selection);
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (terms.length > 0) {
      params.set("level", terms.join(","));
    } else {
      params.delete("level");
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const selectedLevel = searchParams.get("level");
  const selectedKeys = selectedLevel
    ? new Set(selectedLevel.split(","))
    : undefined;

  return (
    <Select
      key={selectedKeys ? selectedKeys.size : "empty"}
      label="Сложность"
      placeholder="Выберите сложность..."
      size="sm"
      items={levels}
      onSelectionChange={handleFilterLevel}
      selectedKeys={selectedKeys}
      startContent={<IconFilter size={18} />}
      selectionMode="multiple"
    >
      {(level) => <SelectItem key={level.value}>{level.label}</SelectItem>}
    </Select>
  );
}
