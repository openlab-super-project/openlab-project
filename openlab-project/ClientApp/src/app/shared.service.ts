import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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

  constructor() { }

  changeGuildInfo(guildInfo: GuildInfo) {
    this.guildInfoSource.next(guildInfo);
  }

  changeGuildId(guildId: number) {
    this.guildIdSource.next(guildId);
  }

  changeGuildMemberNames(memberNames: string[]) {
    this.memberNamesSource.next(memberNames);
  }

}
export interface GuildInfo {
  guildName: string;
  description: string;
  memberNames: string[]; 
}
