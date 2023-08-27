import {createUserDataManager} from '@/controller/user/common';
import {MealTypeId} from '@/types/game/meal';
import {UploadOfTeamAnalysisSetup} from '@/types/userData/upload';
import {CookingFilterIngredientCount, CookingFilterRecipeLevel} from '@/ui/cooking/type';
import {PokedexDisplay} from '@/ui/pokedex/index/type';
import {PokeboxViewerDisplay} from '@/ui/team/pokebox/viewer/type';


export const userDataRecipeLevel = createUserDataManager<CookingFilterRecipeLevel>('recipeLevel');

export const userDataTeamAnalysisSetup = createUserDataManager<UploadOfTeamAnalysisSetup>('teamAnalysisSetup');

export const userDataPokedex = createUserDataManager<PokedexDisplay>('pokedex');

export const userDataPotCapacity = createUserDataManager<number>('potCapacity');

export const userDataMealType = createUserDataManager<MealTypeId>('mealType');

export const userDataIngredientCount = createUserDataManager<CookingFilterIngredientCount>('ingredientCount');

export const userDataPokeboxDisplay = createUserDataManager<PokeboxViewerDisplay>('pokeboxDisplay');
