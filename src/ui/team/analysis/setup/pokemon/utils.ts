import {v4} from 'uuid';

import {PokeInBox} from '@/types/game/pokebox';
import {PokemonInfo, PokemonSpecialtyId} from '@/types/game/pokemon';
import {RatingSetupData} from '@/types/game/pokemon/rating';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {TeamAnalysisMember} from '@/types/teamAnalysis';
import {CalculatedUserSettings} from '@/types/userData/settings';
import {getDefaultRatingBasis} from '@/utils/game/rating/utils';


type ToRatingRequestOpts = CalculatedUserSettings & {
  member: TeamAnalysisMember,
  pokemon: PokemonInfo,
  snorlaxFavorite: SnorlaxFavorite,
  specialtyId: PokemonSpecialtyId | null,
};

export const toRatingSetup = ({member, specialtyId, ...opts}: ToRatingRequestOpts): RatingSetupData => ({
  ...member,
  ...opts,
  basis: getDefaultRatingBasis(specialtyId),
});

export const toPokeInBox = ({pokemonId, name, ...member}: TeamAnalysisMember): PokeInBox => {
  return {
    ...member,
    uuid: v4(),
    dateAdded: Date.now(),
    name: name ?? null,
    pokemon: pokemonId,
  };
};
