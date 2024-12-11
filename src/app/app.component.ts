import { Component } from '@angular/core';
import { DisplayMessageService } from './services/display-message.service';
import { Message } from './data/Message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'online-clinic';

  errorMessage$
  errorSeverity$

  constructor(private displayMessageService: DisplayMessageService) {
    this.errorMessage$ = this.displayMessageService.errorMessage$;
    this.errorSeverity$ = this.displayMessageService.errorSeverity$;
  }

  getSeverity(severity: string | Message | null): Message {
    return Object.values(Message).includes(severity as Message)
      ? (severity as Message)
      : Message.Information;
  }
}
