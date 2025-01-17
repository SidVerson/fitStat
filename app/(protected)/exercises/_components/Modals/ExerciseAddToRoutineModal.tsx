"use client";
import { useContext, useState } from "react";
import {
  handleAddExerciseToExistingRoutine,
  handleAddExerciseToNewRoutine,
} from "@/server-actions/ExerciseServerActions";
import { User } from "@nextui-org/user";
import { ExerciseAddToRoutineModalContext } from "@/contexts/ExerciseAddToRoutineModalContext";

import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { IconPlus } from "@tabler/icons-react";
import { Input } from "@nextui-org/input";
import { Divider } from "@nextui-org/divider";
import { toast } from "sonner";
import { Radio, RadioGroup } from "@nextui-org/radio";

export default function ExerciseAddToRoutineModal() {
  const { exercise, isOpen, onOpenChange, userRoutines } = useContext(
    ExerciseAddToRoutineModalContext,
  );

  const [page, setPage] = useState(1);
  const [trackingType, setTrackingType] = useState("reps");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [duration, setDuration] = useState("");
  const [routineName, setRoutineName] = useState("");
  const [setsInvalid, setSetsInvalid] = useState(false);
  const [repsInvalid, setRepsInvalid] = useState(false);
  const [durationInvalid, setDurationInvalid] = useState(false);
  const [routineNameInvalid, setRoutineNameInvalid] = useState(false);

  if (!exercise) {
    return null;
  }

  const handleAddToNewRoutine = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (routineName === "") {
      setRoutineNameInvalid(true);
      return;
    }

    try {
      const response = await handleAddExerciseToNewRoutine({
        routineName,
        exerciseId: exercise.id,
        sets,
        reps,
        duration,
        trackingType: trackingType === "reps" ? "reps" : "duration",
      });

      if (response.success) {
        toast.success(response.message);
        onOpenChange(false);
        setTrackingType("reps");
        setSets("");
        setReps("");
        setDuration("");
        setRoutineName("");
        setPage(1);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleAddToExistingRoutine = async (routineId: string) => {
    try {
      const response = await handleAddExerciseToExistingRoutine({
        routineId,
        exerciseId: exercise.id,
        sets,
        reps,
        duration,
        trackingType: trackingType === "reps" ? "reps" : "duration",
      });

      if (response.success) {
        toast.success(response.message);
        onOpenChange(false);
        setTrackingType("reps");
        setSets("");
        setReps("");
        setDuration("");
        setRoutineName("");
        setPage(1);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleNext = () => {
    let isValid = true;

    if (sets === "") {
      setSetsInvalid(true);
      isValid = false;
    } else {
      setSetsInvalid(false);
    }

    if (trackingType === "reps" && reps === "") {
      setRepsInvalid(true);
      isValid = false;
    } else {
      setRepsInvalid(false);
    }

    if (trackingType === "duration" && duration === "") {
      setDurationInvalid(true);
      isValid = false;
    } else {
      setDurationInvalid(false);
    }

    if (isValid) {
      setPage(2);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      backdrop="blur"
      onOpenChange={onOpenChange}
      isKeyboardDismissDisabled
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex">
              Добавить {exercise.name} в программу
            </ModalHeader>
            <ModalBody className="pb-5">
              {page === 1 && (
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="space-y-3"
                >
                  <Input
                    type="number"
                    size="sm"
                    variant="bordered"
                    name="sets"
                    label="Sets"
                    placeholder="Sets..."
                    value={sets}
                    onChange={(e) => {
                      setSets(e.target.value);
                      if (e.target.value !== "") {
                        setSetsInvalid(false);
                      }
                    }}
                    isRequired
                    isInvalid={setsInvalid}
                    errorMessage={
                      setsInvalid
                        ? "Введите валидное кол-во подходов"
                        : undefined
                    }
                  />

                  <RadioGroup
                    orientation="horizontal"
                    defaultValue="reps"
                    onValueChange={setTrackingType}
                  >
                    <Radio value="reps">Повторения</Radio>
                    <Radio value="duration">Длительность</Radio>
                  </RadioGroup>

                  {trackingType === "reps" ? (
                    <Input
                      type="number"
                      size="sm"
                      variant="bordered"
                      name="reps"
                      label="Подходы"
                      placeholder="Подходы..."
                      value={reps}
                      onChange={(e) => {
                        setReps(e.target.value);
                        if (e.target.value !== "") {
                          setRepsInvalid(false);
                        }
                      }}
                      isRequired
                      isInvalid={repsInvalid}
                      errorMessage={
                        repsInvalid
                          ? "Введите валидное кол-во подходов"
                          : undefined
                      }
                    />
                  ) : (
                    <Input
                      type="number"
                      size="sm"
                      name="duration"
                      variant="bordered"
                      label="Длительность"
                      placeholder="Длительность..."
                      value={duration}
                      onChange={(e) => {
                        setDuration(e.target.value);
                        if (e.target.value !== "") {
                          setDurationInvalid(false);
                        }
                      }}
                      isRequired
                      isInvalid={durationInvalid}
                      errorMessage={
                        durationInvalid
                          ? "Введите валидную длительность"
                          : undefined
                      }
                    />
                  )}

                  <div>
                    <Button onClick={handleNext} size="md">
                      Next
                    </Button>
                  </div>
                </form>
              )}

              {page === 2 && (
                <div>
                  <form onSubmit={handleAddToNewRoutine} className="space-y-3">
                    <h5 className="font-semibold mb-2">Новая программа</h5>
                    <Input
                      name="routineName"
                      placeholder="Моя супер программа"
                      size="sm"
                      label="Название"
                      variant="bordered"
                      className="grow mb-3"
                      value={routineName}
                      onChange={(e) => {
                        setRoutineName(e.target.value);
                        if (e.target.value !== "") {
                          setRoutineNameInvalid(false);
                        }
                      }}
                      isInvalid={routineNameInvalid}
                      errorMessage={
                        routineNameInvalid ? "Введите название" : undefined
                      }
                    />
                    <div>
                      <Button type="submit" size="md">
                        Сохранить
                      </Button>
                    </div>
                  </form>

                  {userRoutines.length > 0 && (
                    <>
                      <Divider className="my-3 dark:bg-zinc-800" />

                      <h5 className="font-semibold mb-2">Ваши упражнения</h5>

                      <ul>
                        {userRoutines.map((routine) => (
                          <li key={routine.id}>
                            <form
                              className="flex gap-x-2 justify-between items-center space-y-2"
                              onSubmit={(e) => {
                                e.preventDefault();
                                handleAddToExistingRoutine(routine.id);
                              }}
                            >
                              <User
                                name={routine.name}
                                description={`${routine.exerciseCount} Упражнений`}
                              />
                              <div>
                                <Button
                                  type="submit"
                                  size="md"
                                  variant="flat"
                                  isIconOnly
                                >
                                  <IconPlus size={18} />
                                </Button>
                              </div>
                            </form>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  <Divider className="my-3 dark:bg-zinc-800" />

                  <div>
                    <Button onClick={() => setPage(1)} size="md">
                      Назад
                    </Button>
                  </div>
                </div>
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
