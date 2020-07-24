import {
  Directive,
  Input,
  HostBinding,
  ElementRef,
  OnChanges,
  OnInit,
} from '@angular/core';
enum CardType {
  VISA = 'visa',
  MASTERCARD = 'mastercard',
  AMERICAN_EXPRESS = 'american-express',
  UNKNOWN = 'unknown',
}
@Directive({
  selector: '[CoverFlow]',
})
export class CoverflowDirectiveDirective implements OnChanges, OnInit {
  @HostBinding('value')
  input;

  @Input()
  data: string;
  el;
  constructor(elr: ElementRef) {
    this.el = elr;
  }

  ngOnInit() {
    this.el.nativeElement.style.background = 'red';
    this.el.nativeElement.value = 'red';
    console.log(this.data);
    this.input = 'hello';
  }
  ngOnChanges() {}

  getCardTypeFromNumber(): CardType {
    if (this.data) {
      if (this.data.startsWith('37')) {
        return CardType.AMERICAN_EXPRESS;
      } else if (this.data.startsWith('4')) {
        return CardType.VISA;
      } else if (this.data.startsWith('5')) {
        return CardType.MASTERCARD;
      }
    }
    return CardType.UNKNOWN;
  }
}
