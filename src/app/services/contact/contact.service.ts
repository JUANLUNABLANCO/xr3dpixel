import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';

// import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';


@Injectable()
export class ContactService {
  // esto aignifica que en produccion la baseurl es   https://www.avr3sdtudio.com
  // y en development es                              http://localhost:3000
  url = environment.baseUrl + '/api/contact/';

  constructor(private _http: Http) {
    console.log('servicio de contacto listo');
  }

  Enviar( contactMessage ) {
    contactMessage.form_control = 'client_contact';
    console.log('Enviando datos desde angular5 al servidor');
    console.log(contactMessage);
    const params = JSON.stringify(contactMessage);
    const headers = new Headers({'Content-type': 'application/json'});

    return this._http.post(this.url, params, {headers})
            .pipe(map(res => res.json())).subscribe(); //  o .pipe(map(res => res.json()));
  }
}
