import {PokemonId} from '@/types/game/pokemon';
import {ActivationPropertiesAtClient} from '@/types/mongo/activation';


export type UserDataLoadingOpts = {
  type: 'teamAnalysis',
  opts?: never,
} | {
  type: 'teamAnalysisMember',
  opts: {
    teamMemberId: string,
  },
} | {
  type: 'pokebox',
  opts?: never,
} | {
  type: 'pokeboxSingle',
  opts: {
    pokeInBoxUuid: string,
  },
} | {
  type: 'pokeboxSorted',
  opts?: never,
} | {
  type: 'sleepdex',
  opts?: never,
} | {
  type: 'sleepdexOfPokemon',
  opts: {
    pokemonId: PokemonId,
  },
} | {
  type: 'adminActivationCreate',
  opts: ActivationPropertiesAtClient,
} | {
  type: 'adminActivationCheck',
  opts: {
    key: string,
  },
};
