import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarjeta } from '../Interface/tarjeta';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  private apiUrl = 'http://localhost:3003/tarjetas';

  constructor(private http: HttpClient) {}

  obtenerTarjetas(): Observable<Tarjeta[]> {
    return this.http.get<Tarjeta[]>(this.apiUrl);
  }

  validarTarjeta(datos: Partial<Tarjeta>): Observable<Tarjeta[]> {
    const { numeroTarjeta, fechaExpiracion, cvv } = datos;
    return this.http.get<Tarjeta[]>(`${this.apiUrl}?numeroTarjeta=${numeroTarjeta}&fechaExpiracion=${fechaExpiracion}&cvv=${cvv}`);
  }
}