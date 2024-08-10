// Serviço que comunica com a API por meio do Http e seus métodos

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentInterface } from './student-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  // endpoint/path que representa o servidor.
  // hoje: localhost 
  // com spring boot localhost/4000
  // no servidor: wwww.api-marvel.test.com
  apiURL = 'http://localhost:3000/students';

  // chamar o http no construtor para ser parte acessivel da classe 
  constructor(private http: HttpClient) { }


  public getAll(): Observable<StudentInterface[]> {
    return this.http.get<StudentInterface[]>(this.apiURL);
  }

  public save(newStudent: StudentInterface): Observable<StudentInterface> {
    return this.http.post<StudentInterface>(this.apiURL, newStudent);
  }

  public update(updateStudent: StudentInterface): Observable<StudentInterface> {
    return this.http.put<StudentInterface>(this.apiURL + '/' + updateStudent.id, updateStudent);
  }
  // removeStudent: StudentInterface -> id:number
  public remove(removeStudent: StudentInterface) {
    // this.apiURL+'/'+id
    console.log('entrou no remove');
    return this.http.delete(this.apiURL + '/' + removeStudent.id);
  }
}
