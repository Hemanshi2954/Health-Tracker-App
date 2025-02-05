import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddWorkoutComponent } from './components/add-workout/add-workout.component';
import { ExploreComponent } from './components/explore/explore.component';
import { UserComponent } from './components/user/user.component';
import { WorkoutChartComponent } from './components/workout-chart/workout-chart.component'; // Import the new chart component

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'add-workout',
    component: AddWorkoutComponent,
  },
  {
    path:'explore',
    component:ExploreComponent
  },
  {
    // user route 
    path: ':username',
    component: UserComponent
  },
  {
    path: 'workout-chart/:id',  // Add the route for the workout chart page
    component: WorkoutChartComponent,
  },
];
