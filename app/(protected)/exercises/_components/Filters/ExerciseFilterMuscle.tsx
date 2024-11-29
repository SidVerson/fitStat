"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Select, SelectItem } from "@nextui-org/select";
import { Selection } from "@react-types/shared";
import { IconFilter } from "@tabler/icons-react";

const muscles = [
  { label: "Брюшные мышцы", value: "abdominals" },
  { label: "Подколенные сухожилия", value: "hamstrings" },
  { label: "Аддукторы", value: "adductors" },
  { label: "Квадрицепс", value: "quadriceps" },
  { label: "Бицепсы", value: "biceps" },
  { label: "Плечи", value: "shoulders" },
  { label: "Грудь", value: "chest" },
  { label: "Средняя часть спины", value: "middle_back" },
  { label: "Икры", value: "calves" },
  { label: "Ягодицы", value: "glutes" },
  { label: "Нижняя часть спины", value: "lower_back" },
  { label: "Латы", value: "lats" },
  { label: "Трицепс", value: "triceps" },
  { label: "Трапеции", value: "traps" },
  { label: "Предплечья", value: "forearms" },
  { label: "Шея", value: "neck" },
  { label: "Реберные мышцы", value: "abductors" },
];

export default function ExerciseFilterMuscle() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleFilterMuscle(selection: Selection) {
    const terms = Array.from(selection);
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (terms.length > 0) {
      params.set("muscle", terms.join(","));
    } else {
      params.delete("muscle");
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const selectedMuscle = searchParams.get("muscle");
  const selectedKeys = selectedMuscle
    ? new Set(selectedMuscle.split(","))
    : undefined;

  return (
    <Select
      key={selectedKeys ? selectedKeys.size : "empty"}
      label="Группы мышц"
      placeholder="Выберите мышцы..."
      size="sm"
      items={muscles}
      onSelectionChange={handleFilterMuscle}
      selectedKeys={selectedKeys}
      startContent={<IconFilter size={18} />}
      selectionMode="multiple"
    >
      {(muscle) => <SelectItem key={muscle.value}>{muscle.label}</SelectItem>}
    </Select>
  );
}
