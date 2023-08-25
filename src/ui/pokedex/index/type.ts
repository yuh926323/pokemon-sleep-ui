import {Session} from 'next-auth';

import {PokemonInputFilterExtended, UsePokemonFilterCommonData} from '@/components/shared/pokemon/input/type';
import {PokemonSortType} from '@/components/shared/pokemon/sorter/type';
import {BerryDataMap} from '@/types/game/berry';
import {IngredientMap} from '@/types/game/ingredient';
import {FieldMetaMap} from '@/types/game/mapMeta';
import {PokemonInfo} from '@/types/game/pokemon';
import {IngredientProduction} from '@/types/game/pokemon/ingredient';
import {SleepStyleData} from '@/types/game/sleepStyle';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {PokedexDisplayType} from '@/ui/pokedex/index/input/type';


export type PokemonInfoForPokedex = PokemonInfo & {
  sleepStyles: SleepStyleData[],
  nameOfAllLocale: string[],
};

export type PokedexData = PokemonInfoForPokedex[];

export type PokedexDisplay = {
  display: PokedexDisplayType,
  sort: PokemonSortType,
};

export type PokedexFilter = PokemonInputFilterExtended & PokedexDisplay & {
  name: string,
};

export type PokedexClientCommonProps = UsePokemonFilterCommonData & {
  pokedex: PokedexData,
  maxLevel: number,
  ingredientMap: IngredientMap,
  berryMap: BerryDataMap,
  mapMeta: FieldMetaMap,
  session: Session | null,
};

export type PokedexLinkProps = Pick<PokedexFilter, 'display' | 'level'> & PokedexClientCommonProps & {
  pokemon: PokemonInfo,
  snorlaxFavorite: SnorlaxFavorite,
  ingredients: IngredientProduction[],
};
