import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Student} from '../interfaces/student.interface';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private URL = 'http://localhost:8080/api/v1/student';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.URL);
  }

  getStudent(id: number): Observable<Student> {
    const url = `${this.URL}/${id}`;
    return this.http.get<Student>(url);
  }
  updateStudent(student: Student): Observable<Student> {
    const url = `${this.URL}/${student.id}`;
    return this.http.put<Student>(url, student, this.httpOptions);
  }

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.URL, student, this.httpOptions);
  }

  deleteStudent(student: Student): Observable<Student> {
    const url = `${this.URL}/${student.id}`;
    return this.http.delete<Student>(url, this.httpOptions);
  }


}
