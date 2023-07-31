import React from 'react';

import Image from 'next/image';
import {useTranslations} from 'next-intl';
import Link from 'next-intl/link';

import {Flex} from '@/components/layout/flex';
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
    <Flex direction="col" center className="info-section-md-fit">
      <div className={classNames('text-lg', mealTypeTextStyle[type])}>
        {mealName}
      </div>
      <div className="relative h-44 w-44 rounded-lg border border-slate-300 dark:border-slate-700">
        <Image src={`/images/meal/portrait/${id}.png`} alt={mealName} fill sizes={imagePortraitSizes}/>
      </div>
      <I18nProvider namespaces={['UI.InPage.Cooking']}>
        <MealExp {...props}/>
      </I18nProvider>
      <Flex direction="row" center className="gap-1.5">
        {meal.ingredients.map(({id, quantity}) => (
          <Link key={id} href={`/ingredient/${id}`} className="button-clickable-bg p-1.5">
            <Flex direction="col" center>
              <div className="relative h-12 w-12">
                <Image src={`/images/ingredient/${id}.png`} alt={t(id.toString())} fill sizes={imageIconSizes}/>
              </div>
              <div>
                {quantity}
              </div>
            </Flex>
          </Link>
        ))}
      </Flex>
    </Flex>
  );
};
