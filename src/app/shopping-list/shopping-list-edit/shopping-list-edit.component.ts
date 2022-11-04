import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/Shared/ingredient.model';
import { AppState } from 'src/app/store/app.reducer';
import { AddIngredient, DeleteIngredient, StopEdit, UpdateIngredient } from '../store/shopping-list.action';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css','../../Shared/shared-style.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('shoppingForm') shoppingForm: NgForm;

  editSubscription: Subscription;
  editMode:boolean= false;
  editedItemIndex: number;
  constructor( private store:Store<AppState>) { }
  ngOnDestroy(): void {
    this.editSubscription.unsubscribe();
    this.store.dispatch(new StopEdit());
  }
 
  ngOnInit(): void {
    this.editSubscription= this.store.select('shoppingList').subscribe(state=>{
       if(state.editedIndex>-1){
        this.editMode=true;
        this.editedItemIndex=state.editedIndex;
        this.shoppingForm.setValue({
          'name':state.editedIngredient.name,
          'amount':state.editedIngredient.amount
        })
       }else{
          this.editMode=false;
       }
    });
    // this.editSubscription= this.shoppingListService.startEditing.subscribe(
    //   (index)=>{
    //     this.editMode=true;
    //     this.editedItemIndex=index;
    //     const editedItem:Ingredient= this.shoppingListService.getIngredient(index)
    //     this.shoppingForm.setValue({
    //       'name':editedItem.name,
    //       'amount':editedItem.amount
    //     })
    //   }
    // );
  }

  onSubmit(){
    const ingredient =new Ingredient(this.shoppingForm.value.name,this.shoppingForm.value.amount);
    if(this.editMode){
      this.editMode=false;
      const index= this.editedItemIndex;
      this.store.dispatch(new UpdateIngredient(ingredient));
      //this.shoppingListService.updateIngredient(this.editedItemIndex,ingredient);
    }else{
     
      this.store.dispatch(new AddIngredient(ingredient));
     // this.shoppingListService.addIngredient(ingredient);
    }
    this.shoppingForm.reset();
  }
  onClear(){
    this.store.dispatch(new StopEdit());
    this.shoppingForm.reset();
    this.editMode=false;
  }
  onDelete(){
    if(this.editMode){
      this.editMode=false;
      this.store.dispatch(new DeleteIngredient());
      //this.shoppingListService.deleteIngredient(this.editedItemIndex);
    }
    this.shoppingForm.reset();
  }

}


