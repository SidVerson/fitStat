"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConfetti } from "@/contexts/ConfettiContext";
import { TrackingType } from "@prisma/client";

import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Button, ButtonGroup } from "@nextui-org/button";
import { IconPlus, IconX } from "@tabler/icons-react";

import { useWorkoutControls } from "@/contexts/WorkoutControlsContext";
import { useWorkoutData } from "@/contexts/WorkoutDataContext";

import ExerciseTable from "./ExerciseTable";
import StatusBar from "./StatusBar";
import { handleSaveWorkout } from "@/server-actions/WorkoutServerActions";
import ExerciseOrderIndicator from "@/components/Generic/ExerciseOrderIndicator";

interface Exercise {
  id: string;
  name: string;
}

interface WorkoutPlanExercise {
  Exercise: Exercise;
  sets: number;
  reps: number | null;
  exerciseDuration: number | null;
  trackingType: string;
  order: number | null;
}

interface Workout {
  id: string;
  name: string;
  notes: string | null;
  WorkoutPlanExercise: WorkoutPlanExercise[];
}

export default function WorkoutManager({ workout }: { workout: Workout }) {
  const router = useRouter();
  const workoutPlanId = workout.id;

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const { startConfetti } = useConfetti();
  const { workoutExercises, setWorkoutExercises } = useWorkoutData();
  const {
    setIsSaving,
    workoutDuration,
    setWorkoutDuration,
    workoutStartTime,
    setWorkoutStartTime,
    activeWorkoutRoutine,
    setActiveWorkoutRoutine,
    startWorkout,
  } = useWorkoutControls();

  // Populate our empty context state with the exercise data.
  useEffect(() => {
    if (!isDataLoaded && !activeWorkoutRoutine && workout) {
      const initialWorkoutExercises = workout.WorkoutPlanExercise.map(
        (exerciseDetail) => ({
          exerciseId: exerciseDetail.Exercise.id,
          exerciseName: exerciseDetail.Exercise.name,
          sets: Array.from({ length: exerciseDetail.sets }, () => ({
            completed: false,
            reps: exerciseDetail.reps || null,
            duration: exerciseDetail.exerciseDuration || null,
            weight: null,
          })),
          trackingType: exerciseDetail.trackingType,
        }),
      );
      setWorkoutExercises(initialWorkoutExercises);
      setIsDataLoaded(true);
    }
  }, [workout, activeWorkoutRoutine, setWorkoutExercises, isDataLoaded]);

  // Handle clicking complete set button
  const handleCompleteSet = (
    exerciseIndex: number,
    setIndex: number,
    exerciseName: string,
    isSelected: boolean,
  ) => {
    if (!workoutExercises) {
      toast.error("Workout exercises data is not loaded yet");
      return;
    }

    const exerciseDetail = workoutExercises[exerciseIndex];
    const set = exerciseDetail.sets[setIndex];

    if (
      set.weight === null ||
      !Number(set.weight) ||
      (exerciseDetail.trackingType === "reps" &&
        (set.reps === null || !Number(set.reps))) ||
      (exerciseDetail.trackingType === "duration" &&
        (set.duration === null || !Number(set.duration)))
    ) {
      toast.error(
        "Пожалуйста, заполните все поля, прежде чем отмечать подход как завершенный",
      );
      return;
    }

    if (!workoutStartTime) {
      startWorkout(workoutPlanId);
    }
    setWorkoutExercises((prevWorkoutExercises) => {
      if (!prevWorkoutExercises) return prevWorkoutExercises;
      const updatedWorkoutExercises = [...prevWorkoutExercises];
      const exerciseToUpdate = { ...updatedWorkoutExercises[exerciseIndex] };
      const setToUpdate = { ...exerciseToUpdate.sets[setIndex] };
      setToUpdate.completed = isSelected;
      exerciseToUpdate.sets[setIndex] = setToUpdate;
      updatedWorkoutExercises[exerciseIndex] = exerciseToUpdate;
      if (setToUpdate.completed) {
        toast.success(`${exerciseName} Подход ${setIndex + 1} завершен`);
      } else {
        toast(`${exerciseName} Подход ${setIndex + 1} отмечен незавершенным`);
      }
      return updatedWorkoutExercises;
    });
  };

  const handleWeightChange = (
    exerciseIndex: number,
    setIndex: number,
    newValue: number,
  ) => {
    setWorkoutExercises((prevWorkoutExercises) => {
      if (!prevWorkoutExercises) return prevWorkoutExercises;

      const updatedWorkoutExercises = [...prevWorkoutExercises];
      const exerciseToUpdate = { ...updatedWorkoutExercises[exerciseIndex] };
      const setToUpdate = { ...exerciseToUpdate.sets[setIndex] };
      setToUpdate.weight = newValue;
      exerciseToUpdate.sets[setIndex] = setToUpdate;
      updatedWorkoutExercises[exerciseIndex] = exerciseToUpdate;
      return updatedWorkoutExercises;
    });
  };

  // Handle changing reps for a set
  const handleRepChange = (
    exerciseIndex: number,
    setIndex: number,
    newValue: number | null,
  ) => {
    setWorkoutExercises((prevWorkoutExercises) => {
      if (!prevWorkoutExercises) return prevWorkoutExercises;

      const updatedWorkoutExercises = [...prevWorkoutExercises];
      const exerciseToUpdate = { ...updatedWorkoutExercises[exerciseIndex] };
      const setToUpdate = { ...exerciseToUpdate.sets[setIndex] };
      setToUpdate.reps = newValue;
      exerciseToUpdate.sets[setIndex] = setToUpdate;
      updatedWorkoutExercises[exerciseIndex] = exerciseToUpdate;
      return updatedWorkoutExercises;
    });
  };

  //Handle changing exerciseDuration for a set
  const handleDurationChange = (
    exerciseIndex: number,
    setIndex: number,
    newValue: number | null,
  ) => {
    setWorkoutExercises((prevWorkoutExercises) => {
      if (!prevWorkoutExercises) return prevWorkoutExercises;

      const updatedWorkoutExercises = [...prevWorkoutExercises];
      const exerciseToUpdate = { ...updatedWorkoutExercises[exerciseIndex] };
      const setToUpdate = { ...exerciseToUpdate.sets[setIndex] };
      setToUpdate.duration = newValue;
      exerciseToUpdate.sets[setIndex] = setToUpdate;
      updatedWorkoutExercises[exerciseIndex] = exerciseToUpdate;
      return updatedWorkoutExercises;
    });
  };

  // Add Sets to exercise
  const addSet = (exerciseIndex: number, exerciseName: string) => {
    setWorkoutExercises((prevWorkoutExercises) => {
      if (!prevWorkoutExercises) return prevWorkoutExercises;
      const updatedWorkoutExercises = [...prevWorkoutExercises];
      const exerciseToUpdate = { ...updatedWorkoutExercises[exerciseIndex] };
      const newSet = {
        completed: false,
        reps: workout.WorkoutPlanExercise[exerciseIndex].reps || null,
        duration:
          workout.WorkoutPlanExercise[exerciseIndex].exerciseDuration || null,
        weight: null,
      };
      exerciseToUpdate.sets = [...exerciseToUpdate.sets, newSet];
      updatedWorkoutExercises[exerciseIndex] = exerciseToUpdate;
      toast.success(`Подход добавлен в ${exerciseName}`);
      return updatedWorkoutExercises;
    });
  };

  //Remove Sets from exercise
  const removeSet = (exerciseIndex: number, exerciseName: string) => {
    setWorkoutExercises((prevWorkoutExercises) => {
      if (!prevWorkoutExercises) return prevWorkoutExercises;
      const updatedWorkoutExercises = [...prevWorkoutExercises];
      if (updatedWorkoutExercises[exerciseIndex].sets.length > 1) {
        if (
          window.confirm(
            `Вы уверены, что хотите удалить последний подход из ${exerciseName}?`,
          )
        ) {
          const exerciseToUpdate = {
            ...updatedWorkoutExercises[exerciseIndex],
          };
          exerciseToUpdate.sets.pop();
          updatedWorkoutExercises[exerciseIndex] = exerciseToUpdate;
          toast.success(`Подход удален из ${exerciseName}`);
          return updatedWorkoutExercises;
        }
      } else {
        toast.error(
          `Невозможно удалить. Как минимум один подход необходим для ${exerciseName}.`,
        );
      }
      return prevWorkoutExercises;
    });
  };

  // Cancel workout and reset states
  const cancelWorkout = () => {
    if (
      window.confirm(
        "Вы уверены, что хотите отменить тренировку? Данные не будут сохранены.",
      )
    ) {
      setWorkoutExercises([]);
      setWorkoutDuration(0);
      setWorkoutStartTime(null);
      setActiveWorkoutRoutine(null);
      toast("Тренировка отменена");
      router.push("/workout");
    }
  };

  const completeWorkout = async () => {
    if (workoutExercises) {
      const hasIncompleteSets = workoutExercises.some((exercise) =>
        exercise.sets.some((set) => !set.completed),
      );

      if (hasIncompleteSets) {
        const proceedWithIncompleteSets = window.confirm(
          "Есть неполные подходы. Они не будут сохранены. Вы хотите продолжить?",
        );
        if (!proceedWithIncompleteSets) {
          return;
        }
      }

      const filteredExercises = workoutExercises
        .filter((exercise) => exercise.sets.some((set) => set.completed))
        .map((exercise) => ({
          ...exercise,
          sets: exercise.sets.filter((set) => set.completed),
        }));

      if (filteredExercises.length === 0) {
        toast.error(
          "Чтобы сохранить тренировку, необходимо выполнить хотя бы один сет.",
        );
        return;
      }

      try {
        setIsSaving(true);

        const exercisesData = filteredExercises.map((exercise) => ({
          exerciseId: exercise.exerciseId,
          trackingType:
            TrackingType[exercise.trackingType as keyof typeof TrackingType],
          sets: exercise.sets.map((set) => ({
            reps: set.reps,
            weight: set.weight,
            duration: set.duration,
            completed: set.completed,
          })),
        }));

        const data = {
          name: workout.name,
          date: new Date().toISOString(),
          duration: workoutDuration,
          workoutPlanId: workout.id,
          exercises: exercisesData,
        };

        const response = await handleSaveWorkout(data);

        if (response.success) {
          startConfetti();
          router.push("/dashboard");
          setWorkoutExercises([]);
          setWorkoutDuration(0);
          setWorkoutStartTime(null);
          setActiveWorkoutRoutine(null);
          toast.success("Тренировка успешно сохранена!");
        } else {
          toast.error("Не удалось сохранить тренировку");
        }
      } catch (error) {
        toast.error("При сохранении тренировки произошла ошибка");
      } finally {
        setIsSaving(false);
      }
    } else {
      toast.error("Тренировочные упражнения отсутствуют.");
    }
  };

  const workoutName = workout.name;

  // Completion Percentage Calculator
  const totalSets = workoutExercises
    ? workoutExercises.reduce((acc, curr) => acc + curr.sets.length, 0)
    : 0;

  const completedSets = workoutExercises
    ? workoutExercises.reduce(
        (acc, curr) => acc + curr.sets.filter((set) => set.completed).length,
        0,
      )
    : 0;

  const progressPercentage =
    totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0;

  return (
    <div className="pb-32">
      {workout.notes && (
        <p className="mb-3 text-sm text-zinc-500">{workout.notes}</p>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-3">
        {workoutExercises?.map((exercise, index) => (
          <Card shadow="none" className="shadow-md" key={exercise.exerciseId}>
            <CardHeader className="text-lg px-5">
              <div className="flex gap-2 items-center mb-3">
                <ExerciseOrderIndicator position={index} />
                <p className="text-lg">{exercise.exerciseName}</p>
              </div>
            </CardHeader>
            <CardBody className="pb-1 pt-0">
              <ExerciseTable
                exerciseDetail={exercise}
                index={index}
                handleCompleteSet={handleCompleteSet}
                handleWeightChange={handleWeightChange}
                handleRepChange={handleRepChange}
                handleDurationChange={handleDurationChange}
              />
            </CardBody>
            <CardFooter className="gap-2 px-5 bg-default-100">
              <ButtonGroup className="shrink-0">
                <Button
                  size="sm"
                  onPress={() => addSet(index, exercise.exerciseName)}
                >
                  <IconPlus size={16} />
                  Добавить подход
                </Button>
                <Button
                  size="sm"
                  onPress={() => removeSet(index, exercise.exerciseName)}
                >
                  <IconX size={16} />
                  Удалить подход
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        ))}
      </div>
      <StatusBar
        completeWorkout={completeWorkout}
        progressPercentage={progressPercentage}
        activeRoutineId={workoutPlanId}
        cancelWorkout={cancelWorkout}
      />
    </div>
  );
}
