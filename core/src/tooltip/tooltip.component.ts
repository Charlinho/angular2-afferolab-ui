import { Component, Input, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'tooltip',
  template: `<span id="{{id}}" [ngClass]="ngClass" class="tooltipped"></span>`
})

export class TooltipComponent implements AfterViewInit {

  @Input('text')
  text: string;

  @Input('delay')
  delay: number;

  @Input('position')
  position: string;

  @Input('ngClass')
  ngClass: string;

  @Input('id')
  id: string;

  ngAfterViewInit() {
    $('#' + this.id).tooltip({
      delay: this.delay,
      tooltip: this.text,
      position: this.position
    });
  }
}
