import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../Shared/ingredient.model';
import { AppState } from '../store/app.reducer';
import { StartEdit } from './store/shopping-list.action';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],

})
export class ShoppingListComponent implements OnInit,OnDestroy {

  private addIngSub: Subscription;
  ingredients : Observable<{ ingredients: Ingredient[] }>;
  constructor(private store:Store<AppState> ) { }
  filter:string='';
  

  ngOnInit(): void {
  
    this.ingredients=this.store.select('shoppingList');
    // this.ingredients=this.shoppingListService.getIngredients();
    // this.addIngSub= this.shoppingListService.ingredientsChange.subscribe(()=>{
    //   this.ingredients=this.shoppingListService.getIngredients();
    // }
    // );
  }

  onEdit(index: number){
     this.store.dispatch(new StartEdit(index));
    //this.shoppingListService.startEditing.next(index);
  }
  ngOnDestroy(): void {
    // if(this.addIngSub){
    //   this.addIngSub.unsubscribe();
    // }
  }
  
}
