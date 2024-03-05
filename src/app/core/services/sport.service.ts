import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sport } from '../../shared/models/sport';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SportService {

  constructor(private http:HttpClient) { }

  getSports() {
    return this.http.get<Sport[]>(`${environment.apiUrl}/sports`);
  }
}
