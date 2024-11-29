interface UserMeasurements {
  weight?: number | null;
  height?: number | null;
  age?: number | null;
}

export default function ProfileStats({
  userMeasurements,
}: {
  userMeasurements: UserMeasurements;
}) {
  return (
    <div className="grid grid-flow-col lg:px-40 mb-3">
      {userMeasurements.weight && (
        <div className="text-center">
          <div className="mb-1 space-x-1">
            <span className="text-5xl">{userMeasurements.weight}</span>
            <span className="text-zinc-500">кг</span>
          </div>
          <div className="text-sm text-zinc-500">Вес</div>
        </div>
      )}

      {userMeasurements.height && (
        <div className="text-center">
          <div className="mb-1 space-x-1">
            <span className="text-5xl">{userMeasurements.height}</span>
            <span className="text-zinc-500">см</span>
          </div>
          <div className="text-sm text-zinc-500">Рост</div>
        </div>
      )}

      {userMeasurements.age && (
        <div className="text-center">
          <div className="mb-1 space-x-1">
            <span className="text-5xl">{userMeasurements.age}</span>
            <span className="text-zinc-500">лет</span>
          </div>
          <div className="text-sm text-zinc-500">Возраст</div>
        </div>
      )}
    </div>
  );
}
