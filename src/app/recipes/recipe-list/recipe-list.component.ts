import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { RecipeServiceService } from 'src/app/Services/recipe-service.service';
import { AppState } from 'src/app/store/app.reducer';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipesChangeSubscription: Subscription;
  recipes : Recipe[];
  constructor(private recipeService:RecipeServiceService,private route:ActivatedRoute,private router:Router,private store:Store<AppState>) { }
  ngOnDestroy(): void {
    this.recipesChangeSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.recipesChangeSubscription= this.store.select('recipes')
    .pipe(map(
      state=> state.recipes))
    .subscribe((recipes:Recipe[])=>{
      this.recipes=recipes;
    });
    // this.recipeService.getRecipes();
    // this.recipesChangeSubscription= this.recipeService.recipeListChanges.subscribe(()=>{
    //   this.recipes=this.recipeService.getRecipes();
    // })
  }
  onNewRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route})
  }


}
