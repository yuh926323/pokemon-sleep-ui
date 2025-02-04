import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {isFilterIncludingSome} from '@/components/input/filter/utils/check';
import {Flex} from '@/components/layout/flex/common';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {PokemonProductionSplitFromPokemonRate} from '@/components/shared/pokemon/production/split/fromPokemon';
import {specialtyIdMap} from '@/const/game/pokemon';
import {stateOfRateToShow} from '@/ui/team/pokebox/content/pokeInBox/const';
import {PokeInBoxTableDetailsProps} from '@/ui/team/pokebox/content/pokeInBox/table/details/type';
import {PokeboxDisplayType} from '@/ui/team/pokebox/viewer/type';
import {toSum} from '@/utils/array';
import {formatFloat} from '@/utils/number';


export const PokeInBoxTableProduction = ({
  pokemon,
  rateOfPokemon,
  display,
}: PokeInBoxTableDetailsProps) => {
  const {berry, ingredient} = rateOfPokemon;
  const rateOfIngredients = Object.values(ingredient);

  const t = useTranslations('UI.InPage.Pokedex');

  const sumOfDailyIngredientEnergy = toSum(rateOfIngredients.map(({energy}) => energy[stateOfRateToShow]));

  return (
    <>
      {
        isFilterIncludingSome({
          filter: display,
          filterKey: 'displayOfTable',
          ids: ['productionBerry'] satisfies PokeboxDisplayType[],
        }) &&
        <Flex direction="row" center noFullWidth className={clsx(
          'w-52 gap-1',
          pokemon.specialty === specialtyIdMap.berry && 'info-highlight',
        )}>
          <PokemonBerryIcon id={pokemon.berry.id}/>
          <div>
            x{formatFloat(berry.quantity[stateOfRateToShow])}
          </div>
          <ColoredEnergyIcon alt={t('Stats.Energy.Name')}/>
          <div>
            {formatFloat(berry.energy[stateOfRateToShow])}
          </div>
        </Flex>
      }
      {
        isFilterIncludingSome({
          filter: display,
          filterKey: 'displayOfTable',
          ids: ['productionIngredient'] satisfies PokeboxDisplayType[],
        }) &&
        <Flex direction="row" wrap center noFullWidth className={clsx(
          'w-72 gap-x-3 gap-y-0.5 p-0.5 text-xs',
          pokemon.specialty === specialtyIdMap.ingredient && 'info-highlight',
        )}>
          {rateOfIngredients.map(({id, quantity, energy}) => (
            <Flex key={id} direction="row" noFullWidth className="items-center gap-0.5">
              <PokemonIngredientIcon id={id} dimension="h-3.5 w-3.5"/>
              <div>
                x{formatFloat(quantity[stateOfRateToShow])}
              </div>
              <ColoredEnergyIcon alt={t('Stats.Energy.Name')} dimension="h-3 w-3"/>
              <div>
                {formatFloat(energy[stateOfRateToShow])}
              </div>
            </Flex>
          ))}
        </Flex>
      }
      {
        isFilterIncludingSome({
          filter: display,
          filterKey: 'displayOfTable',
          ids: ['productionTotal'] satisfies PokeboxDisplayType[],
        }) &&
        <Flex direction="row" center noFullWidth className="w-32 gap-0.5 text-lg">
          <ColoredEnergyIcon dimension="h-6 w-6" alt={t('Stats.Energy.Name')}/>
          <div>
            {formatFloat(berry.energy[stateOfRateToShow] + sumOfDailyIngredientEnergy)}
          </div>
        </Flex>
      }
      <Flex noFullWidth className="w-40">
        <PokemonProductionSplitFromPokemonRate
          rate={rateOfPokemon}
          state={stateOfRateToShow}
          specialty={pokemon.specialty}
          noBlink
        />
      </Flex>
    </>
  );
};
