import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  guild: string = "nothing"
  xp: number = 0;

  public UserData: UserDTO;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<UserDTO>(baseUrl + 'user').subscribe(
      (result) => {
        this.UserData = result;
        this.xp = result.xp;
        this.guild = result.guild;
      },
      (error) => console.error(error)
    );
  }
}
interface UserDTO {
  xp: number;
  guild: string;
}
