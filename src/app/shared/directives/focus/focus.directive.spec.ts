import { FocusDirective } from './focus.directive';
import { TestBed, async, inject } from '@angular/core/testing';
import { ElementRef, Renderer2 } from '@angular/core';
describe('FocusDirective', () => {
  it('should create an instance', async(inject([ElementRef, Renderer2], (elementRef, renderer2) => {
    const directive = new FocusDirective(elementRef, renderer2);
    expect(directive).toBeTruthy();
  })));
});
