import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';;
import { map,switchMap} from 'rxjs/operators';
import { RecipeServiceService } from 'src/app/Services/recipe-service.service';
import { AddIngredients } from 'src/app/shopping-list/store/shopping-list.action';
import { AppState } from 'src/app/store/app.reducer';

import { Recipe } from '../recipe.model';
import { DeleteRecipe } from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css','../../Shared/shared-style.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe:Recipe;
  id:number;
  constructor(private recipeService:RecipeServiceService, private route:ActivatedRoute,private router:Router,private store:Store<AppState>) { }
  ngOnInit(): void {
    this.route.params.pipe(
      map(params=>{
      return +params['id']}),switchMap(id=>{
        this.id=id;
        return  this.store.select('recipes');
      }),map(state=>{
        return state.recipes.find((recipe,index)=>{
          return index===this.id;
        });
      })
      ).subscribe(recipe=>{
        this.recipe=recipe;
      });


    // this.route.params.subscribe(
    //   (params:Params)=>{
    //     this.id=+params['id'];
    //     //this.recipe = this.recipeService.getRecipe(this.id);
    //     this.store.select('recipes').pipe(map(state=>{         
    //       return state.recipes.find((recipe,index)=>{
    //         return index===this.id;
    //       });
    //     })
    //     ).subscribe(recipe=>{
    //       this.recipe=recipe;
    //     })
    //   }
    // );

  }
  addToShopping(){
   
    this.store.dispatch(new AddIngredients(this.recipe.ingredients));
   // this.recipeService.addIngredients(this.recipe.ingredients);
  }
  onDelete(){
   // this.recipeService.deleteRecipe(this.id);
    this.store.dispatch(new DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }

}
