import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector:'[appPlaceholder]'
})
export class PlacehodlerDircetive{

    constructor(public viewContainerRef:ViewContainerRef){  
    }

}