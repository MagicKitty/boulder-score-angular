import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SetupComponent } from './setup.component';

describe('FinalsSetupComponent', () => {
  let component: FinalsSetupComponent;
  let fixture: ComponentFixture<FinalsSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalsSetupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FinalsSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
