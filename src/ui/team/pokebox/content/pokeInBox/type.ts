import React from 'react';

import {PokemonInfoWithSortingPayload, SortedPokemonInfo} from '@/components/shared/pokemon/sorter/type';
import {PokeInBox} from '@/types/game/pokebox';
import {PokedexMap, PokemonInfo} from '@/types/game/pokemon';
import {RatingResultOfLevel, RatingSetupData} from '@/types/game/pokemon/rating';
import {CalculatedUserSettings} from '@/types/userData/settings';
import {PokeInBoxChangeableProps} from '@/ui/team/pokebox/content/type';
import {PokeInBoxEditorState} from '@/ui/team/pokebox/editor/type';
import {PokeboxCommonProps} from '@/ui/team/pokebox/type';
import {PokeboxViewerDisplay, PokeboxViewerFilter} from '@/ui/team/pokebox/viewer/type';


export type PokeInBoxRefreshDependency = {
  filter: PokeboxViewerFilter,
  sortedPokeInBox: SortedPokemonInfo<PokeInBox, PokemonInfoWithSortingPayload<PokeInBox>>[],
};

export type PokeInBoxPopupProps = {
  showPokemon: (pokemon: PokemonInfo) => void,
  setRatingPopupControl: (setupData: RatingSetupData) => void,
};

export type PokeInBoxViewCommonProps = PokeboxCommonProps & PokeInBoxPopupProps & PokeInBoxRefreshDependency & {
  calculatedSettings: CalculatedUserSettings,
  setEditingPokeInBox: React.Dispatch<React.SetStateAction<PokeInBoxEditorState | undefined>>,
  isLevelPreview: boolean,
};

export type PokeInBoxViewOfTypeProps = PokeInBoxViewCommonProps;

export type PokeInBoxViewUnitProps = PokeboxCommonProps & PokeInBoxPopupProps & PokeInBoxChangeableProps & {
  pokeInBox: PokeInBox,
  pokedexMap: PokedexMap,
  display: PokeboxViewerDisplay,
  onClick: () => void,
  isLevelPreview: boolean,
};

export type UseCalculatePokeInBoxRatingReturn = {
  loading: boolean,
  result: RatingResultOfLevel,
};
