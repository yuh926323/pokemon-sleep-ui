import React from 'react';

import Bars3BottomLeftIcon from '@heroicons/react/24/solid/Bars3BottomLeftIcon';
import {useTranslations} from 'next-intl';

import {FilterTextInput} from '@/components/input/filter/text';
import {Flex} from '@/components/layout/flex/common';
import {sortTypeToI18nId} from '@/components/shared/pokemon/sorter/const';
import {PokemonSortType, pokemonSortType} from '@/components/shared/pokemon/sorter/type';


type Props = {
  sort: PokemonSortType,
  updateSort: (sort: PokemonSortType) => void,
  exclude?: PokemonSortType[],
};

export const PokemonSortingPicker = ({sort, updateSort, exclude}: Props) => {
  const t = useTranslations('UI.InPage.Pokedex');

  return (
    <FilterTextInput
      onClick={(sort) => updateSort(sort)}
      isActive={(sortOfInput) => sortOfInput === sort}
      title={
        <Flex center>
          <Bars3BottomLeftIcon className="h-6 w-6"/>
        </Flex>
      }
      ids={[...pokemonSortType].filter((sortType) => !exclude?.includes(sortType))}
      idToButton={(sort) => t(sortTypeToI18nId[sort])}
      idToItemId={(sort) => `sortType-${sort}`}
    />
  );
};
