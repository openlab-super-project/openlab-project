import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService, GuildInfo } from '../shared.service';


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


  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedService
  ) { }

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
}
