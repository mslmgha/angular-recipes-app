import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHightlight]'
})
export class BetterHightlightDirective implements OnInit {
  @Input() defaultColor:string='transparent';
  @Input('appBetterHightlight') hightlightColor:string='blue';
  @HostBinding('style.backgroundColor') backgroundColor:string;

  constructor(private elRef:ElementRef, private renderer: Renderer2) {


  }
  ngOnInit(): void {
    this.backgroundColor= this.defaultColor;
   // this.renderer.setStyle(this.elRef.nativeElement,'background-color','blue');
  }

  @HostListener('mouseenter') mouseover(eventData: Event){
    //this.renderer.setStyle(this.elRef.nativeElement,'background-color','blue');
   // this.backgroundColor='blue';
   this.backgroundColor= this.hightlightColor;
  }

  @HostListener('mouseleave') mouseleave(eventData: Event){
   //this.renderer.setStyle(this.elRef.nativeElement,'background-color','transparent');
    //this.backgroundColor='transparent';
    this.backgroundColor= this.defaultColor;
  }

}
