import React from 'react';

import ChevronDoubleUpIcon from '@heroicons/react/24/solid/ChevronDoubleUpIcon';

import {BonusSlider} from '@/components/shared/production/bonus/base';
import {BonusSliderProps} from '@/components/shared/production/bonus/type';


export const OverallBonusSlider = (props: BonusSliderProps) => {
  return (
    <BonusSlider id="ingredient-bonus" min={0} max={200} {...props}>
      <div className="h-6 w-6">
        <ChevronDoubleUpIcon/>
      </div>
    </BonusSlider>
  );
};
