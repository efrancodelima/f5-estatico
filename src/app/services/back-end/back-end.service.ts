import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Arquivo } from '../../interfaces/arquivo';

@Injectable({
  providedIn: 'root'
})
export class BackEndService {

  // Construtor
  constructor(private http: HttpClient) { }

  // Métodos públicos
  enviarVideos(requisicao: FormData): Observable<void> {

    const url = 'http://localhost:8080/video/upload';
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<any>(url, requisicao, { headers });
  }

  listarVideos(): Observable<Arquivo[]> {

    const url = 'http://localhost:8080/video/listar';
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(url, { headers });
  }

  private getToken(): string | null {
    return sessionStorage.getItem('tokenJWT');
  }
}
