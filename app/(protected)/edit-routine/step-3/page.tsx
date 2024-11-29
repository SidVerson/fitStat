import { auth } from "@clerk/nextjs";
import prisma from "@/prisma/prisma";
import PageHeading from "@/components/PageHeading/PageHeading";
//import StepProgress from "../_components/StepProgress";
import RoutineBuilder from "./_components/RoutineBuilder";

export default async function NewRoutineFormStepTwo({
  searchParams,
}: {
  searchParams?: {
    id?: string;
  };
}) {
  const { userId }: { userId: string | null } = auth();

  if (!userId) {
    throw new Error("You must be signed in to view this page.");
  }

  const routineId = searchParams?.id || "";

  const routine = await prisma.workoutPlan.findUnique({
    where: {
      id: routineId,
    },
    include: {
      WorkoutPlanExercise: {
        include: {
          Exercise: true,
        },
      },
    },
  });

  if (!routine) {
    throw new Error("No Routine found.");
  }

  return (
    <>
      <PageHeading title="Новая программа - шаг 3" />
      <p className="mb-3 text-zinc-600 dark:text-zinc-400 text-sm">
        Вы почти у цели! Теперь выберите, как вы хотите отслеживать каждое
        упражнений: по повторениям или по продолжительности. Затем расположите
        упражнения в в нужном вам порядке. Для каждого упражнения укажите
        количество повторений или продолжительность (в минутах или секундах) и
        сеты, которые вы хотите выполнить.
      </p>
      <RoutineBuilder routine={routine} />
    </>
  );
}
