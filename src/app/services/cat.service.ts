import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cat } from '../models/cat.model';

const apiURL = 'https://api.thecatapi.com/v1/';
const apiKEY = 'd4776631-5860-4dc9-b714-6ffa29cf4bf9';
@Injectable({
  providedIn: 'root'
})
export class CatService {

  constructor(private http: HttpClient) { }

  getCat(nome: string): Observable<Cat[]> {
    return this.http.get<Cat[]>(apiURL + "breeds/search?q=" + nome);
  }

  getCats(): Observable<Cat[]> {
    return this.http.get<Cat[]>(apiURL + "breeds/");
  }
}
