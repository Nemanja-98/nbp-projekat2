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

  postInvoice(invoice: Invoice, username: string | null): Observable<any>{

    return this.http.post(this.url + "AddInvoice/" + username, invoice, {headers: environment.httpOptions.headers, responseType: "text"})
  }

  getMyInvoices(username: string | null): Observable<Invoice[]>{

    const urlGetMyInvoices = this.url + "GetInvoices/" + username;
    return this.http.get<Invoice[]>(urlGetMyInvoices, environment.httpOptions);
  }

  deleteInvoice(username: string | null, buyerName: string, productName: string): Observable<any>{
    const urlDeleteInvoice = this.url + "DeleteInvoice/" + username + "/" + buyerName + "/" + productName;
    return this.http.delete(urlDeleteInvoice, {headers: environment.httpOptions.headers, responseType: "text"})
  }
}
