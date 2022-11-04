import { ActionReducerMap } from "@ngrx/store";
import * as AuthenticationReducer from "../authentication/store/authentication.reducer";
import * as ShoppingListReducer from "../shopping-list/store/shopping-list.reducer";
import * as RecipesReducer from "../recipes/store/recipe.reducer";


export interface AppState{
    shoppingList:ShoppingListReducer.State,
    auth:AuthenticationReducer.State,
    recipes:RecipesReducer.State,
}

export const appReducer: ActionReducerMap<AppState>={
    shoppingList:ShoppingListReducer.shoppinListReducre,
    auth:AuthenticationReducer.authenticationReducer,
    recipes:RecipesReducer.recipeReducer,
};
