"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { handleCreateRoutineStepOne } from "@/server-actions/RoutineServerActions";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { IconPlayerTrackNextFilled } from "@tabler/icons-react";

export default function NewRoutineFormStepOneClient({
  routineId,
  routineName,
  routineNotes,
  pageTitle,
}: {
  routineId: string | null;
  routineName: string;
  routineNotes: string;
  pageTitle: string;
}) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    const formData = new FormData(event.currentTarget);
    if (routineId) {
      formData.append("routineId", routineId);
    }
    const response = await handleCreateRoutineStepOne(formData, routineId);
    if (response.success) {
      router.push(`/edit-routine/step-2?id=${response.newRoutineId}`);
    } else {
      toast.error(response.message);
    }
    setIsSaving(false);
  };

  return (
    <Card className="max-w-screen-sm mx-auto shadow-md" shadow="none">
      <CardHeader className="text-2xl font-semibold tracking-tight p-3 md:p-5 pb-0 md:pb-0">
        {pageTitle}
      </CardHeader>
      <CardBody className="p-3 md:p-5">
        <p className="mb-3 text-sm text-zinc-500">
          Добро пожаловать на первый шаг в создании вашего индивидуального плана
          тренировок! С этого момента начинается ваше фитнес-путешествие, и мы
          рады принять в нем участие. Давайте начнем с основ.
        </p>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <Input
            name="routineName"
            placeholder="Моя программа..."
            label="Название программы"
            isRequired
            defaultValue={routineName}
          />
          <Textarea
            name="routineNotes"
            label="Описание"
            defaultValue={routineNotes}
          />
          <div className="flex justify-center">
            <Button isDisabled={isSaving} variant="flat" type="submit">
              Дальше <IconPlayerTrackNextFilled size={18} />
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
