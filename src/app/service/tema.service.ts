import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  constructor(private http: HttpClient) { }


  getAllTemas(): Observable<Tema[]> {
    return this.http.get<Tema[]>('https://backendgen.herokuapp.com/temas', this.token)
  }

  postTema(tema: Tema): Observable<Tema> {
    return this.http.post<Tema>('https://backendgen.herokuapp.com/temas', tema, this.token)
  }
}
