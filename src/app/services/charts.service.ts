import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { comment } from 'app/Models/Comment';
import { Observable } from 'rxjs';

const apiKey = 'coinrankingc032026f93e3b94c047c89523ca837327c4dac81e1070686';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ChartsService {
  private baseUrl = 'http://127.0.0.1:8000/statistics';
  private baseUrl2 = 'http://127.0.0.1:8000/get_all_comments';
  private baseUrl3 = 'http://127.0.0.1:8000/retrieve_comments'
  private baseUrl4 = 'http://127.0.0.1:8000/delete_comment?_id=';

  constructor(private http: HttpClient) {}

  cryptoData(a,b) {
    const url = this.baseUrl+'?from_date='+a+"&to_date="+b;
    console.log(url);
    return this.http.get(url,httpOptions);
  }
  
  AllData(){
    const url = this.baseUrl2;
    console.log(url);
    return this.http.get(url,httpOptions);
  }
  retrieve_comments():Observable<comment[]> {
    const url = this.baseUrl3;
    console.log(url);
    return this.http.get<comment[]>(url,httpOptions);
  }
  
  delete_comment(id:any): Observable<any>{
    const url = this.baseUrl4 +id ;
    return this.http.delete(url,httpOptions);
  }

}