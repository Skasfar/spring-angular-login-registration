import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Provide this service at the root level
})
export class ToastService {
  messages: string[] = [];

  addMessage(message: string) {
    this.messages.push(message);
  }
}
