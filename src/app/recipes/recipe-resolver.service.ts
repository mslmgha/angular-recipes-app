import { Injectable, Injector } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { map, switchMap, take } from "rxjs/operators";
import { RecipeServiceService } from "../Services/recipe-service.service";
import { DataStorageService } from "../Shared/data-storage.service";
import { AppState } from "../store/app.reducer";
import { Recipe } from "./recipe.model";
import { FetchRecipes, SET_RECIPES } from "./store/recipe.actions";

@Injectable({
    providedIn: 'root'
})
export class RecipeResovlerService implements Resolve<Recipe[]>{

    constructor(private dataStorageService: DataStorageService, private recipeService:RecipeServiceService,private store:Store<AppState>,private action$:Actions) {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select('recipes').pipe(take(1), map( state=>{
            return state.recipes
        }),switchMap((recipes)=>{
            if(recipes.length ===0){
                this.store.dispatch(new FetchRecipes());
                return  this.action$.pipe(
                    ofType(SET_RECIPES),take(1)
                );
            }else{
                return of(recipes);
            }
        }))
        
        // if(this.recipeService.getRecipes().length===0){
        //     return this.dataStorageService.getRecipes();
        // }else{
        //     return this.recipeService.getRecipes(); 
        // }
    }
}