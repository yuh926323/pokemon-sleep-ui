import React from 'react';

import ArrowTopRightOnSquareIcon from '@heroicons/react/24/outline/ArrowTopRightOnSquareIcon';
import {signIn} from 'next-auth/react';

import {Flex} from '@/components/layout/flex/common';


type Props = {
  provider: string,
  text: React.ReactNode,
};

export const AuthSignInProvider = ({provider, text}: Props) => {
  return (
    <button className="button-clickable-bg w-2/3 p-2 lg:w-1/2" onClick={() => signIn(provider)}>
      <Flex direction="row" noFullWidth center className="gap-1.5">
        <div className="h-6 w-6">
          <ArrowTopRightOnSquareIcon/>
        </div>
        <div>
          {text}
        </div>
      </Flex>
    </button>
  );
};
