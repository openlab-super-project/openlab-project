import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { GuildescriptionComponent } from '../app/guilddescription/guilddescription.component'
import { GuildComponent } from '../app/guilds/guilds.component'
const routes: Routes = [
  { path: 'guild', component: GuildComponent },
  { path: 'guild-description', component: GuildescriptionComponent },
  { path: '', redirectTo: '/guild', pathMatch: 'full'}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
