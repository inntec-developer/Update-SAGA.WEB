import { Directive, ElementRef, Inject, Input, Renderer2, OnInit, OnChanges } from '@angular/core';

@Directive({
  selector: '[focus]'
})
export class FocusDirective implements OnInit, OnChanges {
  constructor(@Inject(ElementRef) private element: ElementRef, public renderer: Renderer2) {

  }
  ngOnInit() {
    this.renderer.selectRootElement(this.element['nativeElement']).focus();
  }

  public ngOnChanges() {
    this.element.nativeElement.focus();
  }

}
