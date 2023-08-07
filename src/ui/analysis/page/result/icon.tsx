import React from 'react';

import {useTranslations} from 'next-intl';
import Link from 'next-intl/link';

import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {imageIconSizes} from '@/styles/image';
import {AnalysisStatsLinkedData} from '@/ui/analysis/page/calc/type';
import {classNames} from '@/utils/react';


type Props<TData> = {
  linked: AnalysisStatsLinkedData<TData>,
  renderData?: (data: AnalysisStatsLinkedData<TData>) => React.ReactNode,
};

export const AnalysisPokemonIcon = <TData, >({linked, renderData}: Props<TData>) => {
  const {pokemonId} = linked;

  const t = useTranslations('Game.PokemonName');
  const t2 = useTranslations('UI.Metadata');

  const name = t(pokemonId.toString());

  return (
    <Flex direction="col" center noFullWidth className={classNames(
      'relative button-bg gap-1.5 rounded-lg p-1 w-24',
    )}>
      <div className="relative h-14 w-14">
        <NextImage src={`/images/pokemon/icons/${pokemonId}.png`} alt={name} sizes={imageIconSizes}/>
      </div>
      {
        renderData &&
        <Flex direction="col">
          {renderData(linked)}
        </Flex>
      }
      <Flex direction="row" className="gap-2">
        <Flex direction="col" center>
          <Link href={`/pokedex/${pokemonId}`} className="button-clickable group relative h-6 w-6">
            <NextImage
              src="/images/generic/pokeball.png" alt={t2('Pokedex.Page.Title', {name})}
              sizes={imageIconSizes} className="invert-hoverable"
            />
          </Link>
        </Flex>
        <Flex direction="col" center>
          <Link href={`/analysis/${pokemonId}`} className="button-clickable group relative h-6 w-6">
            <NextImage
              src="/images/generic/analysis.png" alt={t2('Analysis.Title', {name})}
              sizes={imageIconSizes} className="invert-hoverable"
            />
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};
