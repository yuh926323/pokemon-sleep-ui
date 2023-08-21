import React from 'react';

import clsx from 'clsx';

import {LayoutProps} from '@/components/layout/type';
import {getLayoutClassNames} from '@/components/layout/util';


type Props = LayoutProps & {
  direction: 'row' | 'col',
  wrap?: boolean,
};

export const Flex = ({
  direction,
  wrap,
  children,
  ...props
}: React.PropsWithChildren<Props>) => {
  return (
    <div className={clsx(
      'flex',
      direction === 'row' ? 'flex-row' : 'flex-col',
      wrap && 'flex-wrap',
      getLayoutClassNames(props),
    )}>
      {children}
    </div>
  );
};
