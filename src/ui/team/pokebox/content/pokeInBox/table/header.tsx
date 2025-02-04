import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {IconWithInfo} from '@/components/shared/common/image/iconWithInfo';
import {NextImage} from '@/components/shared/common/image/main';
import {GenericIconLarger} from '@/components/shared/icon/common/larger';
import {GenericPokeballIcon} from '@/components/shared/icon/pokeball';
import {imageIconSizes, imageSmallIconSizes} from '@/styles/image';
import {PokemonInfo} from '@/types/game/pokemon';
import {PokeInBoxViewUnitProps} from '@/ui/team/pokebox/content/pokeInBox/type';
import {getDefaultRatingBasis} from '@/utils/game/rating/utils';


type Props = PokeInBoxViewUnitProps & {
  pokemon: PokemonInfo,
};

export const PokeInBoxTableRowHeader = ({pokemon, showPokemon, setRatingPopupControl, ...props}: Props) => {
  const {pokeInBox, snorlaxFavorite, calculatedSettings} = props;

  const t = useTranslations('Game');
  const t2 = useTranslations('UI.Metadata');
  const t3 = useTranslations('UI.Common');

  const pokemonId = pokemon.id;
  const pokemonName = t(`PokemonName.${pokemonId}`);

  return (
    <Flex direction="row" center noFullWidth className={clsx(
      'sticky left-0 z-10 rounded-lg p-1 shadow shadow-slate-300 dark:shadow-black',
      pokeInBox.isShiny ? 'info-highlight info-section-opaque' : 'bg-slate-300 dark:bg-slate-800',
    )}>
      <button className="button-clickable group relative h-6 w-6" onClick={() => showPokemon(pokemon)}>
        <GenericPokeballIcon alt={t2('Pokedex.Page.Title', {name: pokemonName})} noWrap/>
      </button>
      <IconWithInfo
        imageSrc={`/images/pokemon/icons/${pokemonId}.png`}
        imageAlt={pokemonName}
        imageDimension="h-10 w-10"
        imageSizes={imageIconSizes}
        info={
          pokeInBox.isShiny &&
          <div className="relative h-4 w-4">
            <NextImage
              src="/images/generic/flash.png" alt={t3('Shiny')}
              sizes={imageSmallIconSizes} className="invert-on-light"
            />
          </div>
        }
      />
      <button className="button-clickable group relative h-6 w-6" onClick={() => setRatingPopupControl({
        ...pokeInBox,
        ...calculatedSettings,
        pokemon,
        snorlaxFavorite,
        basis: getDefaultRatingBasis(pokemon.specialty),
      })}>
        <GenericIconLarger src="/images/generic/search.png" alt={t2('Rating.Title')}/>
      </button>
    </Flex>
  );
};
