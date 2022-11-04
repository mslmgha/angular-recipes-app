import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthenticationService } from "../authentication/authentication.service";
import { Recipe } from "../recipes/recipe.model";
import { SetRecipes } from "../recipes/store/recipe.actions";
import { RecipeServiceService } from "../Services/recipe-service.service";
import { AppState } from "../store/app.reducer";

@Injectable(
    { providedIn: 'root' }
)
export class DataStorageService {

    constructor(private http: HttpClient, private recipesService: RecipeServiceService,private authService:AuthenticationService,private store:Store<AppState>) {

    }

    storeRecipes() {
        const recipes = this.recipesService.getRecipes();
        this.http.put('https://ng-recipe-book-df0df-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(response => {
        });
    }

    getRecipes() {
        // return this.authService.user.pipe(take(1),exhaustMap(user=>{
        //     return this.http.get<Recipe[]>('https://ng-recipe-book-df0df-default-rtdb.firebaseio.com/recipes.json',{
        //         params: new HttpParams().set('auth',user.token)
        //     });
        // }),map(response => {
        //     return response.map(recipe => {
        //         return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
        //     })
        // }),
        // tap(response => {
        //     this.recipesService.setRecipes(response)
        // }))
        return this.http.get<Recipe[]>('https://ng-recipe-book-df0df-default-rtdb.firebaseio.com/recipes.json').pipe(
            map(response => {
                return response.map(recipe => {
                    return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
                })
            }),
            tap((response:Recipe[]) => {
                this.store.dispatch(new SetRecipes(response));
                //this.recipesService.setRecipes(response)
            })
        );
    }
}