import {Component, input, Input, OnChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {AbstractControl, ControlContainer, FormControl, FormGroupDirective, ReactiveFormsModule} from '@angular/forms';
import {FieldError} from '../../directive/field-error';

@Component({
  selector: 'app-input',
  imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, FieldError],
  templateUrl: './input.html',
  styleUrl: './input.css',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class InputField implements OnChanges{
  @Input() public inputOptions!: InputModel
  @Input() public control!: any;

  ngOnChanges() {

  }
}
