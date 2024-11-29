"use client";
import { Table, TableBody, TableColumn, TableHeader } from "@nextui-org/table";

export default function ExerciseTableSkeleton() {
  return (
    <Table aria-label="Example empty table">
      <TableHeader>
        <TableColumn>Название</TableColumn>
        <TableColumn className="hidden lg:table-cell">Мускулы</TableColumn>
        <TableColumn className="hidden lg:table-cell">Категория</TableColumn>
        <TableColumn>
          <></>
        </TableColumn>
      </TableHeader>
      <TableBody emptyContent={"Загрузка..."}>{[]}</TableBody>
    </Table>
  );
}
