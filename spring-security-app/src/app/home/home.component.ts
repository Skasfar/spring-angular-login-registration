import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  progressWidth = 0; // Initial width is 25%

  constructor() {}

  increaseProgressBarWidth() {
    if (this.progressWidth < 100) {
      // Increase the width by 10%
      this.progressWidth += 10;

      // Schedule the next increase after 5 seconds
      setTimeout(() => this.increaseProgressBarWidth(), 1000);
    }
  }

  ngOnInit() {
    // Start the progress bar width increase
    this.increaseProgressBarWidth();
  }
}
