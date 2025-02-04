import React from 'react';

import MagnifyingGlassIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon';
import {clsx} from 'clsx';

import {InputBox} from '@/components/input/box';
import {InputRowWithTitle} from '@/components/input/filter/rowWithTitle';
import {AnimatedCollapseQuick} from '@/components/layout/collapsible/animatedQuick';
import {Flex} from '@/components/layout/flex/common';
import {FlexForm} from '@/components/layout/flex/form';
import {actionStatusIcon} from '@/components/shared/userData/const';
import {ActivationCheckerState} from '@/ui/admin/activation/search/type';
import {ActivationUiControl} from '@/ui/admin/activation/type';


type Props = {
  control: ActivationUiControl,
};

export const ActivationSearcher = ({control}: Props) => {
  const {actAsync, showActivation, status} = control;

  const [data, setData] = React.useState<ActivationCheckerState>({
    key: '',
    notFound: false,
  });
  const {key, notFound} = data;

  return (
    <FlexForm className="info-section" onSubmit={async () => {
      const updated = await actAsync({
        action: 'load',
        options: {type: 'adminActivationCheck', opts: {key}},
      });

      const info = updated?.user.lazyLoaded.adminActivationCheck;
      if (!info) {
        setData((original) => ({...original, notFound: true}));
        return;
      }

      showActivation(info);
    }}>
      <div className="text-2xl">
        Activation Key Searcher
      </div>
      <InputRowWithTitle title="Key">
        <InputBox
          id="activationSearch"
          type="text"
          value={key}
          className="w-full"
          onChange={({target}) => setData((original) => ({
            ...original,
            key: target.value,
          } satisfies ActivationCheckerState))}
        />
        <button type="submit" disabled={status !== 'waiting'} className={clsx(
          'button-clickable-bg disabled:button-disabled h-8 w-8 shrink-0 p-1',
        )}>
          {status === 'waiting' ? <MagnifyingGlassIcon/> : actionStatusIcon[status]}
        </button>
      </InputRowWithTitle>
      <AnimatedCollapseQuick show={notFound}>
        <Flex className="text-end text-red-600 dark:text-red-400">
          Activation not found
        </Flex>
      </AnimatedCollapseQuick>
    </FlexForm>
  );
};
