import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { State, Store } from "@ngrx/store";
import { map, switchMap ,withLatestFrom} from "rxjs/operators";
import { AppState } from "src/app/store/app.reducer";
import { Recipe } from "../recipe.model";
import { FETCH_RECIPE, SetRecipes, STORE_RECIPES } from "./recipe.actions";


@Injectable()
export class RecipesEffects{
    @Effect()
    fetchRecipe=this.action$.pipe(
        ofType(FETCH_RECIPE),
        switchMap(()=>{
           return this.http.get<Recipe[]>('https://ng-recipe-book-df0df-default-rtdb.firebaseio.com/recipes.json');
        }),map(response => {
            return response.map(recipe => {
                return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
            })
        }),map(recipes => {
            return new SetRecipes(recipes);
        })
    );

    @Effect({dispatch:false})
    storeRecipes=this.action$.pipe(
        ofType(STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap( ([actionData,RecipeState]) =>{
            return this.http.put('https://ng-recipe-book-df0df-default-rtdb.firebaseio.com/recipes.json', RecipeState.recipes);
        })
    );
  
    constructor(private action$:Actions,private http:HttpClient,private store:Store<AppState>){
    }
}