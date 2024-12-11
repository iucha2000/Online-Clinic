import { Component, Input } from '@angular/core';
import { Message } from '../../data/Message';

@Component({
  selector: 'app-display-message',
  templateUrl: './display-message.component.html',
  styleUrl: './display-message.component.css'
})
export class DisplayMessageComponent {
  
  @Input() message: string = '';
  @Input() severity: Message = Message.Information;

  getThemeClass(): string {
    switch (this.severity) {
      case Message.Error:
        return 'error';
      case Message.Success:
        return 'success';
      default:
        return 'information';
    }
  }
}
