"use client";
import { usePathname } from "next/navigation";
import { useWorkoutControls } from "@/contexts/WorkoutControlsContext";
import Link from "next/link";
import {
  IconAlertCircleFilled,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";
import { Button } from "@nextui-org/button";

export default function ActiveWorkoutWarning() {
  const { activeWorkoutRoutine } = useWorkoutControls();
  const pathname = usePathname();
  const workoutPath = `/workout/${activeWorkoutRoutine}`;

  if (!activeWorkoutRoutine || pathname === workoutPath) {
    return null;
  }

  return (
    <div className="py-2 px-3 bg-content1 rounded-xl flex justify-between items-center mb-3">
      <div className="flex gap-2 items-center">
        <IconAlertCircleFilled size={18} className="text-warning" />
        <p className="text-sm">У вас идет тренировка</p>
      </div>

      <Button
        color="primary"
        as={Link}
        size="sm"
        href={`/workout/${activeWorkoutRoutine}`}
      >
        <IconPlayerPlayFilled size={16} />
        Продолжить тренировку
      </Button>
    </div>
  );
}
