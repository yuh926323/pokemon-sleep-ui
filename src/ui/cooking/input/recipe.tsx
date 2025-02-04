import React from 'react';

import {Grid} from '@/components/layout/grid';
import {CookingInputRecipeSingle} from '@/ui/cooking/input/recipeSingle';
import {CookingCommonProps} from '@/ui/cooking/type';


export const CookingInputRecipe = (props: CookingCommonProps) => {
  const {meals, filter} = props;

  return (
    <Grid className="grid-cols-1 gap-1 xs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {meals
        .filter(({type}) => filter.type === type)
        .map((data) => <CookingInputRecipeSingle key={data.id} {...props} data={data}/>)}
    </Grid>
  );
};
