"use client";
import RoutineCards from "./RoutineCards";
import { Tab, Tabs } from "@nextui-org/tabs";
import {
  IconBarbell,
  IconJumpRope,
  IconScale,
  IconSeeding,
  IconStretching,
} from "@tabler/icons-react";
import { WorkoutPlan } from "@prisma/client";

type Exercise = {
  id: string;
  name: string;
  category: string;
};

type WorkoutPlanExercise = {
  Exercise: Exercise;
  order: number;
  sets: number;
};

type ExtendedWorkoutPlan = WorkoutPlan & {
  WorkoutPlanExercise: WorkoutPlanExercise[];
};

type SystemRoutineDisplayProps = {
  systemRoutines: ExtendedWorkoutPlan[];
};

export default function SystemRoutineDisplay({
  systemRoutines,
}: SystemRoutineDisplayProps) {
  const strengthRoutines = systemRoutines.filter(
    (routine) => routine.systemRoutineCategory === "Strength",
  );

  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options" size="sm" color="primary" variant="bordered">
        <Tab
          key="strength"
          title={
            <div className="flex items-center space-x-2">
              <IconBarbell />
              <span className="hidden lg:block">Силовые</span>
            </div>
          }
        >
          <h4 className="text-xl font-semibold mb-3 block md:hidden">
            Силовые
          </h4>
          <RoutineCards routines={strengthRoutines} isSystem={true} />
        </Tab>
        <Tab
          key="cardio"
          title={
            <div className="flex items-center space-x-2">
              <IconJumpRope />
              <span className="hidden lg:block">Кардио</span>
            </div>
          }
        >
          <h4 className="text-xl font-semibold mb-3 block md:hidden">Кардио</h4>
          <p>Coming soon</p>
        </Tab>
        <Tab
          key="flexibility"
          title={
            <div className="flex items-center space-x-2">
              <IconStretching />
              <span className="hidden lg:block">Гибкость</span>
            </div>
          }
        >
          <h4 className="text-xl font-semibold mb-3 block md:hidden">
            Гибкость
          </h4>
          <p>Coming soon</p>
        </Tab>
        <Tab
          key="weightLoss"
          title={
            <div className="flex items-center space-x-2">
              <IconScale />
              <span className="hidden lg:block">Сброс веса</span>
            </div>
          }
        >
          <h4 className="text-xl font-semibold mb-3 block md:hidden">
            Сброс веса
          </h4>
          <p>Coming soon</p>
        </Tab>
        <Tab
          key="beginner"
          title={
            <div className="flex items-center space-x-2">
              <IconSeeding />
              <span className="hidden lg:block">Для начинающих</span>
            </div>
          }
        >
          <h4 className="text-xl font-semibold mb-3 block md:hidden">
            Для начинающих
          </h4>
          <p>Coming soon</p>
        </Tab>
      </Tabs>
    </div>
  );
}
