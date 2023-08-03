import React from 'react';

import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';

import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredientIcon';
import {ProductionRate} from '@/types/game/pokemon';
import {IngredientId} from '@/types/mongo/ingredient';
import {TeamAnalysisRateLayoutWithQuantity} from '@/ui/team/analysis/result/common/rateLayoutWithQuantity';
import {TeamAnalysisRateLayoutCommonProps} from '@/ui/team/analysis/result/common/type';


type Props = TeamAnalysisRateLayoutCommonProps & {
  id: IngredientId | undefined,
  rate: ProductionRate | null,
};

export const TeamAnalysisIngredientRate = ({id, rate, highlight}: Props) => {
  if (!id || !rate) {
    return (
      <TeamAnalysisRateLayoutWithQuantity rate={null} icon={<XCircleIcon/>}/>
    );
  }

  return (
    <TeamAnalysisRateLayoutWithQuantity highlight={highlight} rate={rate} icon={
      <PokemonIngredientIcon id={id} dimension="h-8 w-8"/>
    }/>
  );
};
