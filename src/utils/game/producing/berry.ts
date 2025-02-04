import {defaultLevel} from '@/const/game/production';
import {BerryData} from '@/types/game/berry';
import {GroupedSubSkillBonus} from '@/types/game/pokemon/subSkill';
import {ProducingRateCommonParams, ProducingRateOfItemOfSessions} from '@/types/game/producing/rate';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {toSum} from '@/utils/array';
import {applyBonus} from '@/utils/game/producing/apply';
import {getProducingRateBase} from '@/utils/game/producing/rate';
import {getSubSkillBonusValue} from '@/utils/game/subSkill/effect';


export type GetBerryProducingRateOpts = ProducingRateCommonParams & {
  subSkillBonus: GroupedSubSkillBonus | null,
  snorlaxFavorite: SnorlaxFavorite,
  berryData: BerryData,
};

export const getBerryProducingRate = ({
  level,
  pokemon,
  frequency,
  bonus,
  subSkillBonus,
  snorlaxFavorite,
  berryData,
}: GetBerryProducingRateOpts): ProducingRateOfItemOfSessions => {
  const isSnorlaxFavorite = snorlaxFavorite[berryData.id] ?? false;
  const data = {
    id: pokemon.berry.id,
    frequency,
    ...getProducingRateBase({
      frequency,
      // Specialty handling is already included in `pokemon.berry.quantity`
      count: pokemon.berry.quantity + toSum(getSubSkillBonusValue(subSkillBonus, 'berryCount')),
      picks: 1,
      energyPerCount: (berryData.energy[(level ?? defaultLevel) - 1]?.energy ?? NaN) * (isSnorlaxFavorite ? 2 : 1),
    }),
  };

  return {
    id: pokemon.berry.id,
    sleep: applyBonus({
      bonus,
      produceType: 'berry',
      producingState: 'sleep',
      data,
    }),
    awake: applyBonus({
      bonus,
      produceType: 'berry',
      producingState: 'awake',
      data,
    }),
  };
};
