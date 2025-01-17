import { Spinner } from "@nextui-org/spinner";

export default function Loading() {
  return (
    <>
      <div className="flex justify-center items-center h-screen w-full">
        <Spinner label="Загрузка..." color="primary" />
      </div>
    </>
  );
}
