import React from 'react';

import {clsx} from 'clsx';

import {LoadingText} from '@/components/icons/loading';
import {Flex} from '@/components/layout/flex/common';
import {ProgressBar} from '@/components/progressBar';
import {ratingMarkThresholdByPr} from '@/components/shared/pokemon/rating/const';
import {classOfMarkStyle} from '@/styles/text/mark/style';
import {getMarkByThreshold} from '@/styles/text/mark/utils';
import {UseCalculatePokeInBoxRatingReturn} from '@/ui/team/pokebox/content/pokeInBox/type';
import {formatFloat, formatInt} from '@/utils/number';


type Props = UseCalculatePokeInBoxRatingReturn;

export const PokeInBoxRatingStats = ({loading, result}: Props) => {
  const {percentage, percentile} = result;
  const textMarkStyle = getMarkByThreshold(percentile, ratingMarkThresholdByPr);

  return (
    <Flex direction="row" className={clsx('gap-1.5', textMarkStyle && classOfMarkStyle[textMarkStyle])}>
      <Flex center className="gap-1">
        <div>
          {loading ?
            <LoadingText dimension="h-4 w-4" text="PR"/> :
            isNaN(percentile) ? '-' : `PR ${formatInt(percentile)}`}
        </div>
        <ProgressBar className="w-full" percent={percentile}/>
      </Flex>
      <Flex center className="gap-1">
        <div>
          {loading ?
            <LoadingText dimension="h-4 w-4" text="%"/> :
            isNaN(percentage) ? '-' : `${formatFloat(percentage)}%`}
        </div>
        <ProgressBar className="w-full" percent={percentage}/>
      </Flex>
    </Flex>
  );
};
