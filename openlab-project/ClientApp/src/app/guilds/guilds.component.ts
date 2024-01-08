import { Component, NgModule, Inject, signal } from '@angular/core';
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
  dbGuild = signal < GuildDTO > (undefined);

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private router: Router, private Http: HttpClient, private createGuildService: CreateGuildService) {
    http.get<GuildDTO[]>(baseUrl + 'guild').subscribe(result => {
      this.GuildData = result;
      /*this.dbGuild.set(guild => {
        const guildDTO: GuildDTO = guild as GuildDTO;
        this.GuildData.push(guildDTO);
      });*/
    }, error => console.error(error));
  }
  deleteGuild(guildId: number) {
    this.createGuildService.deleteGuild(guildId).subscribe(
      () => {
        const index = this.GuildData.findIndex(guild => guild.guildId === guildId);
        if (index !== -1) {
          this.GuildData.splice(index, 1);
        }
      },
      error => console.error(error)
    );
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
