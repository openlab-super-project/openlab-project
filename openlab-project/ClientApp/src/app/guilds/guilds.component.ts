import { Component, NgModule, Inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module'
import { GuildInfo, SharedService } from '../shared.service';

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

  public GuildData: GuildDTO[] = [];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private router: Router, private Http: HttpClient,
    private SharedService: SharedService) {
    http.get<GuildDTO[]>(baseUrl + 'guild').subscribe(result => {
      this.GuildData = result;

    }, error => console.error(error));
  }
  selectGuild(guild: GuildDTO) {
    const targetGuildId = guild.guildId;

    const guildInfo: GuildInfo = {
      guildName: guild.guildName,
      description: guild.description,
      memberNames: guild.memberNames
    };

    this.SharedService.changeGuildInfo(guildInfo);
    this.SharedService.changeGuildId(targetGuildId);
    this.SharedService.changeGuildMemberNames(guild.memberNames);
    this.SharedService.changeGuildName(guild.guildName);

    this.router.navigate(['guild', targetGuildId]);
  }

}
interface GuildDTO {
  memberNames: any;
  guildName: string;
  guildId: number;
  description: string;
  maxMembersCount: number;
  membersCount: number;
}
@NgModule({
  declarations: [GuildComponent],
  imports: [BrowserModule, HttpClientModule],
  bootstrap: [GuildComponent]
})

export class AppModule { }
