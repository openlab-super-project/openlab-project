import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private guildInfoSource = new BehaviorSubject<GuildInfo>({ guildName: '', description: '', memberNames: [] });
  currentGuildInfo = this.guildInfoSource.asObservable();

  private guildIdSource = new BehaviorSubject<number>(0);
  currentGuildId = this.guildIdSource.asObservable();

  private memberNamesSource = new BehaviorSubject<string[]>([]);
  currentGuildMemberNames = this.memberNamesSource.asObservable();

  constructor(private http: HttpClient) {
    this.initializeService();
  }

  private initializeService(): void {
    const storedGuildId = this.getStoredGuildId();
    this.guildIdSource.next(storedGuildId);

    if (storedGuildId) {
      const storedGuildInfo = JSON.parse(localStorage.getItem('currentGuildInfo'));
      if (storedGuildInfo) {
        this.changeGuildInfo(storedGuildInfo);
      }

      const storedMemberNames = JSON.parse(localStorage.getItem('currentMemberNames'));
      if (storedMemberNames) {
        this.changeGuildMemberNames(storedMemberNames);
      }

      this.loadGuildData(storedGuildId);
    }
  }
  private loadGuildData(guildId: number): void {
    this.http.get<GuildInfo>(`https://localhost:44442/api/guild/${guildId}`).subscribe(
      (guildData) => {
        this.changeGuildInfo(guildData);
      },
      (error) => {
        console.error('Error loading guild data', error);
      }
    );
  }

  private getStoredGuildId(): number {
    const storedGuildId = localStorage.getItem('currentGuildId');
    return storedGuildId ? +storedGuildId : 0;
  }

  changeGuildInfo(guildInfo: GuildInfo): void {
    this.guildInfoSource.next(guildInfo);
    // Persist guild information in local storage
    localStorage.setItem('currentGuildInfo', JSON.stringify(guildInfo));
  }

  changeGuildId(guildId: number): void {
    this.guildIdSource.next(guildId);
    localStorage.setItem('currentGuildId', guildId.toString());
    this.loadGuildData(guildId);
  }

  changeGuildMemberNames(memberNames: string[]): void {
    this.memberNamesSource.next(memberNames);
    localStorage.setItem('currentMemberNames', JSON.stringify(memberNames));
  }
}
export interface GuildInfo {
  guildName: string;
  description: string;
  memberNames: string[];
}
