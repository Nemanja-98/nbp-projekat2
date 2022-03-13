import { Injectable } from '@angular/core';
import { Invoice } from 'src/app/models/Invoice';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  url:string = environment.connectionString + "Invoice/";
  

  constructor(private http: HttpClient) { }

  postInvoice(invoice: Invoice, username: string): Observable<any>{

    return this.http.post(this.url + "AddInvoice/" + username, invoice, {headers: environment.httpOptions.headers, responseType: "text"})
  }

  getMyInvoices(username: string): Observable<Invoice[]>{

    const urlGetMyInvoices = this.url + "GetInvoices/" + username;
    return this.http.get<Invoice[]>(urlGetMyInvoices, environment.httpOptions);
  }
}
