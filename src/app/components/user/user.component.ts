import { Component } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { ChartModule } from 'primeng/chart';

interface Workout {
  type: string;
  minutes: number;
}

interface UserData {
  id: number;
  name: string;
  workouts: Workout[];
}

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  
  user: UserData | null = null;
  basicData: any =null;
  basicOptions: any ={};

  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit() {
    const username = this.route.snapshot.paramMap.get('username')!;
    const userData = JSON.parse(localStorage.getItem('userData') || '[]');
    this.user =
      userData.find((user: UserData) => user.name === username) || null;
    console.log('User Data:', this.user);

    console.log("Username:", username);
    console.log("User Data from localStorage:", userData);

    if (this.user && this.user.workouts.length > 0) {
      this.basicData = {
        labels: this.user.workouts.map((workout) => workout.type),
        datasets: [
          {
            label: 'Minutes',
            backgroundColor: 'rgba(0, 123, 255, 0.5)',
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1,
            data: this.user.workouts.map((workout) => workout.minutes),
          },
        ],
      };
      console.log("Chart Data:", this.basicData);
    }
    


    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    
    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }
}
