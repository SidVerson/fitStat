interface WorkoutPlanExerciseBase {
  exerciseId: string;
  sets: number;
  order: number;
  trackingType: "reps" | "duration";
}

interface WorkoutPlanExerciseReps extends WorkoutPlanExerciseBase {
  reps: number;
  duration?: never;
}

interface WorkoutPlanExerciseDuration extends WorkoutPlanExerciseBase {
  reps?: never;
  duration: number;
}

type WorkoutPlanExercise =
  | WorkoutPlanExerciseReps
  | WorkoutPlanExerciseDuration;

interface WorkoutPlanInput {
  name: string;
  notes: string;
  systemRoutineCategory: string;
  WorkoutPlanExercises: WorkoutPlanExercise[];
}

export const predefinedWorkouts: WorkoutPlanInput[] = [
  {
    name: "Тренировка для всего тела по силе",
    systemRoutineCategory: "Сила",
    notes:
      "Эта тренировка направлена на проработку всех основных групп мышц, создавая прочную основу для силы. Идеально для тех, кто хочет улучшить общую силу и выносливость.",
    WorkoutPlanExercises: [
      {
        exerciseId: "5d31ddf6-0bb6-49c5-bace-c6757e62067d",
        sets: 3,
        reps: 8,
        order: 1,
        trackingType: "reps",
      },
      {
        exerciseId: "02b01ad9-6f16-4f49-88f6-7f8d2b850825",
        sets: 3,
        reps: 8,
        order: 2,
        trackingType: "reps",
      },
      {
        exerciseId: "638ae255-0e53-4bfd-ac92-f21481ddd29b",
        sets: 3,
        reps: 8,
        order: 3,
        trackingType: "reps",
      },
      {
        exerciseId: "61d98bf0-30e1-498a-b875-23f500c6d4b5",
        sets: 3,
        reps: 8,
        order: 4,
        trackingType: "reps",
      },
      {
        exerciseId: "93b9ccd7-6436-47ad-aafc-81a1db980853",
        sets: 3,
        reps: 8,
        order: 5,
        trackingType: "reps",
      },
      {
        exerciseId: "d1c021e4-f82b-40a2-a882-9d4cab6faec5",
        sets: 3,
        duration: 30,
        order: 6,
        trackingType: "duration",
      },
    ],
  },
  {
    name: "Сила верхней части тела",
    systemRoutineCategory: "Сила",
    notes:
      "Фокус на развитие силы в груди, спине, плечах и руках. Идеально для тех, кто хочет увеличить силу верхней части тела и мышечное рельефное развитие.",
    WorkoutPlanExercises: [
      {
        exerciseId: "5decc5cc-8e71-49d4-8f76-c61dfd4b314f",
        sets: 4,
        reps: 6,
        order: 1,
        trackingType: "reps",
      },
      {
        exerciseId: "4971a068-7d30-440e-b28c-a2505766f870",
        sets: 4,
        reps: 6,
        order: 2,
        trackingType: "reps",
      },
      {
        exerciseId: "7e5b08db-9005-43d9-829d-698c4e69cd56",
        sets: 3,
        reps: 8,
        order: 3,
        trackingType: "reps",
      },
      {
        exerciseId: "b338cafd-3527-4c5d-9b33-6a79f0d73c10",
        sets: 3,
        reps: 10,
        order: 4,
        trackingType: "reps",
      },
      {
        exerciseId: "bd0feaf6-c5c3-4904-847d-78c13fd682a3",
        sets: 3,
        reps: 10,
        order: 5,
        trackingType: "reps",
      },
      {
        exerciseId: "1d24738f-99ed-4d09-bbd4-1476f05c2a78",
        sets: 3,
        reps: 10,
        order: 6,
        trackingType: "reps",
      },
    ],
  },
  {
    name: "Взрывная тренировка для нижней части тела",
    systemRoutineCategory: "Сила",
    notes:
      "Комплексная тренировка для нижней части тела, направленная на укрепление и тонизацию ног и ягодиц. Отлично подходит для построения силы и выносливости.",
    WorkoutPlanExercises: [
      {
        exerciseId: "070ee9ad-a152-4ec7-a9cf-af7dce0b588a",
        sets: 4,
        reps: 8,
        order: 1,
        trackingType: "reps",
      },
      {
        exerciseId: "395e0fdb-56bb-4010-b76b-5c2a5da5b8c1",
        sets: 4,
        reps: 8,
        order: 2,
        trackingType: "reps",
      },
      {
        exerciseId: "5c142963-87a6-47ad-b86f-b72233210c9c",
        sets: 3,
        reps: 10,
        order: 3,
        trackingType: "reps",
      },
      {
        exerciseId: "5e562c3a-460f-4b5b-a290-a111ed330600",
        sets: 3,
        reps: 10,
        order: 4,
        trackingType: "reps",
      },
      {
        exerciseId: "25ad79dd-25c7-42e3-87ec-568badf06b9c",
        sets: 3,
        reps: 15,
        order: 5,
        trackingType: "reps",
      },
    ],
  },
  {
    name: "Стабильность и сила кора",
    systemRoutineCategory: "Сила",
    notes:
      "Эта тренировка сосредоточена на укреплении и стабилизации мышц кора, что важно для общей физической формы и профилактики травм.",
    WorkoutPlanExercises: [
      {
        exerciseId: "2edae032-539a-46c4-955a-246e43ee3e1e",
        sets: 3,
        duration: 30,
        order: 1,
        trackingType: "duration",
      },
      {
        exerciseId: "64b0848c-3111-42af-81fe-277267ac8e35",
        sets: 3,
        reps: 12,
        order: 2,
        trackingType: "reps",
      },
      {
        exerciseId: "618fbbce-f6e5-413f-9428-d5cda26f658a",
        sets: 3,
        reps: 15,
        order: 3,
        trackingType: "reps",
      },
      {
        exerciseId: "a74d6c2a-3091-4991-a194-7a8a08651283",
        sets: 3,
        reps: 20,
        order: 4,
        trackingType: "reps",
      },
      {
        exerciseId: "17651cd9-6c45-485f-9b9a-4008bee3e7c3",
        sets: 3,
        reps: 10,
        order: 5,
        trackingType: "reps",
      },
    ],
  },

  // Cardio

  // Flexibility

  // Weight Loss

  // Beginner
];
