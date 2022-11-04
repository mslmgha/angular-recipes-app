import { Ingredient } from "../../Shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.action";

export interface State {
    ingredients: Ingredient[],
    editedIngredient:Ingredient,
    editedIndex:number
}

const initialState:State ={
    ingredients: [
        new Ingredient('Apples', 15),
        new Ingredient('Tomato', 20),
    ],
    editedIngredient:null,
    editedIndex:-1
};


export function shoppinListReducre(state:State = initialState, action: ShoppingListActions.ShoppingListActionTypes) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients,action.payload]
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients,...action.payload]
            };
        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter( (ing,ingIndex)=>{ 
                    return ingIndex!= state.editedIndex;
                }),
                editedIngredient:null,
                editedIndex: -1,
            };
        case ShoppingListActions.UPDATE_INGREDIENT:
            const updatedIngredient = {
                ...state.editedIngredient,
                ...action.payload
            };
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIndex] = updatedIngredient;
            return {
                ...state,
                ingredients: updatedIngredients,
                editedIngredient:null,
                editedIndex: -1,
            };
        case ShoppingListActions.START_EDIT:
            return {
                ...state,
                editedIngredient:{...state.ingredients[action.payload]},
                editedIndex:action.payload,
            }; 
        case ShoppingListActions.STOP_EDIT:
                return {
                    ...state,
                    editedIngredient:null,
                    editedIndex: -1,
                };                    
        default:
            return state;
    }
}