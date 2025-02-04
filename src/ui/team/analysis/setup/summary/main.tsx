import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericBerryIcon} from '@/components/shared/icon/berry';
import {GenericIngredientIcon} from '@/components/shared/icon/ingredient';
import {PokemonProductionSplit} from '@/components/shared/pokemon/production/split/main';
import {ProductionPeriod} from '@/types/game/producing/display';
import {TeamAnalysisRateLayout} from '@/ui/team/analysis/setup/common/rateLayout';
import {TeamAnalysisFinalEstimate} from '@/ui/team/analysis/setup/summary/finalEstimate';
import {TeamProducingStats} from '@/ui/team/analysis/setup/type';
import {TeamAnalysisDataProps} from '@/ui/team/analysis/type';


type Props = Pick<TeamAnalysisDataProps, 'snorlaxRankData'> & {
  stats: TeamProducingStats,
  period: ProductionPeriod,
};

export const TeamAnalysisSummary = ({snorlaxRankData, stats, period}: Props) => {
  const {berry, ingredient} = stats.total;

  const t = useTranslations('UI.InPage.Pokedex.Info');

  return (
    <Flex className="button-bg items-end justify-end gap-3 rounded-lg p-2 md:flex-row">
      <TeamAnalysisFinalEstimate energyRate={stats.overall} snorlaxRankData={snorlaxRankData}/>
      <Flex className="justify-end gap-1.5 md:w-fit">
        <Flex direction="row" noFullWidth wrap className="justify-end gap-x-4 gap-y-1.5">
          <TeamAnalysisRateLayout
            period={period} showQuantity={false} rate={berry}
            icon={<GenericBerryIcon alt={t('Berry')} noWrap/>}
          />
          <TeamAnalysisRateLayout
            period={period} showQuantity={false} rate={ingredient}
            icon={<GenericIngredientIcon alt={t('Ingredient')} noWrap/>}
          />
        </Flex>
        <PokemonProductionSplit
          specialty={null}
          berry={berry.energy}
          ingredient={ingredient?.energy ?? 0}
        />
        <Flex direction="row" noFullWidth className="justify-end">
          <TeamAnalysisRateLayout period={period} larger showQuantity={false} rate={stats.overall}/>
        </Flex>
      </Flex>
    </Flex>
  );
};
