import { Action } from "@ngrx/store";
import { Recipe } from "../recipe.model";


export const ADD_RECIPE = '[RECIPES] ADD_RECIPE';
export const SET_RECIPES = '[RECIPES] SET_RECIPES';
export const UPDATE_RECIPE = '[RECIPES] UPDATE_RECIPE';
export const DELETE_RECIPE = '[RECIPES] DELETE_RECIPE';
export const FETCH_RECIPE = '[RECIPES] FETCH_RECIPE';
export const STORE_RECIPES = '[RECIPES] STORE_RECIPES';

export class AddRecipe implements Action {
    readonly type = ADD_RECIPE;
    constructor(public payload:Recipe){}
}

export class SetRecipes implements Action {
    readonly type = SET_RECIPES;
    constructor(public payload:Recipe[]){}
}

export class DeleteRecipe implements Action {
    readonly type = DELETE_RECIPE;
    constructor(public payload:number){}
}

export class UpdateRecipe implements Action {
    readonly type = UPDATE_RECIPE;
    constructor(public payload:{recipe:Recipe,index:number}){}
}

export class FetchRecipes implements Action {
    readonly type = FETCH_RECIPE;
}

export class StoreRecipes implements Action {
    readonly type = STORE_RECIPES;
}
export type RecipeActionTypes= SetRecipes|AddRecipe|DeleteRecipe|UpdateRecipe|FetchRecipes | StoreRecipes;