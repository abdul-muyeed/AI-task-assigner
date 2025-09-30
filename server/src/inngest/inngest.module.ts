import { Module } from '@nestjs/common';
import { InngestService } from './inngest.service';
import { InngestController } from './inngest.controller';
import { UsersModule } from '../users/users.module';
import { MailModule } from '../mail/mail.module';
import { FunctionService } from './function.service';

@Module({
  imports: [UsersModule, MailModule],
  controllers: [InngestController],
  providers: [InngestService, FunctionService],
  exports: [InngestService],
})
export class InngestModule {}
