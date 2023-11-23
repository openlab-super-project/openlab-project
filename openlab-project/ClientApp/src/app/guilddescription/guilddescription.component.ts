import { Component,Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService, GuildInfo } from '../shared.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-guilddescription',
  templateUrl: './guilddescription.component.html',
  styleUrls: ['./guilddescription.component.css']
})
export class GuildescriptionComponent {
  guildId: number;
  guildInfo: GuildInfo = {
      guildName: '', description: '',
      memberNames: []
  };
  memberNames: string[] = [];
  http: HttpClient;
  @Inject('BASE_URL') baseUrl: string;


  constructor(
    private route: Router,
    private sharedService: SharedService
  ) { }

  joinGuild(guildId: number) {
    this.http.post(this.baseUrl + 'guild/join', { guildId }).subscribe(result => {
      console.log('Joined guild successfully', guildId);
    }, error => {
      console.error('Error joining guild', error);
    });
  }
  ngOnInit() {
    this.sharedService.currentGuildId.subscribe(
      (guildId) => (this.guildId = guildId)
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
