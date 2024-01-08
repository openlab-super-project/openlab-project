import { Component, Inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { CreateGuildService } from '../create-guild/create-guild.service';

@Component({
  standalone: true,
  selector: 'app-create-guild',
  templateUrl: './create-guild.component.html',
  styleUrls: ['./create-guild.component.css'],
  imports: [ReactiveFormsModule]
})
export class CreateGuildComponent {
  
  constructor(private router: Router, @Inject('BASE_URL') private apiUrl: string, private createGuildService: CreateGuildService) { }
  GuildForm = new FormGroup({
    guildname: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    maxmembers: new FormControl(0, Validators.min(1))
  });
  onSubmit() {
    console.log(this.GuildForm.value);
    if (this.GuildForm.valid) {
      let guildnameBE: string; let descriptionBE: string; let maxmembersBE: number;
      guildnameBE = this.GuildForm.value.guildname;
      descriptionBE = this.GuildForm.value.description;
      maxmembersBE = this.GuildForm.value.maxmembers;
      this.createGuildService.createGuild(guildnameBE, descriptionBE, maxmembersBE).subscribe();

      this.router.navigate(['/guild']).then(() => {
        window.location.reload(); 
      });
    }
  }
}
export interface GuildDTO {
  description: string;
  guildName: string;
  maxMembers: number;
}
