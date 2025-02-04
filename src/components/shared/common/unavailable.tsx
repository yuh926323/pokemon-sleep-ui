import React from 'react';

import {clsx} from 'clsx';

import {NextImage} from '@/components/shared/common/image/main';
import {imageIconSizes} from '@/styles/image';
import {Dimension} from '@/types/style';


type Props = {
  dimension?: Dimension,
  text?: string,
};

export const UnavailableIcon = ({dimension, text}: Props) => {
  return (
    <div className={clsx('relative', dimension ?? 'h-12 w-12')}>
      <NextImage
        src="/images/generic/pokeball_unavailable.png" alt="N/A"
        sizes={imageIconSizes} className="invert-hoverable"
      />
      {text && <div className="absolute bottom-0.5 right-0.5">{text}</div>}
    </div>
  );
};
