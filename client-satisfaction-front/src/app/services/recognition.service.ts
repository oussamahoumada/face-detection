import { Observable } from 'rxjs';
import emailjs from '@emailjs/browser';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { corsHeaders } from '../cors_validation/corsValidation';

@Injectable({
  providedIn: 'root',
})
export class RecognitionService {
  readonly path = 'http://localhost:5000/';

  constructor(private http: HttpClient) {}

  uploadImage(fl: any, flName: string): Observable<any> {
    return this.http.post(
      this.path + 'Recognition/',
      {
        file: fl,
        fileName: flName,
      },
      {
        headers: corsHeaders,
      }
    );
  }

  downloadImage(): Observable<any> {
    return this.http.get(this.path + 'Recognition/', {
      headers: corsHeaders,
    });
  }

  sent_mail(message: any) {
    emailjs.init('YuALHzuH1xaf2yD9X');
    emailjs.send('service_679tey9', 'template_le3lwoi', {
      from_name: 'oussama',
      client: message.client,
      satisfaction: message.satisfaction,
      discount: message.discount,
    });
  }
}
