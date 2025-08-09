import {Component, computed, effect, inject, ResourceRef, signal} from '@angular/core';
import {
  FormsModule, NgSelectOption, ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FieldError} from './directive/field-error';
import {MatSelectModule} from '@angular/material/select';
import {InputField} from './shared/input/input';
import {JsonPipe} from '@angular/common';
import {Comp1} from './components/comp1/comp1';
import {Header} from './shared/header/header';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, FormsModule, MatFormFieldModule, MatButtonModule, MatDividerModule, MatInputModule, MatIconModule, ReactiveFormsModule, FieldError, MatSelectModule, InputField, JsonPipe, Comp1, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  userForm !: UntypedFormGroup;

  textFieldOptions: InputModel[] = [
    {
      label: 'First Name',
      control: 'text',
      name: 'firstName',
      placeholder: 'Enter Your First Name',
      required: true,
    }, {
      label: 'Last Name',
      control: 'text',
      name: 'lastName',
      placeholder: 'Enter Your last Name',
      required: true,
    }, {
      label: 'Age',
      control: 'number',
      name: 'age',
      placeholder: 'Enter Your Age',
      required: false,
    }
  ]

  constructor(private formBuilder: UntypedFormBuilder) {
   this.userForm = this.formBuilder.group({
      firstName: new UntypedFormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(15)]),
      lastName: new UntypedFormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      age: new UntypedFormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    console.log('submitted', this.userForm.value);
  }
}
