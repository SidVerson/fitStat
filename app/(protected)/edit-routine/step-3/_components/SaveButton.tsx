import { Button } from "@nextui-org/button";
import { IconDeviceFloppy } from "@tabler/icons-react";

type SaveButtonProps = {
  handleSave: () => void;
  isLoading: boolean;
};

export default function SaveButton({ handleSave, isLoading }: SaveButtonProps) {
  return (
    <Button variant="flat" onPress={handleSave} isLoading={isLoading}>
      <IconDeviceFloppy size={18} /> Сохранить
    </Button>
  );
}
