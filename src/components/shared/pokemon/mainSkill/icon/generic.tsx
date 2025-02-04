import React from 'react';

import {GenericIcon} from '@/components/shared/icon/common/main';
import {Dimension} from '@/types/style';


type Props = {
  alt: string,
  dimension?: Dimension,
};

export const GenericMainSkillIcon = ({alt, dimension}: Props) => {
  return (
    <GenericIcon
      src="/images/generic/mainSkill.png"
      alt={alt}
      dimension={dimension}
    />
  );
};
