import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {PokemonFrequency} from '@/components/shared/pokemon/frequency/main';
import {PokemonTimeToFullPack} from '@/components/shared/pokemon/fullPack/main';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
import {MainSkillIcon} from '@/components/shared/pokemon/mainSkill/icon/main';
import {PokemonMainSkillValue} from '@/components/shared/pokemon/mainSkill/value/base';
import {PokemonMainSkillTriggerValue} from '@/components/shared/pokemon/mainSkill/value/trigger';
import {PokemonIngredientRate} from '@/components/shared/pokemon/production/ingredientRate';
import {PokemonSleepType} from '@/components/shared/pokemon/sleepType/main';
import {getPokemonSorter} from '@/components/shared/pokemon/sorter/calc/main';
import {isPokedexSortExclusion} from '@/components/shared/pokemon/sorter/utils';
import {PokemonSpecialty} from '@/components/shared/pokemon/specialty/main';
import {defaultNeutralOpts} from '@/const/game/production';
import {imageSmallIconSizes} from '@/styles/image';
import {PokedexLinkProps} from '@/ui/pokedex/index/type';
import {getEvolutionCountFromPokemonInfo} from '@/utils/game/pokemon';
import {getPokemonProducingRate} from '@/utils/game/producing/pokemon';
import {formatFloat} from '@/utils/number';


export const PokedexLinkDetail = React.memo(({
  pokemon,
  pokemonProducingParams,
  display,
  level,
  ingredients,
  ingredientMap,
  berryDataMap,
  snorlaxFavorite,
  calculatedSettings,
}: PokedexLinkProps) => {
  const {
    id,
    berry,
    skill,
    stats,
    specialty,
    sleepType,
  } = pokemon;
  const {ingredientSplit, skillValue} = pokemonProducingParams;

  const t = useTranslations('Game');
  const t2 = useTranslations('UI.InPage.Pokedex');

  if (display === 'berry') {
    return (
      <Flex direction="row" className="gap-0.5">
        <PokemonBerryIcon id={berry.id}/>
        <div>
          {berry.quantity}
        </div>
      </Flex>
    );
  }

  if (display === 'mainSkill') {
    return (
      <Flex direction="row" className="items-end gap-0.5 text-sm">
        <MainSkillIcon id={skill} dimension="h-6 w-6"/>
        {t(`MainSkill.Name.${skill}`)}
      </Flex>
    );
  }

  if (display === 'ingredient') {
    return <PokemonIngredientIcons ingredients={[ingredients]}/>;
  }

  if (display === 'ingredientRate') {
    return <PokemonIngredientRate split={ingredientSplit}/>;
  }

  if (display === 'sleepType') {
    return <PokemonSleepType sleepType={sleepType}/>;
  }

  if (display === 'specialty') {
    return <PokemonSpecialty specialty={specialty}/>;
  }

  if (display === 'frequencyBase') {
    return <PokemonFrequency frequency={stats.frequency}/>;
  }

  if (display === 'mainSkillValue') {
    return <PokemonMainSkillValue value={skillValue}/>;
  }

  const evolutionCount = getEvolutionCountFromPokemonInfo({pokemon});

  // Need to calculate here because display and sort could be different
  const sorter = getPokemonSorter({
    type: display,
    pokemon,
    pokemonProducingParams,
    berryDataMap,
    ingredientMap,
    ingredients,
    level,
    snorlaxFavorite,
    calculatedSettings,
    evolutionCount,
    dateAdded: null,
    ...defaultNeutralOpts,
  });

  if (display === 'friendshipPoint') {
    return (
      <Flex direction="row" className="gap-0.5">
        <div className="relative h-5 w-5">
          <NextImage src="/images/generic/friendship.png" alt={t2('Stats.Friendship')} sizes={imageSmallIconSizes}/>
        </div>
        <div>
          {sorter}
        </div>
      </Flex>
    );
  }

  if (display === 'frequencyOfBerry' || display === 'frequencyOfIngredient') {
    return <PokemonFrequency frequency={sorter}/>;
  }

  if (display === 'timeToFullPack') {
    return <PokemonTimeToFullPack timeToFullPack={sorter}/>;
  }

  if (display === 'id') {
    return `#${id}`;
  }

  if (display === 'ingredientEnergy') {
    return (
      <Flex>
        <div className="text-xs">
          <PokemonIngredientIcons ingredients={[ingredients]} dimension="h-4 w-4"/>
        </div>
        <Flex direction="row" className="gap-0.5">
          <ColoredEnergyIcon alt={t2('Stats.Energy.Name')}/>
          <div>
            {formatFloat(sorter)}
          </div>
        </Flex>
      </Flex>
    );
  }

  if (display === 'ingredientCount') {
    const {ingredient} = getPokemonProducingRate({
      level,
      pokemon,
      pokemonProducingParams,
      ingredientMap,
      ingredients,
      snorlaxFavorite: {},
      berryData: berryDataMap[pokemon.berry.id],
      evolutionCount,
      ...calculatedSettings,
      ...defaultNeutralOpts,
    });

    return (
      <Flex>
        <div className="text-xs">
          <PokemonIngredientIcons ingredients={[ingredients]} dimension="h-4 w-4"/>
        </div>
        <PokemonIngredientIcons
          numberFormat="float"
          ingredients={[Object.values(ingredient)
            .sort((a, b) => b.quantity.equivalent - a.quantity.equivalent)
            .map(({id, quantity}) => ({
              id,
              qty: quantity.equivalent,
            })),
          ]}
        />
      </Flex>
    );
  }

  if (display === 'frequency') {
    return <PokemonFrequency frequency={sorter}/>;
  }

  if (display === 'berryEnergy' || display === 'berryCount') {
    return (
      <Flex direction="row" className="gap-0.5">
        <PokemonBerryIcon id={berry.id}/>
        {display === 'berryEnergy' && <ColoredEnergyIcon alt={t2('Stats.Energy.Name')}/>}
        <div>
          {formatFloat(sorter)}
        </div>
      </Flex>
    );
  }

  if (display === 'totalEnergy') {
    return (
      <Flex direction="row" className="gap-0.5">
        <ColoredEnergyIcon alt={t2('Stats.Energy.Name')}/>
        <div>
          {formatFloat(sorter)}
        </div>
      </Flex>
    );
  }

  if (display === 'mainSkillTriggerValue') {
    return <PokemonMainSkillTriggerValue value={sorter}/>;
  }

  if (isPokedexSortExclusion(display)) {
    return null;
  }

  console.error(`Unhandled Pokedex display type: [${display satisfies never}]`);
});
PokedexLinkDetail.displayName = 'PokedexLinkDetail';
