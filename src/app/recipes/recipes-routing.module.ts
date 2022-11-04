import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGaud } from "../authentication/auth.guard";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeResovlerService } from "./recipe-resolver.service";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes.component";

const appRouts: Routes = [
    {
        path: '', component: RecipesComponent, canActivate: [AuthGaud], children: [
            { path: 'new', component: RecipeEditComponent },
            { path: ':id', component: RecipeDetailComponent, resolve: [RecipeResovlerService] },
            { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResovlerService] },
        ]
    },]
@NgModule({
    imports: [
        RouterModule.forChild(appRouts),
    ],
    exports: [RouterModule],
})
export class RecipesRoutingModule {

}