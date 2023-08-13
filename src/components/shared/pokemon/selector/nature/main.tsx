import React from 'react';

import MagnifyingGlassIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon';
import QuestionMarkCircleIcon from '@heroicons/react/24/outline/QuestionMarkCircleIcon';
import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import ChevronUpDownIcon from '@heroicons/react/24/solid/ChevronUpDownIcon';
import {useTranslations} from 'next-intl';

import {InputBox} from '@/components/input/box';
import {Flex} from '@/components/layout/flex';
import {Popup} from '@/components/popup';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {PokemonNatureSelectorButton} from '@/components/shared/pokemon/selector/nature/button';
import {natureData} from '@/data/nature';
import {NatureId} from '@/types/game/producing/nature';


type Props = {
  nature: NatureId | null,
  setNature: (nature: NatureId | null) => void,
};

export const PokemonNatureSelector = ({nature, setNature}: Props) => {
  const [show, setShow] = React.useState(false);
  const [search, setSearch] = React.useState('');

  const t = useTranslations('Game');

  const natureDataWithSearch = React.useMemo(() => natureData.map((data) => ({
    ...data,
    keyword: [
      t(`Nature.${data.id}`),
      data.buff && t(`NatureEffect.${data.buff}`),
      data.nerf && t(`NatureEffect.${data.nerf}`),
    ].join(' '),
  })), []);

  const matchingNatureData = natureDataWithSearch.filter(({keyword}) => search && keyword.includes(search));

  const onClick = (id: NatureId | null) => {
    setNature(id);
    setShow(false);
  };

  return (
    <>
      <button
        className="button-clickable-bg h-full whitespace-nowrap px-1.5 text-sm"
        onClick={() => setShow(true)}
      >
        <Flex direction="row" center>
          <div className="h-5 w-5">
            <ChevronUpDownIcon/>
          </div>
          <div className="pr-1">
            {nature ? t(`Nature.${nature}`) : <div className="h-5 w-5"><XCircleIcon/></div>}
          </div>
        </Flex>
      </button>
      <Popup show={show} setShow={setShow}>
        <Flex direction="col" className="gap-2 pr-2">
          <Flex direction="row" center className="gap-1.5">
            <div className="h-6 w-6">
              <MagnifyingGlassIcon/>
            </div>
            <InputBox
              type="text"
              value={search}
              onChange={({target}) => setSearch(target.value)}
              className="w-full"
            />
          </Flex>
          {search ?
            <>
              <Flex direction="row" center wrap className="gap-2">
                {matchingNatureData.length ?
                  matchingNatureData.map((data) => (
                    <PokemonNatureSelectorButton
                      key={data.id} data={data} active={nature === data.id} onClick={() => onClick(data.id)}
                    />
                  )) :
                  <div className="h-14 w-14">
                    <QuestionMarkCircleIcon/>
                  </div>}
              </Flex>
              <HorizontalSplitter className="my-2"/>
            </> :
            <></>}
          <Flex direction="row" center wrap className="gap-2">
            <PokemonNatureSelectorButton data={null} active={nature === null} onClick={() => onClick(null)}/>
            {natureData.map((data) => (
              <PokemonNatureSelectorButton
                key={data.id} data={data} active={nature === data.id} onClick={() => onClick(data.id)}
              />
            ))}
          </Flex>
        </Flex>
      </Popup>
    </>
  );
};
