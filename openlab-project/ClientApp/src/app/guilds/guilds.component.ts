
import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-guild',
  templateUrl: './guilds.component.html',
  styleUrls: ['./guilds.component.css']
})


export class GuildComponent {

  guildName: string = "no data";
  Description: string = "no data";
  MaxMembersCount: number = 0;
  MembersCount: number = 0;

  public GuildData: GuildInfo[] = [];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<GuildInfo[]>(baseUrl + 'guild').subscribe(result => {
      this.GuildData = result;

    }, error => console.error(error));




  }
}

interface GuildInfo {
  guildName: string;
  GuildId: number;
  Description: string;
  MaxMembersCount: number;
  MembersCount: number;

}

