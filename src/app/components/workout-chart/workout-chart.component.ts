import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  ChartData,ChartOptions, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts'

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
  selector: 'app-workout-chart',
  standalone: true, // Ensure the component is standalone
  imports: [NgChartsModule], // Import NgChartsModule here
  templateUrl: './workout-chart.component.html',
  styleUrls: ['./workout-chart.component.css'],
})
export class WorkoutChartComponent {
  user: UserData | undefined;
  
  // Chart.js variables for a bar chart
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartType: ChartType = 'bar';
  barChartLegend:boolean = true;

  // Correcting the typing for barChartData
  barChartData: ChartData<'bar'> = {
    labels: ['January', 'February', 'March', 'April'],
    datasets: [
      { 
        data: [65, 59, 80, 81, 56], 
        label: 'Workout Data', 
      },
    ],
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get the user id from the route parameter
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      const users: UserData[] = JSON.parse(storedData);
      this.user = users.find((u) => u.id === userId);
      if (this.user) {
        // Group workouts by type and sum the minutes
        const workoutSummary: { [key: string]: number } = {};
        this.user.workouts.forEach((workout) => {
          if (workoutSummary[workout.type]) {
            workoutSummary[workout.type] = (workoutSummary[workout.type] || 0) + workout.minutes;
          } else {
            workoutSummary[workout.type] = workout.minutes;
          }
        });
        // Set chart labels and data from the summary
        this.barChartData = {
          labels: Object.keys(workoutSummary),
          datasets: [
            {
              data: Object.values(workoutSummary),
              label: 'Workout Data',
              backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'],
            }
          ]
        };
      }
    }
  }
}
