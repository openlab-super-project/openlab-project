import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GuildService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  // getGuildDetail() vrati guild info

  joinGuild(guildId: number): Observable<any> {
    const url = `${this.baseUrl}/join`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, { guildId: guildId }, { headers });
  }
  leaveGuild(guildId: number): Observable<any> {
    const url = `${this.baseUrl}/leave/${guildId}`;
    return this.http.post(url, {});
  }
}
