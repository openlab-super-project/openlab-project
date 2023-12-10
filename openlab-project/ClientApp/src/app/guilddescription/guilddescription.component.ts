import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService, GuildInfo } from '../shared.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GuildService } from './guild.service';



@Component({
  selector: 'app-guilddescription',
  templateUrl: './guilddescription.component.html',
  styleUrls: ['./guilddescription.component.css']
})
export class GuildescriptionComponent implements OnInit {

  guildId: number;
  guildInfo: GuildInfo = {
    guildName: '', description: '',
    memberNames: []
  };
  memberNames: string[] = [];
  currentGuildId: number;


  constructor(
    private route: Router,
    private sharedService: SharedService,
    private http: HttpClient,
    private guildService: GuildService,
    @Inject('BASE_URL') private baseUrl: string
  ) { }

  joinGuild(guildId: number) {
    this.http.post(this.baseUrl + 'guild/join', { guildId: guildId }).subscribe(result => {
      console.log('Joined guild successfully', guildId);

    }, error => {
      console.error('Error joining guild', error);
    });
  }
  leaveGuild() {
    if (!this.currentGuildId) {
      console.warn('User is not in a guild. Leave operation aborted.');
    } else {
      this.guildService.leaveGuild(this.currentGuildId).subscribe(
        result => {
          console.log('Left the guild successfully');
        },
        error => {
          console.error('Error leaving the guild', error);
        }
      );
    }
  }

  ngOnInit() {
    this.sharedService.currentGuildId.subscribe(
      (guildId) => (this.guildId = guildId, this.currentGuildId = guildId)
    );

    this.sharedService.currentGuildInfo.subscribe(
      (guildInfo) => (this.guildInfo = guildInfo)
    );

    this.sharedService.currentGuildMemberNames.subscribe(
      (memberNames) => {
        this.memberNames = memberNames;
      }
    );
    this.sharedService.currentGuildId.subscribe(
      (guildId) => {
        this.guildId = guildId;
        this.sharedService.currentGuildMemberNames.subscribe(
          (memberNames) => {
            this.memberNames = memberNames;
          }
        );
      }
    );
  }
  public navigateBack() {
    this.route.navigate(['/guild']);
  }
}
