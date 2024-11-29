"use client";
import { useState } from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { IconDeviceFloppy, IconSettings, IconUser } from "@tabler/icons-react";
import { handleUpdateUserDetails } from "@/server-actions/UserServerActions";
import { toast } from "sonner";
import Link from "next/link";

export default function ProfileDetails({
  username,
  firstName,
  lastName,
}: {
  username: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
}) {
  const [inputName, setInputName] = useState(username || "");
  const [inputFirstName, setInputFirstName] = useState(firstName || "");
  const [inputLastName, setInputLastName] = useState(lastName || "");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const data = {
      username: inputName,
      firstName: inputFirstName,
      lastName: inputLastName,
    };

    const response = await handleUpdateUserDetails(data);
    if (response.success) {
      toast.success("User info updated");
    } else {
      toast.error("Failed to update user info");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card shadow="none" className="shadow-md mb-3">
          <CardHeader className="text-xl font-semibold px-5 pb-0 gap-x-3 items-center">
            <IconUser className="text-danger" />
            Данные
          </CardHeader>
          <CardBody className="px-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Input
                type="text"
                label="Никнейм"
                size="sm"
                placeholder="Введите ваш никнейм"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                isRequired
              />

              <Input
                type="text"
                label="Имя"
                size="sm"
                placeholder="Введите имя"
                value={inputFirstName}
                onChange={(e) => setInputFirstName(e.target.value)}
              />

              <Input
                type="text"
                label="Фамилия"
                size="sm"
                placeholder="Введите фамилию"
                value={inputLastName}
                onChange={(e) => setInputLastName(e.target.value)}
              />
            </div>
          </CardBody>
          <CardFooter className="px-5 gap-3">
            <Button
              type="submit"
              variant="flat"
              startContent={<IconDeviceFloppy size={20} />}
            >
              Обновить
            </Button>
            <Button
              as={Link}
              href="/profile/advanced"
              variant="flat"
              startContent={<IconSettings size={20} />}
            >
              Расширенные настройки
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
}
