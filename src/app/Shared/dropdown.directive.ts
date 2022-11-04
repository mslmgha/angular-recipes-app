import { Directive ,ElementRef, HostBinding, HostListener, OnInit} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {

  @HostBinding('class.open') isOpen=false;
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elementRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
  //@HostBinding('classList') classList:DOMTokenList;
  constructor(private elementRef : ElementRef) { }
  ngOnInit(): void {

    //this.classList= this.elementRef.nativeElement.classList;
  }
  

  

}
