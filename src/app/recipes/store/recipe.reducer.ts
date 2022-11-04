import { StartEdit } from "src/app/shopping-list/store/shopping-list.action";
import { Recipe } from "../recipe.model";
import { ADD_RECIPE, DELETE_RECIPE, FETCH_RECIPE, RecipeActionTypes, SET_RECIPES, UPDATE_RECIPE } from "./recipe.actions";

export interface State {
    recipes: Recipe[],
}

const initialSate: State = {
    recipes: [],
}

export function recipeReducer(state = initialSate, action: RecipeActionTypes) {
    switch (action.type) {
        case SET_RECIPES:
            return {
                ...
                state,
                recipes: [...action.payload]
            };
        case ADD_RECIPE:
            return {
                ...
                state,
                recipes: [...state.recipes, action.payload]
            };
        case DELETE_RECIPE:
            return {
                ...state,
                recipes: state.recipes.filter((recipe, recIndex) => {
                    return recIndex != action.payload;
                }),
            };
        case UPDATE_RECIPE:
            const updatedRecipe= {...state.recipes[action.payload.index],...action.payload.recipe}
            const updatedRecipes = [...state.recipes];
            updatedRecipes[action.payload.index] = updatedRecipe;
           // console.log(updatedRecipes);
            return {
                ...
                state,
                recipes: [...updatedRecipes],
            };
        default:
            return state;
    }
} 