import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildComponent } from './guilds.component';

describe('GuildsComponent', () => {
  let component: GuildComponent;
  let fixture: ComponentFixture<GuildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuildComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
