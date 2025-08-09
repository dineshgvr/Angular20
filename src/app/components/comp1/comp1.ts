import {Component, effect, inject, resource, signal} from '@angular/core';
import {rxResource, toObservable, toSignal} from '@angular/core/rxjs-interop';
import {HttpClient, httpResource} from '@angular/common/http';
import {debounceTime, of, pipe} from 'rxjs';
import {JsonPipe} from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormField, MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@Component({
  selector: 'app-comp1',
  imports: [
    MatFormField,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './comp1.html',
  styleUrl: './comp1.css'
})
export class Comp1 {
  private http = inject(HttpClient);
  search = signal<string>('');
  autoComplete = signal('')

  debounceTime = toSignal(toObservable(this.search).pipe(
    debounceTime(1000)
  ));

  autoCompleteSignal = toSignal(toObservable(this.autoComplete).pipe(
    debounceTime(500)
  ))


  // private btnClicked = signal<boolean>(false);
  //
  // data = rxResource({
  //   params: (() => ({isClicked: this.btnClicked()})),
  //   stream: ({params}) => {
  //     debugger
  //     if (params?.isClicked) {
  //       return this.http.get(`https://jsonplaceholder.typicode.com/users`);
  //     }
  //     return of(null);
  //   },
  //   defaultValue: null
  // });


  // searchList$ = resource<any, {search: string}>(
  //   {
  //     params: () => ({search: this.search()}),
  //     loader: async ({params}) => {
  //       if (params.search != '') {
  //         const result = await fetch('https://jsonplaceholder.typicode.com/users');
  //         return await result.json();
  //       }
  //     }
  //   }
  // )

  //
  // searchList$ = rxResource(
  //   {
  //     params: () => ({search: this.debounceTime()}),
  //     stream: ({params}) => {
  //       if (params.search) {
  //          return this.http.get('https://jsonplaceholder.typicode.com/users')
  //       }
  //       return of(null)
  //     }
  //   }
  // )


  // http Resource
  // searchList$ = httpResource<any>(() => ({
  //   url: '',
  //   method: ''
  // }));


  autoCompleteSignal$ = httpResource<any>(() => {
    return this.autoCompleteSignal() ? `https://jsonplaceholder.typicode.com/posts/${this.autoCompleteSignal()}` : undefined
  });


  constructor() {
    effect(() => {
      console.log(this.search())
    });

  }


  onChangeEvent(event: any) {
    this.autoComplete.set(event);
  }


}
