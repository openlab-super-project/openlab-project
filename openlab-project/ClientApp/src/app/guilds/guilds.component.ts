
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

  public GuildData: GuildInformation[] = [];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<GuildInformation[]>(baseUrl + 'Guild').subscribe(result => {
      this.GuildData = result;

    }, error => console.error(error));




  }
}

interface GuildInformation {
  guildName: string;
  GuildId: number;
  Description: string;
  MaxMembersCount: number;
  MembersCount: number;

}

