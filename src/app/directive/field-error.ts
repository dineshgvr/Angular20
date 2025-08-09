import {AfterViewInit, Directive, ElementRef, inject} from '@angular/core';
import {MatFormField} from '@angular/material/input';

@Directive({
  selector: '[appFieldError]'
})
export class FieldError implements AfterViewInit {
    formField = inject(MatFormField);
    errorElement = inject(ElementRef);

  constructor() { }

  ngAfterViewInit() {
    const control = this.formField._formFieldControl.ngControl?.control;
    if(!control) {
      throw new Error('Invalid control');
    }

    control?.events.subscribe((w) => {
      const showErrors = control?.errors && (control.dirty || control.touched);
      if(showErrors) {
        const firstError: any = Object.keys(control.errors);
        const firstErrorValue = control?.errors[firstError[0]];
        if(firstError.length) {
          this.errorElement.nativeElement.textContent = this.extractErrors(firstError[0], firstErrorValue);
        } else {
          this.errorElement.nativeElement.textContent = '';
        }
      }
    })
  }

  extractErrors(error: string, errorValue: any) {
    let errorMessages: { [key: string]: string | ((errorValue: any) => string) } = {
      required: 'This field is required',
      minlength: (errorValue) => `Must be at least ${errorValue.requiredLength} characters`,
      maxlength: (errorValue) => `Must be at least ${errorValue.requiredLength} characters`,
      min: (errorValue) => `Must be at least ${errorValue}`,
      max: (errorValue) => `Must be less than ${errorValue}`,
    }
    const errorMessage: any = errorMessages[error];
    if (typeof errorMessage  == 'function') {
      return errorMessage(errorValue);
    }
    return errorMessage || '';
  }
}

