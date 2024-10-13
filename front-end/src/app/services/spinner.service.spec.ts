import { TestBed } from '@angular/core/testing';
import { SpinnerService } from './spinner.service';
import { take } from 'rxjs/operators';

describe('SpinnerService', () => {
  let service: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit true when show is called', (done) => {
    service.isLoading.pipe(take(1)).subscribe(isLoading => {
      expect(isLoading).toBeTrue();
      done();
    });
    service.show();
  });

  it('should emit false after 500ms when hide is called', (done) => {
    service.isLoading.pipe(take(1)).subscribe(isLoading => {
      expect(isLoading).toBeFalse();
      done();
    });
    service.hide();
  });

  it('should not emit false immediately when hide is called', (done) => {
    const loadingStates: boolean[] = [];
    service.isLoading.subscribe(isLoading => {
      loadingStates.push(isLoading);

      if (loadingStates.length === 1) {
        expect(isLoading).toBeTrue();
      }
      if (loadingStates.length === 2) {
        expect(isLoading).toBeFalse();
        done();
      }
    });
    service.show();
    service.hide();
  });
});
