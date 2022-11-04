import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { RecipeServiceService } from 'src/app/Services/recipe-service.service';
import { Ingredient } from 'src/app/Shared/ingredient.model';
import { AppState } from 'src/app/store/app.reducer';
import { Recipe } from '../recipe.model';
import { AddRecipe, DeleteRecipe, UpdateRecipe } from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css','../../Shared/shared-style.css'],

})
export class RecipeEditComponent implements OnInit {
  id:number;
  editMode:boolean=false;
  recipeForm:FormGroup;
  constructor(private route:ActivatedRoute,private router:Router,private recipeService:RecipeServiceService,private store:Store<AppState>) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)=>{
        this.id=+params['id'];
        this.editMode=(params['id']!=null);
        this.initialzeForm();
      }
    )
  }

  private initialzeForm(){
    let recipeName='';
    let recipeImageURL='';
    let recipeDescription='';
    let recipeIngredients= new FormArray([]);
    if(this.editMode){
      this.store.select('recipes').pipe(map(state=>{
        return state.recipes.find((recipe,index)=>{
          return index===this.id;
        });
      })).subscribe(recipe=>{
        recipeName=recipe.name;
      recipeImageURL=recipe.imagePath;
      recipeDescription=recipe.description;
      if(recipe['ingredients']){
        for (let ingredant of recipe.ingredients) {
          recipeIngredients.push(new FormGroup({
              'name':new FormControl( ingredant.name,Validators.required),
              'amount':new FormControl( ingredant.amount,[Validators.required,Validators.pattern(/^[1-9][0-9]*$/)]),
          }));
        }
      }
      });
      //this.recipeService.getRecipe(this.id);
      
      
      
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName,Validators.required),
      'imagePath': new FormControl(recipeImageURL,Validators.required),
      'description': new FormControl(recipeDescription,Validators.required),
      'ingredients':recipeIngredients,
    })
  }
  onSubmit(){
    if(this.editMode){
      console.log({recipe: this.recipeForm.value,index: this.id});
      this.store.dispatch(new UpdateRecipe({recipe: this.recipeForm.value,index: this.id}))
      //this.recipeService.updateRecipe(this.id,this.recipeForm.value);
      
    }else{
      this.store.dispatch(new AddRecipe(this.recipeForm.value));
     // this.recipeService.addRecipe(this.recipeForm.value);
     
    }
    this.router.navigate(['../'],{relativeTo:this.route});
  }
  get controls() { 
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  addIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name':new FormControl(null,Validators.required),
      'amount':new FormControl(null,[Validators.required,Validators.pattern(/^[1-9][0-9]*$/)]),
     }));
  }

  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }
  onDeleteIngredient(index:number){
    
   (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

}
