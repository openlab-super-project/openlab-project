import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-create-guild',
  templateUrl: './create-guild.component.html',
  styleUrls: ['./create-guild.component.css'],
  imports: [ReactiveFormsModule]
})
export class CreateGuildComponent {
  constructor(private router: Router) { }
  GuildForm = new FormGroup({
    guildname: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    maxmembers: new FormControl('', Validators.required)
  });
  onSubmit() {
    console.log(this.GuildForm.value);
    this.router.navigate(['/createguild']);
  }
}
export interface GuildDTO {
  description: string;
  guildName: string;
  maxMembers: number;
}
