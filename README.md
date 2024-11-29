
# Fitstat

Курсач для Ванька




## Запуск

Клонировать проект

```bash
  git clone https://github.com/SidVerson/fitStat.git
```

Войти в папку проекта

```bash
  cd fitForge
```

Установить зависимости

```bash
  npm install
```

Создать файл .env со следующим содержанием

```bash
  DATABASE_URL=postgresql://ПОЛЬЗОВАТЕЛЬБД:ПАРОЛЬБД@localhost:5432/ИМЯБД

```
Создать файл .env.local со следующим содержанием

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_c3VubnktY29uZG9yLTQyLmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY=sk_test_maL0kSwJRXBu7PuqD0avFXI3kk0QiYPWQbSMjr3e0u

```

Сделать миграции бд

```bash
  npx prisma migrate dev
```

Добавить упражнения в бд

```bash
  node prisma/scripts/CreateExcercise.js
```

Далее надо зайти в файл prisma/scripts/predefinedWorkouts и массиве тренировок поменять поля exerciseID на поля id из твоей бд после выполнить

```bash
  npx tsx prisma/scripts/MigrateRoutines.ts
```

Запустить проект

```bash
  npm run dev
```

