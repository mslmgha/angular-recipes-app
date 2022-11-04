import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../Shared/ingredient.model';
import { AddIngredients } from '../shopping-list/store/shopping-list.action';
import { AppState } from '../store/app.reducer';

@Injectable()
export class RecipeServiceService {

  recipeListChanges= new  Subject<void>();
  private recipes: Recipe[] = [
    // new Recipe('Beef biryani',
    //   'This beef biryani recipe is cooked in the slow cooker, so you can set and forget, and come home to an Indian classic!',
    //   'https://img.taste.com.au/45AGfjVj/w643-h428-cfill-q90/taste/2019/04/beef-biryani-148902-1.jpg',
    //   [new Ingredient('Beef', 1),
    //   new Ingredient('Rize', 5)]
    // ),
    // new Recipe('Crispy taco cones',
    //   'This easy tortilla hack means nothing\'s falling out the bottom of your tacos! Stuff with your fave taco fillings like mince, cheese and fresh veg mess-free Mexican for the win!',
    //   'https://img.taste.com.au/QAdvEYvE/w643-h428-cfill-q90/taste/2022/08/crispy-taco-cones-180878-3.jpg',
    //   [new Ingredient('Tortilla bread', 1),
    //   new Ingredient('Cheese', 2)]),
    // new Recipe('Sticky Vietnamese salmon',
    //   'These sticky salmon fillets are so quick and easy to throw together after a busy day they\'re on the table in 20 mins! The sweet and salty sauce is made with brown sugar which gives the salmon a sweet, golden crust as it caramelises!',
    //   'https://img.taste.com.au/YRe6YKt5/w643-h428-cfill-q90/taste/2022/08/sticky-vietnamese-salmon-180891-1.jpg',
    //   [new Ingredient('Salmon', 1),
    //   new Ingredient('Brown sugar', 3)])
  ];
  getRecipes() {
    return this.recipes.slice();
    //use slice() to return a copy of the array not the array itslef. 
  }
  constructor(private store:Store<AppState>) { }

  addIngredients(ingredants: Ingredient[]) {
    // this.slService.addIngredients(ingredants);
    // this.recipeListChanges.next();
    this.store.dispatch(new AddIngredients(ingredants));
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }
  addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.recipeListChanges.next();
  }
  updateRecipe(index:number,recipe:Recipe){
    this.recipes[index]=recipe;
    this.recipeListChanges.next();
  }
  deleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipeListChanges.next();
  }
  setRecipes(recipes: Recipe[]){
    this.recipes=recipes;
    this.recipeListChanges.next();
  }
}
