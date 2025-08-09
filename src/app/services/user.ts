import {inject, Injectable, resource, ResourceRef} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map, Observable} from 'rxjs';
import {ICountry} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class User {
  private http = inject(HttpClient);

  getAllCountries(): Observable<ICountry[]> {
    return this.http.get<ICountry[]>('https://dummyjson.com/products').pipe(map((p: any) => p.products));
  }

}
