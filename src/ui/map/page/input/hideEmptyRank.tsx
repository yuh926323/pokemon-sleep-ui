import React from 'react';

import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import EyeSlashIcon from '@heroicons/react/24/solid/EyeSlashIcon';
import {clsx} from 'clsx';

import {FilterInputProps} from '@/components/input/filter/type';
import {getTextFilterButtonClass} from '@/components/input/filter/utils/props';
import {ToggleButton} from '@/components/input/toggleButton';
import {Flex} from '@/components/layout/flex';
import {UnavailableIcon} from '@/components/shared/common/unavailable';
import {MapPageFilter} from '@/ui/map/page/type';


export const MapInputEmptyRankToggle = ({filter, setFilter}: FilterInputProps<MapPageFilter>) => {
  const {showEmptyRank} = filter;

  return (
    <ToggleButton
      id="showEmptyRank"
      active={showEmptyRank}
      onClick={() => setFilter((original) => ({
        ...original,
        showEmptyRank: !original.showEmptyRank,
      } satisfies MapPageFilter))}
      className={clsx('group', getTextFilterButtonClass(showEmptyRank))}
    >
      <Flex direction="row" center noFullWidth className="gap-1">
        <div className="h-5 w-5">
          {showEmptyRank ? <EyeIcon/> : <EyeSlashIcon/>}
        </div>
        <UnavailableIcon dimension="h-7 w-7"/>
      </Flex>
    </ToggleButton>
  );
};
