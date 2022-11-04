import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RecipeServiceService } from 'src/app/Services/recipe-service.service';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  recipeData: Recipe;
  @Input('recipe') recipe: Recipe;
  @Input('id') id: number;
  //@Output("recipeSelected") recipeSelected= new EventEmitter<void>();
  constructor(private recipeService:RecipeServiceService) { }

  ngOnInit(): void {
    this.recipeData = this.recipe;
    //this.recipeService.getRecipe(this.id);
  }
  onRevipeSelected(){
    //this.recipeService.selectedRecipe.emit(this.recipeData);
   // this.recipeSelected.emit();
  }

}
