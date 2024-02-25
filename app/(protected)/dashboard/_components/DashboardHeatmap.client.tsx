'use client'
import { subMonths } from 'date-fns';
import { Card, CardBody } from '@nextui-org/react';
import HeatMap from '@uiw/react-heat-map';

type HeatmapValue = {
  date: string;
  count: number;
};

type DashboardHeatmapClientProps = {
  values: HeatmapValue[];
};

export default function DashboardHeatmapClient({ values }: DashboardHeatmapClientProps) {
  //console.log(values);
  const startDate = subMonths(new Date(), 12);
  const endDate = new Date();

  return (
    <Card className='mb-3'>
      <CardBody>
        <div className='flex items-end justify-end overflow-x-scroll relative h-40 no-scrollbar'>
          <div className='absolute right-0 top-0 bottom-0'>
          <HeatMap
              value={values}
              //weekLabels={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
              weekLabels={false}
              startDate={startDate}
              legendCellSize={0}
              endDate={endDate}
              rectSize={20}
              width={1200}
              style={{ color: '#71717a', '--rhm-rect-active': '#A6FF00' } as React.CSSProperties}
              panelColors={{
                0: '#27272a',
                1: '#D4FF66',
                2: '#C3FF3F',
                3: '#A6FF00',
              }}
            />
            </div>
        </div>
      </CardBody>
    </Card>
  );
}
