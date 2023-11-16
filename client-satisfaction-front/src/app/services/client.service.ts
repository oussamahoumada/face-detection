import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private corsHeaders: HttpHeaders;
  constructor(private http: HttpClient) {
    this.corsHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Accept: 'application/json',
      withCredentials: 'true',
    });
  }

  readonly path = 'http://localhost:5000/API/';

  uploadImage(fl: any, flName: string): Observable<any> {
    return this.http.post(
      this.path + 'image',
      {
        file: fl,
        fileName: flName,
      },
      {
        headers: this.corsHeaders,
      }
    );
  }

  downloadImage(): Observable<any> {
    return this.http.get(this.path + 'image');
  }

  getClient(): Observable<any> {
    return this.http.get(this.path + 'client');
  }

  addClient(body: any): Observable<any> {
    let client_to_add = {
      name: body.name,
      mail: body.mail,
      image: body.image,
      discount: body.discount,
      Satisfaction: body.Satisfaction,
      dateNaissance: body.dateNaissance,
    };
    return this.http.post(this.path + 'client', body, {
      headers: this.corsHeaders,
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
    return this.http.put(this.path + 'client/' + id, date_for_update, {
      headers: this.corsHeaders,
    });
  }

  deleteClient(id: any): Observable<any> {
    return this.http.delete(this.path + 'client/' + id, {
      headers: this.corsHeaders,
    });
  }
}
