import { Injectable } from '@nestjs/common';
import { Inngest} from 'inngest';
import { FunctionService } from './function.service';

@Injectable()
export class InngestService {
  private inngest: Inngest;
  readonly functions: any[];


  constructor(
    private readonly functionService: FunctionService
  ) {
    this.inngest = new Inngest({
      id: 'ai-task-assigner',
      name: 'AI Task Assigner',
      isDev: process.env.NODE_ENV !== 'production',
      eventKey: process.env.INNGEST_EVENT_KEY || 'local',
    });
    this.functions = this.functionService.getAll(this.inngest);
  }

  // Method to send events (this is what other services will call)
  async sendUserSignupEvent(email: string): Promise<void> {
    try {
      await this.inngest.send({
        name: 'user/signup',
        data: { email },
      });
      console.log('✅ Successfully sent signup event to Inngest for:', email);
    } catch (error) {
      console.error('❌ Failed to send signup event:', error.message);
      throw error;
    }
  }

  async sendTicketCreatedEvent(ticketId: string): Promise<void> {
    try {
      await this.inngest.send({
        name: 'ticket/created',
        data: { ticketId },
      });
      console.log('✅ Successfully sent ticket created event to Inngest for:', ticketId);
    } catch (error) {
      console.error('❌ Failed to send ticket created event:', error.message);
      throw error;
    }
  }

  // Expose the inngest client for the controller
  get client(): Inngest {
    return this.inngest;
  }
}
