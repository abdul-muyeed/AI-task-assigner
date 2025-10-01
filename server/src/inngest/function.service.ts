import { MailService } from 'src/mail/mail.service';
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { Inngest } from 'inngest';
import { UsersRepository } from 'src/users/users.repo';
import { TicketsRepo } from 'src/tickets/tickets.repo';
import { Task_Status, Ticket, Ticket_Priority, TicketAnalysis } from 'src/utils/types';
import { createAgent, gemini } from '@inngest/agent-kit'; // Temporarily disabled due to package export issue

@Injectable()
export class FunctionService {
  constructor(
    @Inject(forwardRef(() => UsersRepository))
    private readonly mailService: MailService,
    private readonly userRepo: UsersRepository,
    private readonly ticketsRepo: TicketsRepo,
  ) {}

  getAll(inngest: Inngest) {
    return [this.onSignUp(inngest)];
  }

  onSignUp(inngest: Inngest) {
    return inngest.createFunction(
      { id: 'on-user-signup', name: 'On User Sign Up', retries: 2 },
      { event: 'user/signup' },
      async ({ event, step }) => {
        try {
          const { email } = event.data;

          // First step: Get user by email
          const user = await step.run('get-user-email', async () => {
            const user = await this.userRepo.findOnebyEmail(email);
            return user;
          });

          if (!user) {
            throw new Error('User not found during signup process');
          }

          // Second step: Send welcome email using the user from previous step
          await step.run('send-welcome-email', async () => {
            const subject = 'Welcome to AI Task Assigner';
            const message = `Hello ${user.email}, welcome to AI Task Assigner! We're excited to have you on board.`;

            console.log(`📧 Sending email to ${user.email}...`);
            console.log(`📝 Subject: ${subject}`);

            await this.mailService.send(user.email, subject, message);

            return { success: true, emailSent: user.email };
          });

          console.log('✅ User signup process completed for:', email);
          return { success: true };
        } catch (err) {
          console.error('❌ Error in on-user-signup function:', err);
          // Re-throw to trigger Inngest retry mechanism
          return { success: false, error: err.message };
        }
      },
    );
  }
  onTicketCreated(inngest: Inngest) {
    return inngest.createFunction(
      { id: 'on-ticket-created', name: 'On Ticket Created', retries: 2 },
      { event: 'ticket/created' },
      async ({ event, step }) => {
        // Function implementation for ticket creation event
        try {
          const { ticketId } = event.data;
          const ticket = await step.run('get-ticket', async () => {
            const ticket = await this.ticketsRepo.findById(ticketId);
            if (!ticket) {
              console.error('Ticket not found with ID:', ticketId);
              throw new Error('Ticket not found with ID: ' + ticketId);
            }
            return ticket;
          });

          await step.run('update-ticket-status', async () => {
            await this.ticketsRepo.update(ticketId, { status: Task_Status.ANALYZING });
          });
          const relatedSkills = await step.run('call-ai-service', async () => {
            // Temporarily using mock data due to agent-kit package export issue
            const callAI: TicketAnalysis | null = await this.analyzeTickets(ticket);
            if (!callAI) {
              throw new Error('AI service failed to analyze ticket');
            }

            await this.ticketsRepo.update(ticketId, {
              priority: (() => {
                switch (callAI.priority) {
                  case 'low':
                    return Ticket_Priority.LOW;
                  case 'medium':
                    return Ticket_Priority.MEDIUM;
                  case 'high':
                    return Ticket_Priority.HIGH;
                  default:
                    return undefined;
                }
              })(),
              helpfulNotes: callAI.helpfulNotes,
              relatedSkills: callAI.relatedSkills,
              status: Task_Status.PENDING,
            });
            return callAI.relatedSkills;
          });

          const assignedUser = await step.run('assign-mod', async () => {
            let user = await this.userRepo.findMatchSkill(relatedSkills);

            await this.ticketsRepo.update(ticketId, { assignedTo: user?._id });

            return user;
          });

          await step.run('notify-assigned-user', async () => {
            if (assignedUser) {
              const subject = 'You have been assigned a new ticket';
              const message = `Hello ${assignedUser.email}, you have been assigned a new ticket: ${ticketId} ${ticket.title}.`;

              console.log(`📧 Sending email to ${assignedUser.email}...`);
              console.log(`📝 Subject: ${subject}`);

              await this.mailService.send(assignedUser.email, subject, message);
            }
          });
        } catch (err) {
          console.error('❌ Error in on-ticket-created function:', err);
          return { success: false, error: err.message };
        }
        return { success: true };
      },
    );
  }

  // Temporarily disabled due to @inngest/agent-kit package export issue
  private ticketAgent = createAgent({
    model: gemini({
      model: 'gemini-1.5-flash-8b',
    }),
    name: 'AI Ticket Triager Assistant',
    system: `
      You are an expert AI assistant that processes technical support tickets.
      Your job is to:
        1. Summarize the ticket content.
        2. Estimate the priority (Low, Medium, High).
        3. Provide helpful notes and resources for human moderators.
        4. List relevant technical skills required.

      IMPORTANT:
      - Only respond with valid raw JSON (no explanations, no Markdown, no extra text).
      - The output must be a strict JSON object with the following shape:
        {
          "summary": "Short summary",
          "priority": "low|medium|high",
          "helpfulNotes": "Detailed notes...",
          "relatedSkills": ["Skill1", "Skill2"]
        }
    `,
  });

  // Temporarily disabled due to @inngest/agent-kit package export issue
  private analyzeTickets = async (
    ticket: Ticket,
  ): Promise<TicketAnalysis | null> => {
    try {
      const response: any = await this.ticketAgent.run(
        `
        Analyze the following support ticket and RETURN ONLY A STRICT JSON OBJECT (no extra text):

        Ticket Title: ${ticket.title}
        Ticket Description: ${ticket.description}

        The JSON must include: summary, priority (low|medium|high), helpfulNotes, relatedSkills.
      `,
      );

      const raw = (response && (response.output || response.text)) ?? String(response ?? '');

      let jsonString = raw.trim();

      // strip code fences if present
      const fenceMatch = jsonString.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
      if (fenceMatch) {
        jsonString = fenceMatch[1].trim();
      }

      // If the model returned multiple JSON blocks, pick the first object-like content
      const firstObjectMatch = jsonString.match(/\{[\s\S]*\}/);
      if (firstObjectMatch) {
        jsonString = firstObjectMatch[0];
      }

      const parsed = JSON.parse(jsonString) as TicketAnalysis;

      // basic validation / normalization
      if (
        typeof parsed.summary === 'string' &&
        typeof parsed.priority === 'string' &&
        typeof parsed.helpfulNotes === 'string' &&
        Array.isArray(parsed.relatedSkills)
      ) {
        // normalize priority to lowercase
        parsed.priority = parsed.priority.toLowerCase() as TicketAnalysis['priority'];
        return parsed;
      }

      console.error('AI returned JSON but shape is invalid:', parsed);
      return null;
    } catch (err: any) {
      console.error('Failed to analyze ticket with agent:', err?.message ?? err);
      return null;
    }
  };
}
