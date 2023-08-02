import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {IngredientIcons} from '@/components/shared/food/ingredientIcons';
import {MealLinkProps} from '@/components/shared/meal/type';
import {imageIconSizes} from '@/styles/image';
import {getMealRequiredQuantity} from '@/utils/game/meal';
import {formatInt} from '@/utils/number';


const MealLinkDetailChangeable = ({meal, displayType}: MealLinkProps) => {
  const t = useTranslations('UI.InPage.Cooking');

  if (displayType === 'ingredient') {
    return <IngredientIcons meal={meal}/>;
  }

  if (displayType === 'energyRange') {
    const sortedLevels = meal.levels.sort((a, b) => a.lv - b.lv);
    return (
      <Flex direction="row" noFullWidth className="gap-0.5">
        <div className="relative h-4 w-4">
          <NextImage src="/images/generic/energy.png" alt={t('Energy')} sizes={imageIconSizes}/>
        </div>
        <div>{formatInt(sortedLevels.at(0)?.energy)}</div>
        <div>~</div>
        <div>{formatInt(sortedLevels.at(-1)?.energy)}</div>
      </Flex>
    );
  }

  return <></>;
};

export const MealLinkDetail = (props: MealLinkProps) => {
  const {meal} = props;

  return (
    <Flex direction="row" className="items-end gap-0.5 text-xs">
      <Flex direction="row" noFullWidth center className="info-in-image text-shadow-preset h-6 w-6">
        {getMealRequiredQuantity(meal)}
      </Flex>
      <MealLinkDetailChangeable {...props}/>
    </Flex>
  );
};
