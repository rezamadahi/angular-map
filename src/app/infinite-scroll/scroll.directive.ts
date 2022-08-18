import {Directive, OnInit, OnDestroy, Output, EventEmitter, NgZone} from '@angular/core';

@Directive({
  selector: '[appScroll]'
})
export class ScrollDirective implements OnInit , OnDestroy{

  @Output('appScroll') valueChange = new EventEmitter();
  constructor(private ngZone: NgZone) { }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.scroll , true);
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scroll, true);
  }

  scroll = (e: any): void => {
    if (e.target.scrollTop == e.target.scrollHeight - e.target.offsetHeight) {
      console.log('You reached the bottom!');
      this.valueChange.emit();
    }
  };

}
