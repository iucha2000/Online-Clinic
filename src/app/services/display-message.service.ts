import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Message } from '../data/Message';

@Injectable({
  providedIn: 'root'
})
export class DisplayMessageService {

  private errorMessage = new BehaviorSubject<string | null>(null);
  private errorSeverity = new BehaviorSubject<Message>(Message.Information);

  errorMessage$ = this.errorMessage.asObservable();
  errorSeverity$ = this.errorSeverity.asObservable();

  showError(displayMessage: { message: string; severity: Message }) {
    this.errorMessage.next(displayMessage.message);
    this.errorSeverity.next(displayMessage.severity);

    setTimeout(() => this.clearError(), 3000);
  }

  clearError() {
    this.errorMessage.next(null);
    this.errorSeverity.next(Message.Information);
  }
}
