import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GuildService {
  private apiUrl = 'https://localhost:44442/';

  constructor(private http: HttpClient) { }

  updateGuildId(guildid: number, newGuildId: string): Observable<any> {
    const url = `${this.apiUrl}/update_guild/${guildid}`;
    return this.http.post(url, { new_guild_id: newGuildId });
  }
}
