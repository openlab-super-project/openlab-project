import { Component, NgModule, Inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

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
  description: string;
  maxMembersCount: number;
  membersCount: number;
}
@NgModule({
  declarations: [GuildComponent], 
  imports: [BrowserModule, HttpClientModule],
  bootstrap: [GuildComponent]
})

export class AppModule{ }
