import { ApplicationRef, Injectable } from '@angular/core';
import { Message, MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class CustomMessageService extends MessageService {
  constructor(
    private readonly messageService: MessageService,
    private readonly ref: ApplicationRef
  ) {
    super();
  }

  public override add(message: Message): void {
    setTimeout(() => {
      this.ref.tick();
      this.messageService.add(message);
    });
  }

  public override addAll(messages: Message[]): void {
    setTimeout(() => {
      this.ref.tick();
      this.messageService.addAll(messages);
    });
  }

  public override clear(): void {
    setTimeout(() => {
      this.ref.tick();
      this.messageService.clear();
    });
  }
}
