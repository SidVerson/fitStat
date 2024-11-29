"use client";
import { useRouter } from "next/navigation";
import { handleDeleteRoutine } from "@/server-actions/RoutineServerActions";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { IconEdit, IconMenu2, IconTrash } from "@tabler/icons-react";
import { toast } from "sonner";

export default function RoutineMenu({ routineId }: { routineId: string }) {
  const router = useRouter();

  const handleDelete = async (routineId: string) => {
    const response = await handleDeleteRoutine(routineId);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  const handleAction = (key: string, routineId: string) => {
    if (key === "delete") {
      const confirmDelete = window.confirm(
        "Вы уверенны что хотите удалить эту программу?",
      );
      if (confirmDelete) {
        handleDelete(routineId);
      }
    } else if (key === "edit") {
      router.push(`/edit-routine/step-1?id=${routineId}`);
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <button className="shrink-0" aria-label="Routine actions">
          <IconMenu2 className="text-black dark:text-primary" size={22} />
        </button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Static Actions"
        onAction={(key) => handleAction(String(key), routineId)}
      >
        <DropdownSection showDivider>
          <DropdownItem startContent={<IconEdit size={20} />} key="edit">
            Редактировать
          </DropdownItem>
        </DropdownSection>

        <DropdownItem
          startContent={<IconTrash size={20} />}
          key="delete"
          className="text-danger"
          color="danger"
        >
          Удалить
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
