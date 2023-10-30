import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable({
  providedIn: 'root'
})
export class ServicesrqService {
  private baseUserApi = 'http://localhost:8080/login/';
  constructor(private http: HttpClient) { }

  userValiation(obj:any): Observable<any> {
    // console.log("hi this is servie..",obj);
    return this.http.post<any>(this.baseUserApi+"validate-user",obj, httpOptions);
  }

  
  userRegistration(obj:any): Observable<any> {
    // console.log("hi this is Registration..",obj);
    return this.http.post<any>(this.baseUserApi+"registration",obj, httpOptions);
  }
}
