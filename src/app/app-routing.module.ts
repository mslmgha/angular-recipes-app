import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
const appRouts: Routes=
[
{ path:'',redirectTo:'recipes',pathMatch:'full'},
{ path:'recipes',
 loadChildren: ()=>import('./recipes/recipes.module').then(module=> module.RecipesModule)},
 { path:'shopping',
 loadChildren: ()=>import('./shopping-list/shopping-list.module').then(module=> module.ShoppingListModule)},
 { path:'auth',
 loadChildren: ()=>import('./authentication/authentication.module').then(module=> module.AuthenticationModule)},
// { path:'users',component:UsersComponent,children:[
//   { path:':id/:name',component:UserComponent},
// ]},

// { path:'servers',canActivateChild:[AuthGuard],component:ServersComponent ,children:[
//   { path:':id',component:ServerComponent,resolve:{server:ServerResolver}},  
//   { path:':id/edit',component:EditServerComponent,canDeactivate:[canDeactivateGurad]},  
// ]},
// //{ path:'not-found',component:PageNotFoundComponent},
// { path:'not-found',component:AppErrorComponent,data:{message:"Page not found!"}},
// { path:'**',redirectTo:'not-found'}//must be the last one ** for all others path 
];
@NgModule({
    imports: [
        RouterModule.forRoot(appRouts, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabledBlocking' })
        //RouterModule.forRoot(appRouts,{useHash:true;}), old web browser
      ],
      exports:[RouterModule],
})
export class AppRountingModule{

}