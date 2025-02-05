import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { WorkoutChartComponent } from './workout-chart.component';
import { NgChartsModule } from 'ng2-charts';

describe('WorkoutChartComponent', () => {
  let component: WorkoutChartComponent;
  let fixture: ComponentFixture<WorkoutChartComponent>;

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: (key: string) => '1', // Mock user ID
      },
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkoutChartComponent],
      imports: [NgChartsModule], // Import the chart module for testing
      providers: [
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutChartComponent);
    component = fixture.componentInstance;

    // Mock localStorage data
    const mockUserData = [
      {
        id: 1,
        name: 'John Doe',
        workouts: [
          { type: 'Running', minutes: 30 },
          { type: 'Cycling', minutes: 45 },
        ],
      },
    ];
    localStorage.setItem('userData', JSON.stringify(mockUserData));

    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear(); // Clean up localStorage
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user data based on ID and display chart labels and data', () => {
    expect(component.user?.name).toBe('John Doe');
    expect(component.barChartData.labels).toEqual(['Running', 'Cycling']);
    expect(component.barChartData.datasets[0].data).toEqual([30, 45]);
  });

  it('should display a message if user is not found', () => {
    localStorage.removeItem('userData'); // Simulate no data in localStorage
    component.ngOnInit(); // Trigger ngOnInit again
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).toContain('User not found!');
  });
});
