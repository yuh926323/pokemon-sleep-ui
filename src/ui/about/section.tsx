import React from 'react';

import {Flex} from '@/components/layout/flex/common';


type Props = {
  title: string,
};

export const AboutSection = ({title, children}: React.PropsWithChildren<Props>) => {
  return (
    <Flex className="gap-1">
      <div className="text-slate-500">
        {title}
      </div>
      <div className="text-lg">
        {children}
      </div>
    </Flex>
  );
};
