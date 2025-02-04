import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericIconLarger} from '@/components/shared/icon/common/larger';
import {GenericPokeballIcon} from '@/components/shared/icon/pokeball';
import {usePokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/hook';
import {PokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/main';
import {PokemonInfo} from '@/types/game/pokemon';
import {PokeInBoxViewUnitProps} from '@/ui/team/pokebox/content/pokeInBox/type';
import {getDefaultRatingBasis} from '@/utils/game/rating/utils';


type Props = PokeInBoxViewUnitProps & {
  pokemon: PokemonInfo,
  pokemonName: string,
};

export const PokeInBoxGridPopUps = ({pokemon, pokemonName, ...props}: Props) => {
  const {
    pokeInBox,
    snorlaxFavorite,
    calculatedSettings,
    setRatingPopupControl,
  } = props;

  const t = useTranslations('UI.Metadata');

  const {state, setState, showPokemon} = usePokemonLinkPopup();

  return (
    <Flex direction="row" noFullWidth className="absolute right-1 top-1 z-20 gap-1">
      <PokemonLinkPopup state={state} setState={setState}/>
      <button className="button-clickable group h-6 w-6 rounded-full" onClick={() => showPokemon(pokemon)}>
        <GenericPokeballIcon alt={t('Pokedex.Page.Title', {name: pokemonName})} noWrap/>
      </button>
      <button className="button-clickable group relative h-6 w-6" onClick={() => setRatingPopupControl({
        ...pokeInBox,
        ...calculatedSettings,
        pokemon,
        snorlaxFavorite,
        basis: getDefaultRatingBasis(pokemon.specialty),
      })}>
        <GenericIconLarger src="/images/generic/search.png" alt={t('Rating.Title')}/>
      </button>
    </Flex>
  );
};
