import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';


 @Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MainLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'timetracker-app';
   ngOnInit(){}
 
 }
