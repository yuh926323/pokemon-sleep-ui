import React from 'react';

import {Transition} from '@headlessui/react';
import {clsx} from 'clsx';


type Props = {
  show: boolean,
  appear?: boolean,
  noFullWidth?: boolean,
};

export const AnimatedCollapse = ({show, appear, noFullWidth, children}: React.PropsWithChildren<Props>) => {
  return (
    <Transition
      show={show}
      appear={appear}
      enter="duration-1000"
      enterFrom="grid-rows-[0fr]"
      enterTo="grid-rows-[1fr]"
      leave="duration-1000"
      leaveFrom="grid-rows-[1fr]"
      leaveTo="grid-rows-[0fr]"
      className={clsx('grid transition-[grid-template-rows] ease-in-out', !noFullWidth && 'w-full')}
    >
      <Transition.Child
        enter="delay-500 duration-1000"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="duration-1000"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="overflow-hidden transition-opacity ease-in-out"
      >
        {children}
      </Transition.Child>
    </Transition>
  );
};
