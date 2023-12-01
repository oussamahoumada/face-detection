import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { corsHeaders } from '../cors_validation/corsValidation';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  readonly path = 'http://localhost:5000/';

  constructor(private http: HttpClient) {}

  getClient(): Observable<any> {
    return this.http.get(this.path + 'Client/', {
      headers: corsHeaders,
    });
  }

  addClient(body: any): Observable<any> {
    return this.http.post(this.path + 'Client/', body, {
      headers: corsHeaders,
    });
  }

  updateClient(id: any, body: any): Observable<any> {
    let date_for_update = {
      name: body.name,
      mail: body.mail,
      image: body.image,
      discount: body.discount,
      Satisfaction: body.Satisfaction,
      dateNaissance: body.dateNaissance,
    };
    return this.http.put(this.path + 'Client/' + id, date_for_update, {
      headers: corsHeaders,
    });
  }

  deleteClient(ids: any): Observable<any> {
    let body: any = [];
    ids.forEach((element: any) => {
      body.push({ id: element });
    });
    return this.http.post(
      this.path + 'Client/delete',
      { ids: body },
      {
        headers: corsHeaders,
      }
    );
  }
}
