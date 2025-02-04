'use client';
import React from 'react';

import {useSession} from 'next-auth/react';

import {Flex} from '@/components/layout/flex/common';
import {PokemonLab} from '@/components/shared/pokemon/predefined/lab/main';
import {RatingBasisSelection} from '@/components/shared/pokemon/rating/basis/selection/main';
import {RatingResult} from '@/components/shared/pokemon/rating/main';
import {SnorlaxFavoriteInput} from '@/components/shared/snorlax/favorite';
import {useUserSettings} from '@/hooks/userData/settings';
import {RatingOnDeskState, RatingRequest} from '@/types/game/pokemon/rating';
import {RatingDataProps, RatingServerDataProps} from '@/ui/rating/type';
import {toRatingRequest} from '@/ui/rating/utils';
import {getPokemonMaxEvolutionCount} from '@/utils/game/pokemon';
import {getPokemonProducingParams} from '@/utils/game/producing/pokemon';
import {getDefaultRatingBasis} from '@/utils/game/rating/utils';
import {isNotNullish} from '@/utils/type';


export const RatingClient = (props: RatingServerDataProps) => {
  const {
    pokedexMap,
    pokemonProducingParamsMap,
    mapMeta,
    preloadedSettings,
  } = props;

  const [request, setRequest] = React.useState<RatingRequest>();
  const {data: session} = useSession();
  const calculatedSettings = useUserSettings({
    server: preloadedSettings,
    client: session?.user.preloaded.settings,
  });

  const resultRef = React.useRef<HTMLDivElement>(null);

  const pokemonList = Object.values(pokedexMap).filter(isNotNullish);
  const data: RatingDataProps = {
    pokemonList,
    maxEvolutionCount: getPokemonMaxEvolutionCount(pokemonList),
    ...props,
  };

  const scrollToResult = () => resultRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'});

  return (
    <PokemonLab
      {...data}
      onPokemonPicked={(setup, opts) => {
        const {origin} = opts;

        if (origin === 'pokebox') {
          setRequest(toRatingRequest({setup, calculatedSettings}));
          scrollToResult();
        } else if (origin === 'pokedex' && request) {
          // This is for resetting the result layout
          setRequest(toRatingRequest({
            setup,
            calculatedSettings,
            timestamp: request.timestamp,
          }));
        }
      }}
      onRun={(setup: RatingOnDeskState) => {
        scrollToResult();
        setRequest(toRatingRequest({setup, calculatedSettings}));
      }}
      toState={(onDeskState): RatingOnDeskState => ({
        ...onDeskState,
        snorlaxFavorite: {},
        basis: getDefaultRatingBasis(onDeskState.pokemon.specialty),
      })}
      renderAdditional={(onDesk, setOnDesk) => (
        <Flex className="gap-1.5">
          <SnorlaxFavoriteInput
            pokemonList={pokemonList}
            mapMeta={mapMeta}
            filter={onDesk}
            setFilter={setOnDesk}
            filterKey="snorlaxFavorite"
          />
          <RatingBasisSelection
            current={onDesk.basis}
            onSelect={(basis) => setOnDesk((original) => ({...original, basis}))}
            idPrefix="rating"
          />
        </Flex>
      )}
      renderResult={({pokemon}) => (
        <RatingResult
          ref={resultRef}
          request={request}
          pokemon={pokemon}
          pokemonProducingParams={getPokemonProducingParams({
            pokemonId: pokemon.id,
            pokemonProducingParamsMap,
          })}
          {...data}
        />
      )}
    />
  );
};
