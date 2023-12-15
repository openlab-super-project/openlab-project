import { Component, Inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GuildService, GuildDTO } from './guild.service';



@Component({
  selector: 'app-guilddescription',
  templateUrl: './guilddescription.component.html',
  styleUrls: ['./guilddescription.component.css']
})
export class GuildescriptionComponent implements OnInit {

  guildId: number;
  currentGuildId: number;

  guildInfo = signal<GuildDTO>(undefined);
  memberNames: string[] = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
    if (!this.guildId) {
      console.warn('User is not in a guild. Leave operation aborted.');
    } else {
      this.guildService.leaveGuild(this.guildId).subscribe(
        result => {
          console.log('Left the guild successfully');
          this.guildId = null; // Update the guildId property to null
          console.log('guildId set to null:', this.guildId);
        },
        error => {
          console.error('Error leaving the guild', error);
        }
      );
    }
  }
  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    this.guildId = Number(routeParams.get('guildId'));

    this.guildService.getGuildInfo(this.guildId).subscribe(result => { this.guildInfo.set(result) }, error => console.error(error));
  }
  public navigateBack() {
    this.router.navigate(['/guild']);
  }
}
