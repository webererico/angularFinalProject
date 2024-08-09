import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory } from './category-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  public getAll(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>('http://localhost:3000/categories');
  }

  public save(category: ICategory): Observable<ICategory> {
    return this.http.post<ICategory>('http://localhost:3000/categories', category);
  }
}
