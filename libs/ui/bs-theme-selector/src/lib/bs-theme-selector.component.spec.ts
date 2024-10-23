import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BsThemeSelectorComponent } from './bs-theme-selector.component';

describe('UiThemeSelectorComponent', () => {
  let component: BsThemeSelectorComponent;
  let fixture: ComponentFixture<BsThemeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BsThemeSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BsThemeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
