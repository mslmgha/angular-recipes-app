import { Component, OnInit } from '@angular/core';
import { RecipeServiceService } from '../Services/recipe-service.service';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css','../Shared/shared-style.css'],
})
export class RecipesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }
  

}
