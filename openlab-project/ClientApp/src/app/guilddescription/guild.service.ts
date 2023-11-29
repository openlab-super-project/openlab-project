import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GuildService {
  private apiUrl = 'https://localhost:44442/api/guild';

  constructor(private http: HttpClient) { }

  joinGuild(guildId: number): Observable<any> {
    const url = `${this.apiUrl}/join`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, { guildId: guildId }, { headers });
  }
  leaveGuild(): Observable<any> {
    const url = `${this.apiUrl}/leave`;
    return this.http.post(url, {});
  }
}
