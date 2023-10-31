import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  dashboard: UserInfo = { guildName: '', xp: 0 }; // Initialize with default values

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<UserInfo>(baseUrl + 'user').subscribe(
      (result) => {
        this.dashboard = result;
      },
      (error) => console.error(error)
    );
  }
}
interface UserInfo {
  guildName: string;
  xp: number;
}
