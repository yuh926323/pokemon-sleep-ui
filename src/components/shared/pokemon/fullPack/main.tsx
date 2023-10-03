import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {PokemonDataIcon} from '@/components/shared/pokemon/dataIcon';
import {PokemonPackStatsCommonProps} from '@/components/shared/pokemon/type';
import {getPackStatsStyle} from '@/components/shared/pokemon/utils';
import {formatSeconds} from '@/utils/time';


type Props = PokemonPackStatsCommonProps & {
  timeToFullPack: number,
};

export const PokemonTimeToFullPack = ({timeToFullPack, ...props}: Props) => {
  const {normalText} = props;
  const t = useTranslations('UI.InPage.Pokedex');

  return (
    <Flex direction="row" noFullWidth className={getPackStatsStyle(props)}>
      <PokemonDataIcon
        src="/images/generic/bag.png"
        alt={t('Stats.TimeToFullPack')}
        dimension={normalText ? 'h-6 w-6' : 'h-4 w-4'}
        invert
      />
      <div>{formatSeconds(timeToFullPack)}</div>
    </Flex>
  );
};
