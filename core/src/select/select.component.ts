import { Component, Input, Output, EventEmitter, OnChanges, OnInit, AfterContentInit } from '@angular/core';
import { _ } from 'underscore';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'select-box',
  template: `<span [formGroup]="formGroup">
                <select id="{{ id }}" [formControlName]="getName()" name="{{name}}" class="browser-default" [(ngModel)]="modelValue" (ngModelChange)="change($event)">
                    <option [value]="''">Selecione</option>
                    <option *ngFor="let option of options" [value]="option[key]">{{ option[optionValue.toString()] }}</option>
                </select>
            </span>`
})
export class SelectComponent implements OnChanges, OnInit, AfterContentInit {

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
  disabledSelect: boolean = false;

  @Input('showDefaultOption')
  showDefaultOption: boolean;

  @Input('formGroup')
  formGroup: FormGroup;

  @Input('name')
  name: any;

  @Input('required')
  required: boolean = false;

  @Output('onChange')
  onChange: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  modelValueChange: EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {}

  change(newValue) {
    this.modelValue = newValue;
    this.modelValueChange.emit(newValue);
    this.onChange.emit(newValue);
  }

  ngAfterContentInit() {
    let control = new FormControl();

    if (!this.formGroup) {
      this.formGroup = this.formBuilder.group({});
      this.formGroup.addControl('', control);
      this.checkSelectIsDisabled('');

    } else if (this.name) {
      this.formGroup.addControl(this.name, control);
      this.setValidators();
      this.checkSelectIsDisabled(this.name);
    }
  }

  getName() {
    return this.name || '';
  }

  checkSelectIsDisabled(controlName) {
    if (this.disabledSelect) {
      this.formGroup.controls[controlName].disable();
    } else {
      this.formGroup.controls[controlName].enable();
    }
  }

  setValidators() {
    if (this.required) {
      this.formGroup.controls[this.name].setValidators(Validators.required);
    }
  }

  ngOnChanges(changes: any): void {
    if (changes.options && changes.options.currentValue) {
      setTimeout(() => {
        if (this.modelValue) {
          $('#' + this.id).val(this.modelValue).attr('selected', 'selected');
        } else {
          $('#' + this.id + ' option:first').attr('selected', 'selected');
          this.change($('#' + this.id + ' option:first').val());
        }
      }, 0);
    }
  }
}
