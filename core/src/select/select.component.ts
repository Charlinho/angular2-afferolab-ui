import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { _ } from 'underscore';

@Component({
  selector: 'select-box',
  template: `<select id="{{ id }}" class="browser-default" [(ngModel)]="modelValue" (ngModelChange)="change($event)" [disabled]="disabledSelect">
                <option *ngFor="let option of options" [value]="option[key]">{{ option[optionValue] }}</option>
              </select>`
})
export class SelectComponent implements OnChanges {

  public id: string = _.uniqueId();

  @Input('modelValue')
  modelValue: string;

  @Input('options')
  options: Array<any>;

  @Input('optionValue')
  optionValue: string;

  @Input('key')
  key: any;

  @Input('disabledSelect')
  disabledSelect: boolean;

  @Output('onChange')
  onChange: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  modelValueChange: EventEmitter<any> = new EventEmitter();

  change(newValue) {
    this.modelValue = newValue;
    this.modelValueChange.emit(newValue);
    this.onChange.emit(newValue);
  }

  ngOnChanges(changes: any): void {
    if (changes.options && changes.options.currentValue) {
      setTimeout(() => {
        if (_.isUndefined(this.modelValue)) {
          $('#' + this.id + ' option:first').attr('selected', 'selected');
          this.change($('#' + this.id + ' option:first').val());
        } else {
          $('#' + this.id).val(this.modelValue).attr('selected', 'selected');
        }
      }, 0);
    }
  }
}