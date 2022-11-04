import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
    selector: '[appBasicHightlight]',
})

export class basicHightlightDirective implements OnInit {
    constructor(private  elementRef: ElementRef) {

    }
    ngOnInit() :void{
      this.elementRef.nativeElement.style.backgroundColor='green'
    }
}