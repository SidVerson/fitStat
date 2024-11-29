import Link from "next/link";
import {
  IconActivity,
  IconBook,
  IconChartBar,
  IconJumpRope,
  IconListCheck,
  IconPlayerPlayFilled,
  IconStretching,
  IconTournament,
  IconUser,
} from "@tabler/icons-react";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import PricingCard from "@/components/LandingPage/PricingCard";

export default function Home() {
  const cardData = [
    {
      icon: IconBook,
      title: "Откройте для себя свою идеальную тренировку",
      body: "Окунитесь в обширную библиотеку упражнений с подробными руководствами, видео и советами. Если вы хотите привести себя в тонус, нарастить мышцы или улучшить гибкость, наша обширная коллекция поможет вам в этом. Фильтруйте упражнения по группам мышц, сложности или оборудованию, чтобы легко найти те, которые соответствуют вашим целям. Это как личный тренер в кармане!",
    },
    {
      icon: IconListCheck,
      title: "Индивидуальные фитнес-планы",
      body: "Создавайте уникальные тренировки. Выберите из нашей обширной базы данных упражнения, чтобы составить план, соответствующий вашим целям, расписанию и уровню физической подготовки. Регулируйте количество сетов, повторений и продолжительность занятий в соответствии с вашими достижениями. Благодаря возможности персонализировать свой фитнес-путь, достижение ваших целей еще никогда не было таким достижимым.",
    },
    {
      icon: IconActivity,
      title: "Отслеживайте на ходу",
      body: "Не отвлекайтесь от тренировок, отслеживая их в режиме реального времени. Начните любую тренировку по своему плану и регистрируйте свои результаты по мере выполнения - записывайте каждое повторение, сет и вес, который вы поднимаете с легкостью. Такая оперативная обратная связь поддерживает мотивацию и гарантирует, что каждая тренировка пойдет в зачет ваших фитнес-величин.",
    },
    {
      icon: IconChartBar,
      title: "Визуализируйте свою победу",
      body: "Наблюдайте за своим фитнес-путешествием с помощью подробного отслеживания прогресса и аналитики. Наша приборная панель предлагает ценные сведения о ваших результатах с течением времени - от краткого описания тренировок до анализа тенденций. Ставьте цели, отслеживайте свои достижения и радуйтесь каждому улучшению. С нашей аналитикой вы не просто тренируетесь, вы строите себя лучше.",
    },
  ];

  return (
    <main className="min-h-dvh bg-gradient-to-b from-white to-zinc-200 dark:from-zinc-900 dark:to-zinc-950">
      <nav className="px-3 md:px-10 py-3 mb-5 flex justify-between items-center">
        <h4 className="flex items-center text-lg gap-2 font-semibold tracking-tight">
          <IconTournament className="text-primary" />
          FitStat
        </h4>
      </nav>

      <section className="mb-10 py-5 px-3 md:px-10  max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-6xl xl:text-7xl tracking-tight font-bold">
              Отслеживайте каждый{" "}
              <span className="from-primary to-primary-600 bg-clip-text text-transparent bg-gradient-to-b">
                Подход{" "}
              </span>
            </h1>
            <h1 className="text-4xl md:text-6xl xl:text-7xl tracking-tight font-bold mb-5">
              Достигните любых{" "}
              <span className="from-primary to-primary-600 bg-clip-text text-transparent bg-gradient-to-b">
                Целей{" "}
              </span>
            </h1>
            <p className="text-lg text-zinc-500 mb-5">
              Ваш незаменимый спутник в фитнесе. Будьте на высоте, оставайтесь
              активными с FitStat.
            </p>
            <div className="flex gap-3">
              <Button
                color="primary"
                as={Link}
                prefetch={false}
                href="/dashboard"
                size="lg"
              >
                <IconPlayerPlayFilled size={18} />
                Начать
              </Button>
            </div>
          </div>
          <div className="hidden lg:block">
            <Image
              src="/images/screenshots/img.png"
              alt="Screenshot of exercises page"
              width={1436}
              height={957}
              className="w-full h-auto rounded-xl shadow-xl"
            />
          </div>
        </div>
      </section>

      <section className="mb-10 py-5 px-3 md:px-10  max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {cardData.map((card, index) => (
            <Card
              key={index}
              className="text-zinc-800 dark:text-zinc-200 bg-zinc-100/50 dark:bg-zinc-900/50 backdrop-blur-md shadow-xl"
              shadow="none"
            >
              <CardHeader className="font-bold gap-3">
                <span className="flex items-center justify-center bg-primary rounded-full h-8 w-8 shrink-0 text-black">
                  <card.icon size={20} />
                </span>
                {card.title}
              </CardHeader>
              <CardBody className="text-sm">{card.body}</CardBody>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-10 py-5 px-3 md:px-10">
        <h2 className="text-center text-6xl my-10 font-bold">
          Тариф <span className="text-primary">Под любые потребности</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <PricingCard
            title="Стандартный"
            subtitle="Для новчиков"
            price="0"
            description="Бесплатно навсегда, без обязательств"
            buttonText="Начать"
            buttonLink="/dashboard"
            features={[
              {
                icon: <IconJumpRope size={18} />,
                text: "Неограниченные возможности",
              },
              {
                icon: <IconStretching size={18} />,
                text: "Доступ ко всем нашим 900 с лишним упражнениям",
              },
              {
                icon: <IconActivity size={18} />,
                text: "Неограниченное количество базовых журналов тренировок",
              },
              { icon: <IconChartBar size={18} />, text: "Базовая статистика" },
              { icon: <IconUser size={18} />, text: "Базовый профиль" },
            ]}
          />

          <PricingCard
            title="Про (Ежемесячный)"
            subtitle="Ежемесячно, отмена в любое время."
            price="14.99 BYN"
            description="Ежемесячно, отмена в любое время."
            buttonText="Скоро"
            buttonDisabled={true}
            buttonLink="/dashboard"
            highlight={true}
            features={[
              {
                icon: <IconJumpRope size={18} />,
                text: "Неограниченные возможности",
              },
              {
                icon: <IconStretching size={18} />,
                text: "Доступ ко всем нашим 900 с лишним упражнениям",
              },
              {
                icon: <IconActivity size={18} />,
                text: "Неограниченное количество расширенных журналов тренировок",
              },
              {
                icon: <IconChartBar size={18} />,
                text: "Продвинутая статистика",
              },
              { icon: <IconUser size={18} />, text: "Продвинутый профиль" },
            ]}
          />

          <PricingCard
            title="Про (на год)"
            subtitle="Один платеж по выгодной цене"
            price="149.99BYN"
            description="Один платеж по выгодной цене"
            buttonText="Скоро"
            buttonLink="/dashboard"
            buttonDisabled={true}
            features={[
              {
                icon: <IconJumpRope size={18} />,
                text: "Неограниченные возможности",
              },
              {
                icon: <IconStretching size={18} />,
                text: "Доступ ко всем нашим 900 с лишним упражнениям",
              },
              {
                icon: <IconActivity size={18} />,
                text: "Неограниченное количество расширенных журналов тренировок",
              },
              {
                icon: <IconChartBar size={18} />,
                text: "Продвинутая статистика",
              },
              { icon: <IconUser size={18} />, text: "Продвинутый профиль" },
            ]}
          />
        </div>
      </section>
    </main>
  );
}
