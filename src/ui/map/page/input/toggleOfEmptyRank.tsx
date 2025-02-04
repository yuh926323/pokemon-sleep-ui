import React from 'react';

import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import EyeSlashIcon from '@heroicons/react/24/solid/EyeSlashIcon';
import {clsx} from 'clsx';

import {getTextFilterButtonClass} from '@/components/input/filter/utils/props';
import {ToggleButton} from '@/components/input/toggleButton';
import {Flex} from '@/components/layout/flex/common';
import {UnavailableIcon} from '@/components/shared/common/unavailable';
import {MapInputCommonProps} from '@/ui/map/page/input/type';
import {MapPageFilter} from '@/ui/map/page/type';


export const MapInputEmptyRankToggle = ({filter, setFilter}: MapInputCommonProps) => {
  const {showEmptyRank} = filter;

  return (
    <ToggleButton
      id="toggleEmptyRank"
      active={showEmptyRank}
      onClick={() => setFilter((original) => ({
        ...original,
        showEmptyRank: !original.showEmptyRank,
      } satisfies MapPageFilter))}
      className={clsx('group', getTextFilterButtonClass(showEmptyRank))}
    >
      <Flex direction="row" center noFullWidth>
        <div className="h-5 w-5">
          {showEmptyRank ? <EyeIcon/> : <EyeSlashIcon/>}
        </div>
        <UnavailableIcon dimension="h-7 w-7"/>
      </Flex>
    </ToggleButton>
  );
};
