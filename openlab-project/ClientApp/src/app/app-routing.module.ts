import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { GuildescriptionComponent } from '../app/guilddescription/guilddescription.component'
import { GuildComponent } from '../app/guilds/guilds.component'
import { CreateGuildComponent } from './create-guild/create-guild.component'
const routes: Routes = [
  { path: 'guild', component: GuildComponent },
  { path: 'guild/:guildId', component: GuildescriptionComponent },
  { path: '', redirectTo: '/guild', pathMatch: 'full' },
  { path:  'createguild', component:CreateGuildComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
