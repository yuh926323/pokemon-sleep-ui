import {toggleClass} from '@/ui/pokedex/index/input/const';
import {classNames} from '@/utils/react';


export const getPokedexInputButtonClass = (isActive: boolean) => classNames(
  'relative h-8 px-2 rounded-full whitespace-nowrap text-sm',
  isActive ? toggleClass.active.hover : toggleClass.inactive.hover,
  isActive ? toggleClass.active.background : toggleClass.inactive.background,
);
