import React from 'react';

import {useTranslations} from 'next-intl';
import Link from 'next-intl/link';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {I18nProvider} from '@/contexts/i18n';
import {mealTypeTextStyle} from '@/styles/classes';
import {imageIconSizes, imagePortraitSizes} from '@/styles/image';
import {MealExp} from '@/ui/meal/page/exp';
import {MealMetaProps} from '@/ui/meal/page/type';
import {classNames} from '@/utils/react';


export const MealMeta = (props: MealMetaProps) => {
  const t = useTranslations('Game.Food');
  const {meal} = props;
  const {id, type} = meal;

  const mealName = t(id.toString());

  return (
    <Flex direction="col" center className="info-section md:flex-row md:gap-4 lg:m-auto lg:w-2/3">
      <Flex direction="col" center noFullWidth className="gap-2">
        <div className={classNames('text-lg', mealTypeTextStyle[type])}>
          {mealName}
        </div>
        <div className="relative h-44 w-44 rounded-lg border border-slate-300 dark:border-slate-700">
          <NextImage src={`/images/meal/portrait/${id}.png`} alt={mealName} sizes={imagePortraitSizes}/>
        </div>
      </Flex>
      <Flex direction="col" className="gap-2">
        <I18nProvider namespaces={['UI.InPage.Cooking']}>
          <MealExp {...props}/>
        </I18nProvider>
        <Flex direction="row" center className="gap-1.5">
          {meal.ingredients.map(({id, quantity}) => (
            <Link key={id} href={`/ingredient/${id}`} className="button-clickable-bg p-1.5">
              <Flex direction="col" center>
                <div className="relative h-12 w-12">
                  <NextImage src={`/images/ingredient/${id}.png`} alt={t(id.toString())} sizes={imageIconSizes}/>
                </div>
                <div>
                  {quantity}
                </div>
              </Flex>
            </Link>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};
