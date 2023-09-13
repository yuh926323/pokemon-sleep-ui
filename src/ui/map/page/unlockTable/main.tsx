import React from 'react';

import {useTranslations} from 'next-intl';

import {FilterInclusionMap} from '@/components/input/filter/type';
import {Flex} from '@/components/layout/flex';
import {NextImage} from '@/components/shared/common/image/main';
import {GenericPokeballIcon} from '@/components/shared/icon/pokeball';
import {imageSmallIconSizes} from '@/styles/image';
import {SleepdexMarkedByMap} from '@/types/game/sleepdex';
import {MapCommonProps, MapInputInclusionKey, MapPageFilter} from '@/ui/map/page/type';
import {MapUnlockTableRow} from '@/ui/map/page/unlockTable/row';
import {getPossibleRanks} from '@/ui/map/page/utils';
import {isSameRank} from '@/utils/game/snorlax';


type Props = Pick<MapCommonProps, 'mapId' | 'pokedexMap' | 'sleepStyles' | 'snorlaxRank' | 'snorlaxReward'> & {
  filter: MapPageFilter,
  isIncluded: FilterInclusionMap<MapInputInclusionKey>,
  initialSleepdex: SleepdexMarkedByMap,
};

export const MapUnlockTable = (props: Props) => {
  const {
    sleepStyles,
    filter,
    isIncluded,
    initialSleepdex,
  } = props;
  const {showEmptyRank} = filter;

  const [sleepdex, setSleepdex] = React.useState(initialSleepdex);

  const t = useTranslations('UI.Common');
  const t2 = useTranslations('UI.InPage.Map');

  let stylesAccumulated = 0;

  return (
    <table className="table-unlock">
      <thead>
        <tr>
          <td className="p-1">{t('Rank')}</td>
          <td/>
          <td className="p-1">
            <Flex direction="row" center className="gap-1">
              <GenericPokeballIcon dimension="h-6 w-6" alt={t2('Pokemon')}/>
              <div>/</div>
              <div className="relative h-6 w-6">
                <NextImage
                  src="/images/generic/gift.png" alt={t('DreamShards')}
                  sizes={imageSmallIconSizes} className="invert-on-light"
                />
              </div>
            </Flex>
          </td>
        </tr>
      </thead>
      <tbody>
        {getPossibleRanks().map((rank) => {
          const matchingStyles = sleepStyles
            .filter(({pokemonId, style}) => (
              isIncluded[`${pokemonId}-${style.style}`] &&
              isSameRank(style.rank, rank)
            ));

          const toHide = !showEmptyRank && !matchingStyles.length;
          const key = `${rank.title}-${rank.number}`;

          if (toHide) {
            return <React.Fragment key={key}/>;
          }

          stylesAccumulated += matchingStyles.length;

          return (
            <MapUnlockTableRow
              key={key}
              rank={rank}
              matchingStyles={matchingStyles}
              stylesAccumulated={stylesAccumulated}
              sleepdex={sleepdex}
              setSleepdex={setSleepdex}
              {...props}
            />
          );
        })}
      </tbody>
    </table>
  );
};
