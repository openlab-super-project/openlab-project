import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildescriptionComponent } from './guilddescription.component';

describe('GuildescriptionComponent', () => {
  let component: GuildescriptionComponent;
  let fixture: ComponentFixture<GuildescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuildescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuildescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
