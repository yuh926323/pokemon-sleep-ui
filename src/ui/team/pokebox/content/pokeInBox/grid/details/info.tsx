import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
import {PokemonIngredientRate} from '@/components/shared/pokemon/production/ingredientRate';
import {PokemonSleepTypeIcon} from '@/components/shared/pokemon/sleepType/icon';
import {specialtyIdMap} from '@/const/game/pokemon';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';
import {getPokemonProducingParams} from '@/utils/game/producing/pokemon';


export const PokeInBoxGridInfo = ({pokemon, pokemonProducingParamsMap, pokeInBox}: PokeInBoxCommonProps) => {
  const {ingredients} = pokeInBox;
  const {id, specialty, sleepType, berry} = pokemon;

  const pokemonProducingParams = getPokemonProducingParams({
    pokemonId: id,
    pokemonProducingParamsMap,
  });

  return (
    <Flex direction="row" noFullWidth className="items-center gap-1.5">
      <div>
        <PokemonSleepTypeIcon sleepType={sleepType} dimension="h-7 w-7" className="invert-hoverable-dark"/>
      </div>
      <Flex noFullWidth className="gap-1">
        <Flex direction="row" noFullWidth className="items-center gap-1">
          <Flex direction="row" noFullWidth className={clsx(
            'items-center gap-1 px-1.5',
            specialty === specialtyIdMap.berry && 'info-highlight',
          )}>
            <PokemonBerryIcon id={berry.id}/>
            <div>{berry.quantity}</div>
          </Flex>
          <div className={clsx('px-2', specialty === specialtyIdMap.ingredient && 'info-highlight')}>
            <PokemonIngredientIcons ingredients={[Object.values(ingredients)]} noLink/>
          </div>
        </Flex>
        <div className="px-1">
          <PokemonIngredientRate split={pokemonProducingParams.ingredientSplit}/>
        </div>
      </Flex>
    </Flex>
  );
};
