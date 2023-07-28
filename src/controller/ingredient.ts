import {Collection} from 'mongodb';

import mongoPromise from '@/lib/mongodb';
import {Ingredient, IngredientId, IngredientMap} from '@/types/mongo/ingredient';


const getCollection = async (): Promise<Collection<Ingredient>> => {
  const client = await mongoPromise;

  return client
    .db('food')
    .collection<Ingredient>('ingredient');
};

export const getAllIngredients = async (): Promise<IngredientMap> => {
  return Object.fromEntries((await (await getCollection())
    .find({}, {projection: {_id: false}})
    .toArray())
    .map((ingredient) => [ingredient.id, ingredient]));
};

export const getIngredient = async (id: IngredientId) => {
  return (await getCollection()).findOne({id}, {projection: {_id: false}});
};
