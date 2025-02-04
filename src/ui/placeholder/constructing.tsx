import React from 'react';

import WrenchIcon from '@heroicons/react/24/solid/WrenchIcon';

import {Flex} from '@/components/layout/flex/common';


export const Constructing = () => {
  return (
    <Flex center className="h-full">
      <div className="h-72 w-72">
        <WrenchIcon/>
      </div>
    </Flex>
  );
};
