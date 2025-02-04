import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {NextImage} from '@/components/shared/common/image/main';
import {PokemonSleepTypeCommonProps} from '@/components/shared/pokemon/sleepType/type';
import {getSleepTypeBgClass} from '@/styles/game/sleepType';
import {imageSmallIconSizes} from '@/styles/image';


type Props = PokemonSleepTypeCommonProps & {
  className?: string,
};

export const PokemonSleepTypeIcon = ({sleepType, dimension, active, className}: Props) => {
  const t = useTranslations('Game.SleepType');

  return (
    <div className={clsx('rounded-full p-0.5', getSleepTypeBgClass(sleepType, active ?? false))}>
      <div className={clsx('relative', dimension ?? 'h-5 w-5')}>
        <NextImage
          src={`/images/sleepType/${sleepType}.png`} alt={t(sleepType.toString())}
          sizes={imageSmallIconSizes} className={clsx(className, active ? 'invert-on-light' : 'invert-on-dark')}
        />
      </div>
    </div>
  );
};
