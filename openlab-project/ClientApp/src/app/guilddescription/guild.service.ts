import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GuildService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private apiUrl: string) { }

  joinGuild(guildId: number): Observable<any> {
    const url = `${this.apiUrl}/join`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, { guildId: guildId }, { headers });
  }
  leaveGuild(guildId: number): Observable<any> {
    const url = `${this.apiUrl}guild/leave/${guildId}`;
    return this.http.delete(url).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error leaving the guild', error);
        return throwError(error);
      })
    );
  }
  getGuildInfo(guildId: number): Observable<GuildDTO> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("guildId", guildId);

    return this.http.get<GuildDTO>(this.apiUrl + 'guild/getGuildInfo', { params: queryParams });
  }
}
export interface GuildDTO {
  memberNames: any;
  guildName: string;
  guildId: number;
  description: string;
  maxMembersCount: number;
  membersCount: number;
}
