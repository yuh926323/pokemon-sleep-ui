import React from 'react';

import InboxArrowDownIcon from '@heroicons/react/24/outline/InboxArrowDownIcon';
import {useTranslations} from 'next-intl';

import {FilterInclusionMap} from '@/components/input/filter/type';
import {Collapsible} from '@/components/layout/collapsible/main';
import {CollapsibleState} from '@/components/layout/collapsible/type';
import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {GenericPokeballIcon} from '@/components/shared/icon/pokeball';
import {PokemonClickableIcons} from '@/components/shared/pokemon/icon/clickable/main';
import {imageIconSizes} from '@/styles/image';
import {PokemonId, PokemonInfo} from '@/types/game/pokemon';
import {showToast} from '@/utils/toast';


type Props = {
  pokemonList: PokemonInfo[],
  onPokemonPicked: (pokemon: PokemonInfo) => void,
  collapsibleState: CollapsibleState,
  isIncluded: FilterInclusionMap<PokemonId>,
  classNameForHeight?: string,
};

export const PokemonCollapsiblePicker = ({
  pokemonList,
  onPokemonPicked,
  collapsibleState,
  isIncluded,
  classNameForHeight,
}: Props) => {
  const t = useTranslations('Game');

  return (
    <Collapsible state={collapsibleState} classNameForHeight={classNameForHeight ?? 'h-80'} appear button={
      <Flex direction="row" center className="group gap-0.5">
        <GenericPokeballIcon alt="Pokemon" dimension="h-6 w-6"/>
        <div className="h-6 w-6">
          <InboxArrowDownIcon/>
        </div>
      </Flex>
    }>
      <PokemonClickableIcons pokemonList={pokemonList.filter(({id}) => isIncluded[id])} onClick={(pokemon) => {
        const {id} = pokemon;

        showToast({content: (
          <Flex direction="row" className="gap-1.5">
            <div className="relative h-9 w-9">
              <InboxArrowDownIcon/>
            </div>
            <div className="relative h-9 w-9">
              <NextImage
                src={`/images/pokemon/icons/${id}.png`} alt={t(`PokemonName.${id}`)}
                sizes={imageIconSizes}
              />
            </div>
            <div className="self-end text-sm">
                #{id}
            </div>
          </Flex>
        )});
        onPokemonPicked(pokemon);
      }}/>
    </Collapsible>
  );
};
