import { Component, NgModule, Inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CreateGuildService } from '../create-guild/create-guild.service';

@Component({
  selector: 'app-guild',
  templateUrl: './guilds.component.html',
  styleUrls: ['./guilds.component.css']
})


export class GuildComponent {

  guildName: string = "no guildname";
  Description: string = "no description";
  MaxMembersCount: number = 0;
  MembersCount: number = 0;

  public GuildData: GuildDTO[] = [];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private router: Router, private Http: HttpClient, private createGuildService: CreateGuildService) {
    http.get<GuildDTO[]>(baseUrl + 'guild').subscribe(result => {
      this.GuildData = result;

    }, error => console.error(error));
  }
  deleteGuild(guildId: number) {
    this.createGuildService.deleteGuild(guildId).subscribe();
    window.location.reload();
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

export class AppModule { }
