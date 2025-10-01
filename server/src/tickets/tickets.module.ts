import { forwardRef, Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { TicketsRepo } from './tickets.repo';
import { InngestModule } from 'src/inngest/inngest.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Ticket, TicketSchema } from './schemas/ticket.schemas';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [forwardRef(() => InngestModule),
    MongooseModule.forFeature([
          {
            name: Ticket.name,
            schema: TicketSchema,
          },
        ]),
        JwtModule
  ],
  controllers: [TicketsController],
  providers: [TicketsService, TicketsRepo],
  exports: [TicketsRepo, TicketsService],
})
export class TicketsModule {}
