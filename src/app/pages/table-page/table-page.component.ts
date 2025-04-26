import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';               
import { interval, Subscription, timer } from 'rxjs';
import { TableComponent } from '../../shared/components/table/table.component';

@Component({
  selector: 'app-table-page',
  standalone: true,
  imports: [
    CommonModule, NgIf,     
    TableComponent   
  ],
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.scss']    
})
export class TablePageComponent implements OnInit, OnDestroy {
  sessionTimeDisplay = '00:00:00';
  activeTimeDisplay  = '00:00:00';
  tableData: any[]   = []; 
  showOverlay = false;

  private sessionTimerSubscription?: Subscription;
  private activeTimerSubscription?: Subscription;
  private idleTimerSubscription?: Subscription;
  private sessionSeconds = 0;
  private activeSeconds  = 0;

  ngOnInit(): void {
    this.startSessionTimer();
    this.startActiveTimer();
    this.startIdleTimer();
    this.generateInitialData(); // Generate random data on load
  }

  ngOnDestroy(): void {
    this.clearTimers();
  }

  // Generates initial random data for the table
  generateInitialData(): void {
    // Generate 10 random rows of data initially
    for (let i = 0; i < 10; i++) {
      this.addRandomRow();
    }
  }

  // Adds a random row with a name and age
  addRandomRow(): void {
    const names = ['Param', 'Easwar', 'Parameswaran', 'John', 'David'];
    const name = names[Math.floor(Math.random() * names.length)];  
    const age = Math.floor(Math.random() * (60 - 20 + 1)) + 20;  
    this.tableData.push({ name, age });  
  }

  // Deletes a random row from the table
  deleteRandomRow(): void {
    if (this.tableData.length) {
      const id = Math.floor(Math.random() * this.tableData.length);
      this.tableData.splice(id, 1);
    }
  }

  // Resumes the session when the overlay is clicked
  resumeSession(event?: MouseEvent) {
      event?.stopPropagation();
    this.showOverlay = false;
    this.startActiveTimer();
    this.startIdleTimer();
  }

  // Start the session timer 
  private startSessionTimer(): void {
    this.sessionTimerSubscription = interval(1000).subscribe(() => {
      this.sessionSeconds++;
      this.sessionTimeDisplay = this.formatTime(this.sessionSeconds);
    });
  }

  // Start the active timer 
  private startActiveTimer(): void {
    this.activeTimerSubscription = interval(1000).subscribe(() => {
      this.activeSeconds++;
      this.activeTimeDisplay = this.formatTime(this.activeSeconds);
    });
  }

  // Start the idle timer, which pauses the session after 30 seconds of inactivity
  private startIdleTimer(): void {
    this.idleTimerSubscription = timer(30000).subscribe(() => {
      this.showOverlay = true;
      this.stopActiveTimer();
    });
  }

  // Resets the idle timer when there is user activity
  private resetIdleTimer(): void {
    this.idleTimerSubscription?.unsubscribe();
    this.startIdleTimer();
  }

  // Stops the active timer when the session is paused
  private stopActiveTimer(): void {
    this.activeTimerSubscription?.unsubscribe();
  }

  // Clears all active timers when the component is destroyed
  private clearTimers(): void {
    this.sessionTimerSubscription?.unsubscribe();
    this.activeTimerSubscription?.unsubscribe();
    this.idleTimerSubscription?.unsubscribe();
  }

  // Formats total time in seconds to a HH:MM:SS string
  private formatTime(totalSeconds: number): string {
    const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  }

  // Listens for user activity
  @HostListener('document:mousemove')
  @HostListener('document:keydown')
  @HostListener('document:mousedown')
  @HostListener('document:touchstart')
  onUserActivity(): void {
    if (!this.showOverlay) {
      this.resetIdleTimer();
    }
  }
}
