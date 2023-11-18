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
  guildInfo: GuildInfo = { guildName: '', description: '' };


  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.guildId = +this.route.snapshot.params['guildId'];

    this.sharedService.currentGuildInfo.subscribe(
      (guildInfo) => (this.guildInfo = guildInfo)
    );
    
  }
}
