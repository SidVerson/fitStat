"use client";
import { useState } from "react";
import { handleUpdateUserEquipment } from "@/server-actions/UserServerActions";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Checkbox, CheckboxGroup } from "@nextui-org/checkbox";
import { Button } from "@nextui-org/button";
import { toast } from "sonner";
import { IconBarbell, IconDeviceFloppy } from "@tabler/icons-react";
import { EquipmentType } from "@prisma/client";

interface ProfileEquipmentProps {
  equipment: string[];
}

const equipmentItems = [
  "body_only",
  "foam_roll",
  "kettlebells",
  "dumbbell",
  "cable",
  "barbell",
  "bands",
  "medicine_ball",
  "exercise_ball",
  "e_z_curl_bar",
];

const equipmentItem = [
  { value: "body_only", label: "Только тело" },
  { value: "foam_roll", label: "Массажный роллер" },
  { value: "kettlebells", label: "Гири" },
  { value: "dumbbell", label: "Гантели" },
  { value: "cable", label: "Скакалка" },
  { value: "barbell", label: "Штанга" },
  { value: "bands", label: "Ремни" },
  { value: "medicine_ball", label: "Медбол" },
  { value: "exercise_ball", label: "Шар" },
  { value: "e_z_curl_bar", label: "Гриф кривой" },
];

const formatText = (text: string): string => {
  return text
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

function toEquipmentType(items: string[]): EquipmentType[] {
  return items.filter((item): item is EquipmentType =>
    Object.values(EquipmentType).includes(item as EquipmentType),
  );
}

export default function ProfileEquipment({ equipment }: ProfileEquipmentProps) {
  const [selectedEquipment, setSelectedEquipment] = useState(equipment || []);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);

    const response = await handleUpdateUserEquipment(
      toEquipmentType(selectedEquipment),
    );

    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }

    setIsLoading(false);
  };

  return (
    <Card shadow="none" className="shadow-md">
      <CardHeader className="text-xl font-semibold px-5 pb-0 gap-x-3  items-center">
        <IconBarbell className="text-danger" />
        Инвентарь
      </CardHeader>
      <CardBody className="px-5">
        <CheckboxGroup
          value={selectedEquipment}
          onChange={(value) => setSelectedEquipment(value as EquipmentType[])}
          color="primary"
        >
          {equipmentItem.map((item, index) => (
            <Checkbox key={index} value={item.value}>
              {formatText(item.label)}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </CardBody>
      <CardFooter className="px-5">
        <Button
          variant="flat"
          onPress={handleSubmit}
          isLoading={isLoading}
          startContent={<IconDeviceFloppy size={20} />}
        >
          Сохранить
        </Button>
      </CardFooter>
    </Card>
  );
}
