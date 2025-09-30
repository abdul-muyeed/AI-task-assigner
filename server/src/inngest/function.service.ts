import { MailService } from 'src/mail/mail.service';
import { UsersService } from 'src/users/users.service';
import { Injectable } from "@nestjs/common";
import { Inngest } from "inngest";
import { User } from "src/users/schemas/user.schemas";


@Injectable()
export class FunctionService {
    constructor(
        private readonly usersService: UsersService,
        private readonly mailService: MailService,
    ) {}

    getAll(inngest:Inngest){
        return [
            this.onSignUp(inngest),
        ]
    }

    onSignUp = (inngest:Inngest) => inngest.createFunction(
      { id: 'on-user-signup', name: 'On User Sign Up', retries: 2 },
      { event: 'user/signup' },
      async ({ event, step }) => {
        try {
          const { email } = event.data;

          // First step: Get user by email
          const user: User = await step.run('get-user-email', async () => {
            const user: User | null = await this.usersService.findOnebyEmail(email);
            if (!user) throw new Error('User not found');
            return user;
          });

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
          return { success: true};
        } catch (err) {
          console.error('❌ Error in on-user-signup function:', err);
           // Re-throw to trigger Inngest retry mechanism
           return { success: false, error: err.message }
        }
      })
    
}