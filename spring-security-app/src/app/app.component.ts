import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ToasterComponent } from './toaster/toaster.component';
// import { ConfirmationDialog } from './confirm-dialog/confirmation-dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  condition!:boolean;
  // private toaster!: ToasterComponent
  constructor() {}
  
  
  // showMessage() {
  //   this.toaster.addMessage('This is a notification message.');
  // }

}
