import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateGuildService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private apiUrl: string) { }

  createGuild(guildnameBE: string, descriptionBE: string, maxmembersBE: number) {
    const url = `${this.apiUrl}guild/create`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(url, { guildnameBE, descriptionBE, maxmembersBE }, { headers });
  }
  deleteGuild() {

  }
}
