import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GuildService {
  private apiUrl = '';

  constructor(private http: HttpClient) { }

  updateGuildId(id: number, ): Observable<any> {
    const url = `${this.apiUrl}/updateGuildId/${id}`;
    return this.http.put(url, { guildid: });
  }
}

