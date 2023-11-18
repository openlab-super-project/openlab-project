import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})

export class SharedService {
  
  private guildInfoSource = new BehaviorSubject<GuildInfo>({ guildName: '', description: '' });
  currentGuildInfo = this.guildInfoSource.asObservable();

  constructor() { }

  changeGuildInfo(guildInfo : GuildInfo) {
    this.guildInfoSource.next(guildInfo);
  }
}
export interface GuildInfo {
  guildName: string;
  description: string;
}
