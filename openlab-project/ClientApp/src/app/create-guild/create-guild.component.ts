import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-guild',
  templateUrl: './create-guild.component.html',
  styleUrls: ['./create-guild.component.css']
})
export class CreateGuildComponent {
  constructor(private router: Router) { }
  
  getValue(guildNameFE: string, descriptionFE: string, maxmembersFE: string) {
    let maxMembersNum: number;
    maxMembersNum = parseInt(maxmembersFE, 10);
    console.log("User created a guild with these parameters:\n" + guildNameFE + "\n" + descriptionFE + "\n" + maxMembersNum);
    this.router.navigate(['/guild']);
  }
}
export interface GuildDTO {
  description: string;
  guildName: string;
  maxMembers: number;
}
