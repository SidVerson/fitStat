import { supportData } from "./supportData";
import PageHeading from "@/components/PageHeading/PageHeading";
import { Card, CardBody, CardHeader } from "@nextui-org/card";

function CustomCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card shadow="none" className="shadow-md">
      <CardHeader className="text-xl pb-0">{title}</CardHeader>
      <CardBody className="text-zinc-600 dark:text-zinc-400 text-sm">
        {children}
      </CardBody>
    </Card>
  );
}

function CustomGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">{children}</div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <h1 className="text-2xl mb-3 font-bold">{title}</h1>;
}

function SectionSubtitle({ title }: { title: string }) {
  return (
    <h2 className="text-zinc-600 dark:text-zinc-400 mb-3 text-sm">{title}</h2>
  );
}

export default function Support() {
  return (
    <>
      <PageHeading title="Техническая поддержка" />
      <p className="dark:text-zinc-400 text-zinc-600 mb-5">
        Мы здесь, чтобы помочь! Ниже вы найдете ответы на распространенные
        вопросы о FitStat ниже. Если вы не можете найти то, что ищете, вы
        можете обратиться в нашу службу поддержки.
      </p>

      {supportData.map((section, index) => (
        <div key={index}>
          <SectionTitle title={section.title} />
          <SectionSubtitle title={section.subtitle} />
          <CustomGrid>
            {section.cards.map((card, cardIndex) => (
              <CustomCard key={cardIndex} title={card.title}>
                {card.content}
              </CustomCard>
            ))}
          </CustomGrid>
        </div>
      ))}
    </>
  );
}
