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
  private baseUrl5 = 'http://127.0.0.1:8000/add_comment';
  private baseUrl6= 'http://127.0.0.1:8000/update_comment?id=';
  private baseUrl7= 'http://127.0.0.1:8000/sentiment_detector?texte=';



  
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
  add_data(data:any){
    const url = this.baseUrl5 ;
    return this.http.post(url,data,httpOptions);
  }
  update_data(id:any,data:any){
    const url = this.baseUrl6+id ;
    return this.http.put(url,data,httpOptions);
  }
  predict(text:any){
    const url = this.baseUrl7+text;
    return this.http.post(url,text,httpOptions);
  }

}