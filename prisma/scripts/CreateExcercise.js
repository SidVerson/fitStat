import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function importExercises() {
  const exercisesPath = path.resolve("public/images/exercises");

  // Прочитать все папки в директории упражнений
  const exerciseFolders = fs.readdirSync(exercisesPath);

  for (const folder of exerciseFolders) {
    const folderPath = path.join(exercisesPath, folder);

    // Проверить наличие файла exercise.json
    const jsonPath = path.join(folderPath, "exercise.json");
    if (!fs.existsSync(jsonPath)) {
      console.warn(`Файл exercise.json отсутствует в папке: ${folder}`);
      continue;
    }

    // Прочитать и разобрать JSON
    const exerciseData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

    // Проверить наличие папки images
    const imagesFolderPath = path.join(folderPath, "images");
    if (!fs.existsSync(imagesFolderPath)) {
      console.warn(`Папка images отсутствует в папке: ${folder}`);
      continue;
    }

    // Определить пути к изображениям внутри папки images
    const images = ["0", "1"].map((img) =>
      path.join(imagesFolderPath, `${img}.jpg`),
    );
    const existingImages = images.filter((img) => fs.existsSync(img));

    // Преобразовать данные и записать в базу данных
    try {
      const newExercise = await prisma.exercise.create({
        data: {
          name: exerciseData.name,
          aliases: [], // Если у вас нет данных об алиасах, можно оставить пустым
          primary_muscles: exerciseData.primaryMuscles || [],
          secondary_muscles: exerciseData.secondaryMuscles || [],
          force: exerciseData.force || null,
          level: exerciseData.level || "beginner",
          mechanic: exerciseData.mechanic || null,
          equipment: exerciseData.equipment || null,
          category: exerciseData.category || "other",
          instructions: exerciseData.instructions || [],
          description: exerciseData.description || null,
          tips: exerciseData.tips || [],
          image: existingImages.length > 0 ? `${folder}` : null,
        },
      });

      console.log(`Успешно добавлено упражнение: ${newExercise.name}`);
    } catch (error) {
      console.error(
        `Ошибка при добавлении упражнения из папки ${folder}:`,
        error,
      );
    }
  }

  console.log("Импорт упражнений завершён.");
  await prisma.$disconnect();
}

importExercises()
  .catch((e) => {
    console.error("Произошла ошибка:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
