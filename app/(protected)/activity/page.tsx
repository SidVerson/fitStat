import PageHeading from "@/components/PageHeading/PageHeading";
import ActivityList from "./_components/ActivityList";
import { Suspense } from "react";

export default async function ActivityPage() {
  return (
    <>
      <PageHeading title="Тренировки" />
      <Suspense fallback={<div>Loading...</div>}>
        <ActivityList />
      </Suspense>
    </>
  );
}
