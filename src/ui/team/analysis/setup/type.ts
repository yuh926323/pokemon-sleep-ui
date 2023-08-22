import {BerryId} from '@/types/game/berry';
import {IngredientId} from '@/types/game/ingredient';
import {ProducingRate, ProducingRateOfItem} from '@/types/game/producing/rate';
import {TeamAnalysisSlotName} from '@/ui/team/analysis/type';


export type IngredientProducingStats = {
  quantity: ProducingRate,
  energy: ProducingRate,
};

export type TeamProducingStatsByItem<T> = {
  berry: T,
  ingredient: T | null,
};

export type TeamProducingStatsTotal = TeamProducingStatsByItem<ProducingRate>;

export type TeamProducingStatsSingle = TeamProducingStatsByItem<ProducingRateOfItem>;

export type TeamProducingStatsBySlot = {[slot in TeamAnalysisSlotName]: TeamProducingStatsSingle | null};

export type TeamProducingStatsGrouped = {
  berry: {[id in BerryId]?: ProducingRate},
  ingredient: {[id in IngredientId]?: ProducingRate},
};

export type TeamProducingStats = {
  bySlot: TeamProducingStatsBySlot,
  total: TeamProducingStatsTotal,
  grouped: TeamProducingStatsGrouped,
  overall: ProducingRate,
};

export type TeamFinalEstimateInput = {
  endsAt: string,
  currentEnergy: number,
};
