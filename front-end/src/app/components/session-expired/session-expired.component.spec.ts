import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionExpiredComponent } from './session-expired.component';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SessionExpiredComponent', () => {
  let component: SessionExpiredComponent;
  let fixture: ComponentFixture<SessionExpiredComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SessionExpiredComponent],
      imports: [
        DialogModule,
        BrowserAnimationsModule
      ]
    });
    fixture = TestBed.createComponent(SessionExpiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
